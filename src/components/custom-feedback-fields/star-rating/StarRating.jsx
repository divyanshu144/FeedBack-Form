import React, { useState } from 'react';
import { Box, Typography, Rating, IconButton, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import './StarRating.css';
import { updateHeading, updateRatingValue } from '../../../store/componentsSlice';

const StarRating = () => {
    const { starheading, ratingValue } = useSelector((state) => state.components.starRating);
    const dispatch = useDispatch();
    
    const [isEditing, setIsEditing] = useState(false);
    const [tempHeading, setTempHeading] = useState(starheading);
    const [tempRating, setTempRating] = useState(ratingValue);
    const [isVisible, setIsVisible] = useState(true);

    const handleRatingChange = (event, newValue) => {
        if (isEditing) {
            setTempRating(newValue);
        } else {
            dispatch(updateRatingValue({ component: 'starRating', ratingValue: newValue }));
        }
    };

    const handleEditClick = () => {
        setTempHeading(starheading);
        setTempRating(ratingValue);
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        dispatch(updateHeading({ component: 'starRating', newHeading: tempHeading }));
        dispatch(updateRatingValue({ component: 'starRating', ratingValue: tempRating }));
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <Box className="star-rating-container">
            {isEditing ? (
                <TextField
                    variant="outlined"
                    fullWidth
                    value={tempHeading}
                    onChange={(e) => setTempHeading(e.target.value)}
                    margin="normal"
                />
            ) : (
                <Typography variant="h6" className="rating-heading">
                    {starheading}
                </Typography>
            )}

            <Rating
                name={isEditing ? 'star-rating-edit' : 'star-rating'}
                value={isEditing ? tempRating : ratingValue}
                onChange={handleRatingChange}
                precision={1}
                size="large"
                className="rating-stars"
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
                        <IconButton color="primary" aria-label="edit rating" onClick={handleEditClick}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="secondary" aria-label="delete rating" onClick={handleDeleteClick}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                )}
            </Box>
        </Box>
    );
};

export default StarRating;
