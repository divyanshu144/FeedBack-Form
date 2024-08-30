import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './FeedbackDetail.css';

const FeedbackDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formId, formData } = location.state;

  const [formsData, setFormsData] = useState([]);
  const [viewedCount, setViewedCount] = useState(0);

  useEffect(() => {

    const storedData = JSON.parse(localStorage.getItem(`savedForms-${formId}`)) || [];
      setFormsData(storedData);

      // Increment the view count
      const newViewedCount = (storedData.viewedCount || 0) + 1;
      setViewedCount(newViewedCount);

      // Update the formDetail object with the new view count
      const updatedForm = {
        ...formData,
        viewedCount: newViewedCount,
      };

      localStorage.setItem(`savedForms-${formId}`, JSON.stringify(updatedForm));

  }, [formData]);

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <Container className="dashboard-container">
      <Paper className="header-paper">
        <Box className="main-heading">
          <IconButton onClick={handleBackClick}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" className="form-title">
            {formData.title || "Untitled Form"}
          </Typography>
        </Box>
        <Grid container spacing={2} className="stats-container">
          <div className="stats-box">
            <Typography variant="h3" className="stats-number">
              {viewedCount || "0"}
            </Typography>
            <Typography variant="h6">VIEWS</Typography>
          </div>

          <div className="stats-box">
            <Typography variant="h3" className="stats-number">
              {formData.submittedCount || "0"}
            </Typography>
            <Typography variant="h6">Submitted</Typography>
          </div>
        </Grid>
        <Box className="date-info">
          <div className="heading">Page URL contains example.com</div>
          <div className="heading">Date Published: {formData.data.currentDate || "No date"}</div>
          <div className="heading">Time: {formData.data.currentTime || "No Time"}</div>
        </Box>
      </Paper>

      <Paper elevation={2} className="feedback-section">
        <Typography variant="h6" className="feedback-title">Feedback List</Typography>
        <Accordion className="feedback-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-content`}
            id={`panel-header`}
          >
            <Typography variant="body1" className="feedback-number">
              Feedback
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Typography>{formData?.data?.textAreaData?.textheading}</Typography>
              <Typography variant="body2" className="feedback-answer">
                {formData?.data?.textAreaData?.comment}
              </Typography>
              <Typography>{formData?.data?.numericRatingData?.numericheading}</Typography>
              <Typography variant="body2" className="feedback-answer">
                {formData?.data?.numericRatingData?.ratingValue}
              </Typography>
              <Typography>{formData?.data?.starRatingData?.starheading}</Typography>
              <Typography variant="body2" className="feedback-answer">
                {formData?.data?.starRatingData?.ratingValue}
              </Typography>
              <Typography>{formData?.data?.smileyRatingData?.smileyheading}</Typography>
              <Typography variant="body2" className="feedback-answer">
                {formData?.data?.smileyRatingData?.smileyValue}
              </Typography>
              <Typography>{formData?.data?.singleData?.singlelineheading}</Typography>
              <Typography variant="body2" className="feedback-answer">
                {formData?.data?.singleData?.inputValue}
              </Typography>
              <Typography>{formData?.data?.categoryData?.categoryheading}</Typography>
              <Typography variant="body2" className="feedback-answer">
                {formData?.data?.categoryData?.selectedCategory}
              </Typography>
              <Typography className="feedback-date">
                {formData.data.currentDate}
              </Typography>
            </Box>
          </AccordionDetails>
          <Divider className="feedback-divider" />
        </Accordion>
      </Paper>
    </Container>
  );
};

export default FeedbackDetail;