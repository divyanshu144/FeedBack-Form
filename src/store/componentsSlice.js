import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    textArea: { textheading: 'Would you like to add a comment?', comment: '' },
    numericRating: { numericheading: 'How likely is it that you will recommend us to your family and friends?', selectedRating: null },
    starRating: { starheading: 'Give a Star Rating for the Website', ratingValue: 0 },
    smileyRating: { smileyheading: 'How do you feel about this website?', smileyValue: 0 },
    radioBox: { radioheading: 'Select an option:', options: ['Option 1', 'Option 2'], currentValue: '' },
    singleLineInput: { singlelineheading: 'Single Line Input Heading', inputValue: '' },
    categoryField: { categoryheading: 'Category', categories: ['Bug', 'Content', 'Website'], selectedCategory: null },
    forms: [],
    currentForm: null,
    formattedDate: '',
    formattedTime: '',
};

const componentsSlice = createSlice({
    name: 'components',
    initialState,
    reducers: {
        updateHeading: (state, action) => {
            const { component, newHeading } = action.payload;
            if (component === 'textArea') {
                state.textArea.textheading = newHeading;
            }
            if (component === 'numericRating') {
                state.numericRating.numericheading = newHeading;
            }
            if (component === 'starRating') {
                state.starRating.starheading = newHeading;
            }
            if (component === 'smileyRating') {
                state.smileyRating.smileyheading = newHeading;
            }
            if (component === 'radioBox') {
                state.radioBox.radioheading = newHeading;
            }
            if (component === 'singleLineInput') {
                state.singleLineInput.singlelineheading = newHeading;
            }
            if (component === 'categoryField') {
                state.categoryField.categoryheading = newHeading;
            }
        },
        updateRatingValue: (state, action) => {
            const { component, ratingValue } = action.payload;
            if (state[component]) {
                state[component].ratingValue = ratingValue;
            }
        },
        updateCategories: (state, action) => {
            const { newCategories } = action.payload;
            state.categoryField.categories = newCategories;
        },
        updateSelectedCategory: (state, action) => {
            const { selectedCategory } = action.payload;
            state.categoryField.selectedCategory = selectedCategory;
        },
        updateSelectedRating: (state, action) => {
            const { selectedRating } = action.payload;
            state.numericRating.selectedRating = selectedRating;
        },
        updateOptions: (state, action) => {
            const { newOptions } = action.payload;
            state.radioBox.options = newOptions;
        },
        updateCurrentValue: (state, action) => {
            const { currentValue } = action.payload;
            state.radioBox.currentValue = currentValue;
        },
        updateInputValue: (state, action) => {
            const { inputValue } = action.payload;
            state.singleLineInput.inputValue = inputValue;
        },
        updateComment: (state, action) => {
            const { comment } = action.payload;
            state.textArea.comment = comment;
        },
        addForm: (state, action) => {
            state.forms.push(action.payload);
        },
        updateForm: (state, action) => {
            const { formId, formData } = action.payload;
            const formIndex = state.forms.findIndex(form => form.id === formId);
            if (formIndex !== -1) {
                state.forms[formIndex] = { ...state.forms[formIndex], ...formData };
            }
        },
        setCurrentForm: (state, action) => {
            const { formId, formData } = action.payload;
        
            // Check if formData exists and has an id
            if (formData && formId) {
                const formIndex = state.forms.findIndex(form => form.id === formId);
                if (formIndex !== -1) {
                    state.forms[formIndex] = formData; // Update existing form
                } else {
                    state.forms.push(formData); // Add new form
                }
                state.currentForm = formData; // Update current form in state
            } else {
                console.error('Invalid form data:', formData);
            }
        },
        clearCurrentForm: (state) => {
            state.currentForm = {}; 
        },
        setFormattedDate: (state, action) => {
            state.formattedDate = action.payload;
        },
        setFormattedTime: (state, action) => {
            state.formattedTime = action.payload;
        },
    },
});

export const { 
    updateHeading, 
    updateRatingValue, 
    updateCategories, 
    updateSelectedCategory, 
    updateSelectedRating, 
    updateOptions, 
    updateCurrentValue, 
    updateInputValue, 
    updateComment, 
    addForm, 
    updateForm, 
    setCurrentForm,
    setFormattedDate, 
    setFormattedTime,
    clearCurrentForm, 
} = componentsSlice.actions;

export default componentsSlice.reducer;
