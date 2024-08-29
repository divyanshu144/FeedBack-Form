import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateHeading, updateInputValue } from '../../../store/componentsSlice';
import EditableComponent from '../../common/EditableComponent'; 
import './SingleLineInput.css';

const SingleLineInput = () => {
    const { singlelineheading, inputValue } = useSelector((state) => state.components.singleLineInput);
    const dispatch = useDispatch();

    const [tempHeading, setTempHeading] = useState(singlelineheading);
    const [tempInputValue, setTempInputValue] = useState(inputValue);

    useEffect(() => {
        setTempHeading(singlelineheading);
    }, [singlelineheading]);

    const handleSave = (newHeading) => {
        dispatch(updateHeading({ component: 'singleLineInput', newHeading }));
        dispatch(updateInputValue({ component: 'singleLineInput', inputValue: tempInputValue }));
    };

    const handleDelete = () => {
        // additional delete logic if req
    };

    return (
        <EditableComponent
            heading={tempHeading}
            onSave={handleSave}
            onDelete={handleDelete}
            className="single-line-input-container"
        >
            <TextField
                className="single-line-input"
                variant="outlined"
                fullWidth
                value={tempInputValue}
                onChange={(e) => setTempInputValue(e.target.value)}
                placeholder="Enter text here..."
            />
        </EditableComponent>
    );
};

export default SingleLineInput;
