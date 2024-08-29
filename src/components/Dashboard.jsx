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

    // Iterate through all keys in localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      // Check if the key starts with 'form-' to identify form-related keys
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
    // Remove the form from localStorage
    localStorage.removeItem(formId);

    // Update the state to reflect the deletion
    setForms(forms.filter(form => form.id !== formId));
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
        <Card className="card-new-form">
          <CardContent className="card-content">
          <div className="card-container">
                <img src="https://cdn-icons-png.flaticon.com/512/6301/6301160.png" alt="Form Icon" className="icon" />
            </div>
            <Typography variant="h6">
               Didn't have proper figma Access, as I was logging out of figma again and again.
               Have tried my best to replicate it.
            </Typography>
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
                  component={Link}
                  to={`/form/${form.id}`}
                  variant="contained"
                  color="primary"
                  className="view-button"
                  state={{ formId: form.id, formData: form }} 
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
                    state={{ title: form.title }} 
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