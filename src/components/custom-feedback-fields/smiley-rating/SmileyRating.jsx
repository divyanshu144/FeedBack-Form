import React, { useState } from 'react';
import { Box, Typography, IconButton, Button, TextField } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { updateHeading, updateRatingValue } from '../../../store/componentsSlice';


const SmileyRating = () => {
    const { smileyheading, smileyValue } = useSelector((state) => state.components.smileyRating);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [tempHeading, setTempHeading] = useState(smileyheading);
    const [tempRating, setTempRating] = useState(smileyValue);
    const [isVisible, setIsVisible] = useState(true);

    const handleRatingChange = (newValue) => {
        if (isEditing) {
            setTempRating(newValue);
        } else {
            dispatch(updateRatingValue({ component: 'smileyRating', smileyValue: newValue }));
        }
    };

    const handleEditClick = () => {
        setTempHeading(smileyheading);
        setTempRating(smileyValue);
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        dispatch(updateHeading({ component: 'smileyRating', newHeading: tempHeading }));
        dispatch(updateRatingValue({ component: 'smileyRating', smileyValue: tempRating }));
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    const smileyIcons = [
        { value: 1, icon: <SentimentVeryDissatisfiedIcon fontSize="large" /> },
        { value: 2, icon: <SentimentDissatisfiedIcon fontSize="large" /> },
        { value: 3, icon: <SentimentSatisfiedIcon fontSize="large" /> },
        { value: 4, icon: <SentimentSatisfiedAltIcon fontSize="large" /> },
        { value: 5, icon: <SentimentVerySatisfiedIcon fontSize="large" /> },
    ];

    return (
        <Box className="smiley-rating-container">
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
                    {smileyheading}
                </Typography>
            )}

            <Box className="smiley-icons">
                {smileyIcons.map((smiley) => (
                    <IconButton
                        key={smiley.value}
                        color={tempRating === smiley.value ? 'primary' : 'default'}
                        onClick={() => handleRatingChange(smiley.value)}
                    >
                        {smiley.icon}
                    </IconButton>
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
                    <>
                        <IconButton color="primary" aria-label="edit rating" onClick={handleEditClick}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="secondary" aria-label="delete rating" onClick={handleDeleteClick}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default SmileyRating;
