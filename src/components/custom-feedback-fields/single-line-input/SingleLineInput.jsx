import React, { useState } from 'react';
import { Box, Typography, TextField, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { updateHeading, updateInputValue } from '../../../store/componentsSlice';
import './SingleLineInput.css';

const SingleLineInput = () => {
    const { singlelineheading, inputValue } = useSelector((state) => state.components.singleLineInput);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [tempHeading, setTempHeading] = useState(singlelineheading);
    const [tempInputValue, setTempInputValue] = useState(inputValue);
    const [isVisible, setIsVisible] = useState(true);

    const handleEdit = () => {
        setTempHeading(singlelineheading);
        setTempInputValue(inputValue);
        setIsEditing(true);
    };

    const handleSave = () => {
        dispatch(updateHeading({ component: 'singleLineInput', newHeading: tempHeading }));
        dispatch(updateInputValue({ component: 'singleLineInput', inputValue: tempInputValue }));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleDelete = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <Box className="single-line-input-container">
            {isEditing ? (
                <TextField
                    className="single-line-input-heading"
                    variant="outlined"
                    fullWidth
                    value={tempHeading}
                    onChange={(e) => setTempHeading(e.target.value)}
                    margin="normal"
                />
            ) : (
                <Typography variant="h6" className="single-line-input-heading">
                    {singlelineheading}
                </Typography>
            )}

            <TextField
                className="single-line-input"
                variant="outlined"
                fullWidth
                value={isEditing ? tempInputValue : inputValue}
                onChange={(e) => setTempInputValue(e.target.value)}
                placeholder="Enter text here..."
            />

            <Box className="icon-container">
                {isEditing ? (
                    <>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </>
                ) : (
                    <div className="editdelete-icon">
                        <IconButton color="primary" aria-label="edit" onClick={handleEdit}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="secondary" aria-label="delete" onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                )}
            </Box>
        </Box>
    );
};

export default SingleLineInput;
