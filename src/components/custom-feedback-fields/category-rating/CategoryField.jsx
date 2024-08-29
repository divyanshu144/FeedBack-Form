import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateHeading, updateSelectedCategory } from '../../../store/componentsSlice';
import './CategoryField.css';
import EditableComponent from '../../common/EditableComponent';

const CategoryField = () => {
    const { categoryheading, categories, selectedCategory } = useSelector((state) => state.components.categoryField);
    const dispatch = useDispatch();

    const handleSave = (newHeading) => {
        dispatch(updateHeading({ component: 'categoryField', newHeading }));
        dispatch(updateSelectedCategory({ component: 'categoryField', selectedCategory }));
    };

    const handleDelete = () => {
        // additional delete logic if req
    };

    return (
        <EditableComponent heading={categoryheading} onSave={handleSave} onDelete={handleDelete} className="category-field-container">
            <TextField
                select
                fullWidth
                label="Select Category"
                value={selectedCategory}
                onChange={(e) => dispatch(updateSelectedCategory({ component: 'categoryField', selectedCategory: e.target.value }))}
                className="category-dropdown"
            >
                {categories.map((category, index) => (
                    <MenuItem key={index} value={category}>
                        {category}
                    </MenuItem>
                ))}
            </TextField>
        </EditableComponent>
    );
};

export default CategoryField;
