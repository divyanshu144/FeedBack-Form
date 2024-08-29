import React, { useState } from 'react';
import { Box, Typography, TextField, IconButton, Button, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { updateHeading, updateSelectedCategory } from '../../../store/componentsSlice';
//import { updateHeading, updateSelectedCategory } from '../componentsSlice';

const CategoryField = () => {
    const { categoryheading, categories, selectedCategory } = useSelector((state) => state.components.categoryField);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [tempHeading, setTempHeading] = useState(categoryheading);
    const [tempSelectedCategory, setTempSelectedCategory] = useState(selectedCategory);
    const [isDeleted, setIsDeleted] = useState(false);

    const handleEdit = () => {
        setTempHeading(categoryheading);
        setTempSelectedCategory(selectedCategory);
        setIsEditing(true);
    };

    const handleSave = () => {
        dispatch(updateHeading({ component: 'categoryField', newHeading: tempHeading }));
        dispatch(updateSelectedCategory({ component: 'categoryField', selectedCategory: tempSelectedCategory }));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleDelete = () => {
        setIsDeleted(true);
    };

    const handleCategoryChange = (event) => {
        setTempSelectedCategory(event.target.value);
    };

    if (isDeleted) return null;

    return (
        <Box className="category-field-container">
            {isEditing ? (
                <TextField
                    className="category-field-heading"
                    variant="outlined"
                    fullWidth
                    value={tempHeading}
                    onChange={(e) => setTempHeading(e.target.value)}
                    margin="normal"
                />
            ) : (
                <Typography variant="h6" className="category-field-heading">
                    {categoryheading}
                </Typography>
            )}

            <TextField
                select
                fullWidth
                label={isEditing ? "Select Category (Editing)" : "Select Category"}
                value={isEditing ? tempSelectedCategory : selectedCategory}
                onChange={handleCategoryChange}
            >
                {categories.map((category, index) => (
                    <MenuItem key={index} value={category}>
                        {category}
                    </MenuItem>
                ))}
            </TextField>

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
                    <>
                        <IconButton color="primary" aria-label="edit" onClick={handleEdit}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="secondary" aria-label="delete" onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default CategoryField;
