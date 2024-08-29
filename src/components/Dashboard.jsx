import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import './Dashboard.css';

const Dashboard = () => {
  const [forms, setForms] = useState([]);
  const [open, setOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedForms = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key.startsWith('form-')) {
        const formData = localStorage.getItem(key);
        if (formData) {
          const parsedData = JSON.parse(formData);
          storedForms.push({
            id: key,
            ...parsedData
          });
        }
      }
    }

    setForms(storedForms);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormTitle("");
  };

  const handleCreate = () => {
    if (formTitle.trim() !== "") {
      navigate("/create", { state: { title: formTitle } });
      setOpen(false);
      setFormTitle("");
    }
  };

  const handleDelete = (formId) => {
    localStorage.removeItem(`form-${formId}`);
    setForms(forms.filter(form => form.id !== formId));
  };

  const handleViewSubmission = (form) => {
    const updatedForms = forms.map(f => {
      if (f.id === form.id) {
        const updatedForm = {
          ...f,
          viewedCount: (f.viewedCount || 0) + 1,
        };
        localStorage.setItem(form.id, JSON.stringify(updatedForm));
        return updatedForm;
      }
      return f;
    });

    setForms(updatedForms);
    navigate(`/form/${form.id}`, { state: { formData: form } });
  };

  return (
    <div className="dashboard-container">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <div className="form-cards-container">
        <Card className="card-new-form">
          <CardContent className="card-content-new">
            <Typography variant="h6">New Form</Typography>
            <IconButton className="icon-button" onClick={handleClickOpen}>
              <AddIcon className="add-icon" />
            </IconButton>
          </CardContent>
        </Card>

        {forms.map((form) => (
          <Card className="card" key={form.id}>
            <CardContent className="card-content">
              <div className="card-container">
                <img src="https://cdn-icons-png.flaticon.com/512/6301/6301160.png" alt="Form Icon" className="icon" />
              </div>
              <div className="typography-header">
                <div className="title">
                  {form.title || 'Untitled Form'}
                </div>
              </div>
              <div className="typography-content">
                <Typography variant="body2" className="subtitle">
                  Submitted: {form.submittedCount || '0'}
                </Typography>
                <Typography variant="body2" className="subtitle">
                  Viewed: {form.viewedCount || '0'}
                </Typography>
                <Typography variant="body2" className="subtitle">
                  Date Published: {form.data.currentDate || 'No date'}
                </Typography>
              </div>
            </CardContent>
            <Box className="button-container">
              <Button
                variant="contained"
                color="primary"
                className="view-button"
                onClick={() => handleViewSubmission(form)}
              >
                View Submission
              </Button>
              <div className="action-buttons">
                <Button
                  component={Link}
                  to={`/edit/${form.id}`}
                  variant="contained"
                  color="success"
                  className="edit-button"
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  className="delete-button"
                  onClick={() => handleDelete(form.id)}
                >
                  Delete
                </Button>
              </div>
            </Box>
          </Card>
        ))}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dialog-title">Create New Form</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Form Title"
            type="text"
            fullWidth
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="text-field"
          />
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={handleClose} className="cancel-button">
            Cancel
          </Button>
          <Button onClick={handleCreate} className="create-button">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
