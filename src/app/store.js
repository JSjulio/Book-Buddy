// store.js
import { configureStore } from '@reduxjs/toolkit';
import { mainApi } from '../../api/bookApi'; 
import rootReducer from './root-reducer'; 

export const store = configureStore({
  reducer: rootReducer, // rR object contains all the reducers to the app 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});

export default store;
