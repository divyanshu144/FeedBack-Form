import React, { useState } from 'react';
import { Box, Typography, TextField, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { updateComment, updateHeading } from '../../../store/componentsSlice';
import "./TextArea.css"

const TextArea = () => {
    const { textheading, comment } = useSelector((state) => state.components.textArea);
    const dispatch = useDispatch();

    // console.log("heading:", textheading)
    // console.log("comment:", comment)

    const [isEditing, setIsEditing] = useState(false);
    const [tempHeading, setTempHeading] = useState(textheading);
    const [tempComment, setTempComment] = useState(comment);
    const [isVisible, setIsVisible] = useState(true);

    const handleEditClick = () => {
        setTempHeading(textheading);
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        dispatch(updateHeading({ component: 'textArea', newHeading: tempHeading }));
        dispatch(updateComment({ component: 'textArea', comment: tempComment }));
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        setIsVisible(false);
    };

    const handleCommentChange = (event) => {
        setTempComment(event.target.value);
        dispatch(updateComment({ component: 'textArea', comment: event.target.value }));
    };

    if (!isVisible) return null;

    return (
        <Box className="text-area-container">
            {isEditing ? (
                <TextField
                    className="text-area-heading"
                    variant="outlined"
                    fullWidth
                    value={tempHeading}
                    onChange={(e) => setTempHeading(e.target.value)}
                    margin="normal"
                />
            ) : (
                <Typography variant="h6" className="text-area-heading">
                    {textheading}
                </Typography>
            )}

            <TextField
                className="text-area"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={tempComment}
                onChange={handleCommentChange}
                placeholder="Enter your comments here..."
            />

            <Box className="icon-container">
                {isEditing ? (
                    <>
                        <Button variant="contained" color="primary" onClick={handleSaveClick}>
                            Save
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancelClick}>
                            Cancel
                        </Button>
                    </>
                ) : (
                    <div className="editdelete-icon">
                        <IconButton color="primary" aria-label="edit heading" onClick={handleEditClick}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="secondary" aria-label="delete comment" onClick={handleDeleteClick}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                )}
            </Box>
        </Box>
    );
};

export default TextArea;