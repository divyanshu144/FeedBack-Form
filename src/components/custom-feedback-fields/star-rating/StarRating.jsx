import React, { useEffect, useState } from 'react';
import { Box, Rating, IconButton, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateHeading, updateRatingValue } from '../../../store/componentsSlice';
import EditableComponent from '../../common/EditableComponent';
import './StarRating.css';

const StarRating = () => {
    const { starheading, ratingValue } = useSelector((state) => state.components.starRating);
    const dispatch = useDispatch();

    const [tempHeading, setTempHeading] = useState(starheading);
    const [tempRating, setTempRating] = useState(ratingValue);

    useEffect(() => {
        setTempHeading(starheading);
    }, [starheading]);

    const handleSave = (newHeading) => {
        dispatch(updateHeading({ component: 'starRating', newHeading }));
        dispatch(updateRatingValue({ component: 'starRating', ratingValue: tempRating }));
    };

    const handleDelete = () => {
        // additional delete logic if req
    };


    const handleRatingChange = (event, newValue) => {
        setTempRating(newValue);
    };

    return (
        <EditableComponent
            heading={tempHeading}
            onSave={handleSave}
            onDelete={handleDelete}
            className="star-rating-container"
        >
            <Rating
                name="star-rating"
                value={tempRating}
                onChange={handleRatingChange}
                precision={1}
                size="large"
                className="rating-stars"
            />
        </EditableComponent>
    );
};

export default StarRating;
