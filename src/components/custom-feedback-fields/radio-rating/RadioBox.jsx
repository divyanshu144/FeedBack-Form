import React from 'react';
import { Box, RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateHeading, updateOptions } from '../../../store/componentsSlice';
import "./RadioBox.css";
import EditableComponent from '../../common/EditableComponent';

const RadioBox = () => {
    const { radioheading, options, selectedOption } = useSelector((state) => state.components.radioBox);
    const dispatch = useDispatch();

    const handleSave = (newHeading) => {
        dispatch(updateHeading({ component: 'radioBox', newHeading }));
        dispatch(updateOptions({ component: 'radioBox', selectedOption }));
    };

    const handleDelete = () => {
        // Handle any additional logic for delete if needed
    };

    return (
        <EditableComponent heading={radioheading} onSave={handleSave} onDelete={handleDelete} className="radio-box-container">
            <RadioGroup
                value={selectedOption}
                onChange={(e) => dispatch(updateOptions({ component: 'radioBox', selectedOption: e.target.value }))}
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
        </EditableComponent>
    );
};

export default RadioBox;
