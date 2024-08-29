import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    AppBar, Toolbar, Box, Card, CardContent, Typography, Button, Divider, List,
    ListItem, ListItemIcon, ListItemText, IconButton, TextField
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import StarIcon from '@mui/icons-material/Star';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InputIcon from '@mui/icons-material/Input';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import './FeedbackForm.css';
import StarRating from '../custom-feedback-fields/star-rating/StarRating';
import SmileyRating from '../custom-feedback-fields/smiley-rating/SmileyRating';
import NumericRating from '../custom-feedback-fields/numeric/NumericRating';
import TextArea from '../custom-feedback-fields/Text-area/TextArea';
import SingleLineInput from '../custom-feedback-fields/single-line-input/SingleLineInput';
import { setCurrentForm, setFormattedDate, setFormattedTime } from '../../store/componentsSlice';
import AddLogic from './AddLogic';
import RadioBox from '../custom-feedback-fields/radio-rating/RadioBox';
import CategoryField from '../custom-feedback-fields/category-rating/CategoryField';

const FeedbackForm = React.memo(() => {
    const [formFields, setFormFields] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [tempTitle, setTempTitle] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { formId } = useParams();
    
    const textAreaData = useSelector((state) => state.components.textArea);
    const numericRatingData = useSelector((state) => state.components.numericRating);
    const starRatingData = useSelector((state) => state.components.starRating);
    const smileyRatingData = useSelector((state) => state.components.smileyRating);
    const singleData = useSelector((state) => state.components.singleLineInput);
    const radioData = useSelector((state) => state.components.radioBox);
    const categoryData = useSelector((state) => state.components.categoryField);
    const currentDate = useSelector((state) => state.components.formattedDate);
    const currentTime = useSelector((state) => state.components.formattedTime);

    useEffect(() => {
        if (formId) {
            const formData = localStorage.getItem(`form-${formId}`);
            if (formData) {
                const parsedData = JSON.parse(formData);
                setFormFields(parsedData.formFields || []);
                setTempTitle(parsedData.title || 'Untitled Form');
                dispatch(setCurrentForm(parsedData));
                setEditMode(true);
            } else {
                navigate('/');
            }
        } else {
            setFormFields([]);
            setTempTitle('');
            setEditMode(false);
        }
    }, [formId, dispatch, navigate]);

    useEffect(() => {
        if (formId && !editMode) {
            dispatch(setCurrentForm(null)); 
        }
    }, [formId, editMode, dispatch]);

    const addField = useCallback((fieldType) => {
        setFormFields((prevFields) => [...prevFields, fieldType]);
    }, []);

    const fields = useMemo(() => [
        { label: 'Textarea', icon: <TextFieldsIcon /> },
        { label: 'Numeric rating', icon: <InputIcon /> },
        { label: 'Star rating', icon: <StarIcon /> },
        { label: 'Smiley rating', icon: <EmojiEmotionsIcon /> },
        { label: 'Single line input', icon: <InputIcon /> },
        { label: 'Radio button', icon: <RadioButtonCheckedIcon /> },
        { label: 'Categories', icon: <CategoryIcon /> }
    ], []);

    const renderField = (fieldType, index) => {
        switch (fieldType) {
            case 'Textarea':
                return <TextArea key={index} />;
            case 'Numeric rating':
                return <NumericRating key={index} />;
            case 'Star rating':
                return <StarRating key={index} />;
            case 'Smiley rating':
                return <SmileyRating key={index} />;
            case 'Single line input':
                return <SingleLineInput key={index} />;
            case 'Radio button':
                    return <RadioBox key={index} />;
            case 'Categories':
                 return <CategoryField key={index} />;
            default:
                return null;
        }
    };

    const fieldData = useMemo(() => {
        const data = {};
        if (formFields.includes('Textarea')) data.textAreaData = textAreaData;
        if (formFields.includes('Numeric rating')) data.numericRatingData = numericRatingData;
        if (formFields.includes('Star rating')) data.starRatingData = starRatingData;
        if (formFields.includes('Smiley rating')) data.smileyRatingData = smileyRatingData;
        if (formFields.includes('Single line input')) data.singleData = singleData;
        if (formFields.includes('Radio button')) data.radioData = radioData;
        if (formFields.includes('Categories')) data.categoryData = categoryData;
        return data;
    }, [formFields, textAreaData, numericRatingData, starRatingData, smileyRatingData, singleData, radioData, categoryData]);

    const handleSave = () => {
        const previousData = JSON.parse(localStorage.getItem(`form-${formId}`)) || {};
        
        const updatedForm = {
            id: formId || uuidv4(),
            title: tempTitle,
            formFields,
            data: { ...fieldData, currentDate, currentTime },
        };
    
        // Load existing saved forms from localStorage
        const savedForms = JSON.parse(localStorage.getItem('savedForms')) || {};
    
        if (formId) {
            // If formId exists, save the updated form under the existing formId
            if (!savedForms[formId]) {
                savedForms[formId] = [];
            }
            savedForms[formId].push(updatedForm); // Append the new form data to the existing array
        } else {
            // If there's no formId, generate a new one and save the form data under this new ID
            const newFormId = uuidv4();
            savedForms[newFormId] = [updatedForm];
            updatedForm.id = newFormId; // Update the form ID to the new ID
        }
    
        // Update the current form in the Redux store
        dispatch(setCurrentForm({ formId: updatedForm.id, formData: updatedForm }));
    
        // Save the forms with all versions under their respective form IDs
        localStorage.setItem('savedForms', JSON.stringify(savedForms));
    
        // Optionally save the latest form data under its specific form ID (you might want to keep this commented out)
        // localStorage.setItem(`form-${updatedForm.id}`, JSON.stringify(updatedForm));
        
        alert('Changes saved locally!');
    };
    
    const handlePublish = async () => {
        const date = new Date();
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();

        dispatch(setFormattedDate(formattedDate));
        dispatch(setFormattedTime(formattedTime));

        const formKey = `form-${formId || uuidv4()}`;
        const storedForm = JSON.parse(localStorage.getItem(formKey)) || {};
        const submittedCount = (storedForm.submittedCount || 0) + 1;

        const updatedForm = {
            id: formId || uuidv4(),
            title: tempTitle,
            formFields,
            data: {
                ...fieldData,
                currentDate: formattedDate,
                currentTime: formattedTime,
            },
            submittedCount,
        };

        dispatch(setCurrentForm({ formId: updatedForm.id, formData: updatedForm }));

        try {
            localStorage.setItem(formKey, JSON.stringify(updatedForm));
            alert(`Form published successfully! This form has been submitted ${updatedForm.submittedCount} times.`);
            navigate('/');
        } catch (error) {
            console.error('Error publishing form:', error);
            alert('There was an error publishing the form. Please try again.');
        }
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveTitle = () => {
        setEditMode(false);
    };

    const handleCancelEdit = () => {
        setTempTitle(form.title || 'Untitled Form');
        setEditMode(false);
    };

    return (
        <div className="form-wrapper">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Feedback Form
                    </Typography>
                    {formId ? (
                        <Button color="inherit" onClick={handleSave}>
                            Save
                        </Button>
                    ) : (
                        <>
                            <Button color="inherit" onClick={handleSave}>
                                Save
                            </Button>
                            <Button color="inherit" onClick={handlePublish}>
                                Publish
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <div className="form-container">
                <Card className="form-card">
                    <CardContent>
                        {editMode ? (
                            <Box display="flex" alignItems="center" style={{ backgroundColor: '#3f51b5', padding: '10px', borderRadius: '5px' }}>
                                <TextField
                                    value={tempTitle}
                                    onChange={(e) => setTempTitle(e.target.value)}
                                    variant="outlined"
                                    size="small"
                                    sx={{ flexGrow: 1, backgroundColor: 'white', borderRadius: '5px' }}
                                />
                                <IconButton onClick={handleSaveTitle} color="primary">
                                    <SaveIcon />
                                </IconButton>
                                <IconButton onClick={handleCancelEdit} color="secondary">
                                    <CancelIcon />
                                </IconButton>
                            </Box>
                        ) : (
                            <Box display="flex" alignItems="center" style={{ backgroundColor: '#3f51b5', padding: '10px', borderRadius: '5px' }}>
                                <Typography variant="h5" gutterBottom style={{ flexGrow: 1, color: 'white' }}>
                                    {tempTitle}
                                </Typography>
                                <IconButton onClick={handleEditClick} style={{ color: 'white' }}>
                                    <EditIcon />
                                </IconButton>
                            </Box>
                        )}
                        <Divider />
                        <Box>
                            {formFields.map((field, index) => (
                                <Box key={index} className="form-field">
                                    {renderField(field, index)}
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </Card>
                <div className="add-fields">
                    <Typography variant="h6" gutterBottom>
                        Add Fields
                    </Typography>
                    <List>
                        {fields.map((field, index) => (
                            <ListItem key={index} button onClick={() => addField(field.label)}>
                                <ListItemIcon>{field.icon}</ListItemIcon>
                                <ListItemText primary={field.label} />
                                <ListItemIcon>
                                    <AddIcon />
                                </ListItemIcon>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                    <AddLogic />
                </div>
            </div>
        </div>
    );
});

export default FeedbackForm;
