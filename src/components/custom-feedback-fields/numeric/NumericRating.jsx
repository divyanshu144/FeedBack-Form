import React, { useState } from 'react';
import { Box, Typography, Button, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { updateHeading, updateRatingValue } from '../../../store/componentsSlice';
import './NumericRating.css'; 

const NumericRating = () => {
    const { numericheading, ratingValue } = useSelector((state) => state.components.numericRating);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [tempHeading, setTempHeading] = useState(numericheading);
    const [tempRating, setTempRating] = useState(ratingValue);
    const [isVisible, setIsVisible] = useState(true);

    const handleRatingChange = (value) => {
        if (isEditing) {
            setTempRating(value);
        } else {
            dispatch(updateRatingValue({ component: 'numericRating', ratingValue: value }));
        }
    };

    const handleEditClick = () => {
        setTempHeading(numericheading);
        setTempRating(ratingValue);
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        dispatch(updateHeading({ component: 'numericRating', newHeading: tempHeading }));
        dispatch(updateRatingValue({ component: 'numericRating', ratingValue: tempRating }));
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
        <Box className="numeric-rating-container">
            <Box className="numeric-rating-header">
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
                        {numericheading}
                    </Typography>
                )}
            </Box>

            <Box className="rating-buttons-container">
                {[1, 2, 3, 4, 5].map((num) => (
                    <Button
                        key={num}
                        variant={isEditing ? (tempRating === num ? 'contained' : 'outlined') : (ratingValue === num ? 'contained' : 'outlined')}
                        color="primary"
                        onClick={() => handleRatingChange(num)}
                        className="rating-button"
                    >
                        {num}
                    </Button>
                ))}
            </Box>

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

export default NumericRating;
