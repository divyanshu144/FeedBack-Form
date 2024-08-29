import React from 'react';
import { Box, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateHeading, updateRatingValue } from '../../../store/componentsSlice';
import './NumericRating.css'; 
import EditableComponent from '../../common/EditableComponent';

const NumericRating = () => {
    const { numericheading, ratingValue } = useSelector((state) => state.components.numericRating);
    const dispatch = useDispatch();

    const handleSave = (newHeading) => {
        dispatch(updateHeading({ component: 'numericRating', newHeading }));
        dispatch(updateRatingValue({ component: 'numericRating', ratingValue }));
    };

    const handleDelete = () => {
        
    };

    return (
        <EditableComponent heading={numericheading} onSave={handleSave} onDelete={handleDelete} className="numeric-rating-container">
            <Box className="rating-buttons-container">
                {[1, 2, 3, 4, 5].map((num) => (
                    <Button
                        key={num}
                        variant={ratingValue === num ? 'contained' : 'outlined'}
                        color="primary"
                        onClick={() => dispatch(updateRatingValue({ component: 'numericRating', ratingValue: num }))}
                        className="rating-button"
                    >
                        {num}
                    </Button>
                ))}
            </Box>
        </EditableComponent>
    );
};

export default NumericRating;
