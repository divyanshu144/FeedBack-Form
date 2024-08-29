import React, { useState } from 'react';
import { Box, Typography, TextField, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './EditableComponent.css';

const EditableComponent = ({
    heading,
    onSave,
    onDelete,
    children,
    editButtonLabel = "Save",
    cancelButtonLabel = "Cancel",
    className = ""
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempHeading, setTempHeading] = useState(heading);
    const [isVisible, setIsVisible] = useState(true);

    const handleEditClick = () => {
        setTempHeading(heading);
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        onSave(tempHeading);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        setIsVisible(false);
        onDelete();
    };

    if (!isVisible) return null;

    return (
        <Box className={`editable-component-container ${className}`}>
            {isEditing ? (
                <TextField
                    variant="outlined"
                    fullWidth
                    value={tempHeading}
                    onChange={(e) => setTempHeading(e.target.value)}
                    margin="normal"
                    className="editable-heading-input category-field-heading"
                />
            ) : (
                <Typography variant="h6" className="editable-heading category-field-heading">
                    {heading}
                </Typography>
            )}

            <Box className="editable-component-content">
                {children}
            </Box>

            <Box className="icon-container">
                {isEditing ? (
                    <>
                        <Button variant="contained" color="primary" onClick={handleSaveClick}>
                            {editButtonLabel}
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancelClick}>
                            {cancelButtonLabel}
                        </Button>
                    </>
                ) : (
                    <div className="editdelete-icon">
                        <IconButton color="primary" aria-label="edit" onClick={handleEditClick}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="secondary" aria-label="delete" onClick={handleDeleteClick}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                )}
            </Box>
        </Box>
    );
};

export default EditableComponent;
