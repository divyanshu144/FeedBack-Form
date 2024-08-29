import React, { useEffect, useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useSelector, useDispatch } from 'react-redux';
import { updateHeading, updateRatingValue } from '../../../store/componentsSlice';
import EditableComponent from '../../common/EditableComponent';
import './SmileyRating.css';

const SmileyRating = () => {
    const { smileyheading, smileyValue } = useSelector((state) => state.components.smileyRating);
    const dispatch = useDispatch();

    const [tempHeading, setTempHeading] = useState(smileyheading);
    const [tempRating, setTempRating] = useState(smileyValue);

    useEffect(() => {
        setTempHeading(smileyheading);
    }, [smileyheading]);

    const handleSave = (newHeading) => {
        dispatch(updateHeading({ component: 'smileyRating', newHeading }));
        dispatch(updateRatingValue({ component: 'smileyRating', smileyValue: tempRating }));
    };

    const handleDelete = () => {
        // additional delete logic if req
    };

    const smileyIcons = [
        { value: 1, icon: <SentimentVeryDissatisfiedIcon fontSize="large" /> },
        { value: 2, icon: <SentimentDissatisfiedIcon fontSize="large" /> },
        { value: 3, icon: <SentimentSatisfiedIcon fontSize="large" /> },
        { value: 4, icon: <SentimentSatisfiedAltIcon fontSize="large" /> },
        { value: 5, icon: <SentimentVerySatisfiedIcon fontSize="large" /> },
    ];

    const handleRatingChange = (newValue) => {
        setTempRating(newValue);
        dispatch(updateRatingValue({ component: 'smileyRating', smileyValue: newValue }));
    };

    return (
        <EditableComponent
            heading={tempHeading}
            onSave={handleSave}
            onDelete={handleDelete}
            className="smiley-rating-container"
        >
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
        </EditableComponent>
    );
};

export default SmileyRating;
