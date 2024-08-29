import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateComment, updateHeading } from '../../../store/componentsSlice';
import EditableComponent from '../../common/EditableComponent'; 
import './TextArea.css';

const TextArea = () => {
    const { textheading, comment } = useSelector((state) => state.components.textArea);
    const dispatch = useDispatch();

    const [tempHeading, setTempHeading] = useState(textheading);
    const [tempComment, setTempComment] = useState(comment);

    useEffect(() => {
        setTempHeading(textheading);
    }, [textheading]);

    const handleSave = (newHeading) => {
        dispatch(updateHeading({ component: 'textArea', newHeading }));
        dispatch(updateComment({ component: 'textArea', comment: tempComment }));
    };

    const handleCommentChange = (event) => {
        setTempComment(event.target.value);
    };

    const handleDelete = () => {
        // additional delete logic if req
    };

    return (
        <EditableComponent
            heading={tempHeading}
            onSave={handleSave}
            onDelete={handleDelete}
            className="text-area-container"
        >
            <TextField
                className="text-area"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={tempComment}
                onChange={handleCommentChange}
                placeholder="Enter your comments here..."
            />
        </EditableComponent>
    );
};

export default TextArea;
