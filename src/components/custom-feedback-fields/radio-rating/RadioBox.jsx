import React, { useState } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, IconButton, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { updateHeading, updateOptions } from '../../../store/componentsSlice';
//import { updateHeading, updateSelectedOption } from '../componentsSlice';

const RadioBox = () => {
    const { radioheading, options, selectedOption } = useSelector((state) => state.components.radioBox);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [tempHeading, setTempHeading] = useState(radioheading);
    const [tempSelectedOption, setTempSelectedOption] = useState(selectedOption);
    const [isDeleted, setIsDeleted] = useState(false);

    const handleEdit = () => {
        setTempHeading(radioheading);
        setTempSelectedOption(selectedOption);
        setIsEditing(true);
    };

    const handleSave = () => {
        dispatch(updateHeading({ component: 'radioBox', newHeading: tempHeading }));
        dispatch(updateOptions({ component: 'radioBox', selectedOption: tempSelectedOption }));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleDelete = () => {
        setIsDeleted(true);
    };

    const handleOptionChange = (event) => {
        setTempSelectedOption(event.target.value);
    };

    if (isDeleted) return null;

    return (
        <Box className="radio-box-container">
            {isEditing ? (
                <TextField
                    className="radio-box-heading"
                    variant="outlined"
                    fullWidth
                    value={tempHeading}
                    onChange={(e) => setTempHeading(e.target.value)}
                    margin="normal"
                />
            ) : (
                <Typography variant="h6" className="radio-box-heading">
                    {radioheading}
                </Typography>
            )}

            <RadioGroup
                value={isEditing ? tempSelectedOption : selectedOption}
                onChange={handleOptionChange}
            >
                {options.map((option, index) => (
                    <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                    />
                ))}
            </RadioGroup>

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

export default RadioBox;
