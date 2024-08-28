import { configureStore } from '@reduxjs/toolkit';
import componentsReducer from './componentsSlice';

const store = configureStore({
    reducer: {
        components: componentsReducer,
    },
});

export default store;
