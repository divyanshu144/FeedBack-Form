import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, FormControlLabel, Switch, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFormattedDate, setFormattedTime } from '../../store/componentsSlice'; 
import './AddLogic.css';

const AddLogic = () => {
    const [showURL, setShowURL] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);

    const dispatch = useDispatch();
    const formattedDate = useSelector((state) => state.components.formattedDate);
    const formattedTime = useSelector((state) => state.components.formattedTime);

    useEffect(() => {
        const currentDate = new Date();
        const date = currentDate.toLocaleDateString();
        const time = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

        dispatch(setFormattedDate(date));
        dispatch(setFormattedTime(time));
    }, [dispatch]);

    return (
        <Box className="add-logic-container">
            <Typography variant="h6" className="add-logic-title">Add Logic</Typography>
            <div className="formcontrol">
                <FormControlLabel
                    control={<Switch color="primary" checked={showURL} onChange={() => setShowURL(!showURL)} />}
                    labelPlacement="start"
                    label="Show based on URL conditions"
                    className="switch"
                />
                {showURL && (
                    <TextField
                        placeholder="http://"
                        fullWidth
                        className="textField"
                        variant="standard"
                    />
                )}

                <FormControlLabel
                    control={<Switch color="primary" checked={showDate} onChange={() => setShowDate(!showDate)} />}
                    labelPlacement="start"
                    label="Show on a specific date"
                    className="switch"
                />
                {showDate && (
                    <TextField
                        value={formattedDate}
                        fullWidth
                        className="textField"
                        variant="standard"
                    />
                )}

                <FormControlLabel
                    control={<Switch color="primary" checked={showTime} onChange={() => setShowTime(!showTime)} />}
                    labelPlacement="start"
                    label="Show on a specific time"
                    className="switch"
                />
                {showTime && (
                    <TextField
                        value={formattedTime}
                        fullWidth
                        className="textField"
                        variant="standard"
                    />
                )}
        </div>
        </Box>
    );
};

export default AddLogic;
