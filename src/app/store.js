import { configureStore } from '@reduxjs/toolkit';
import { mainApi } from '../../api/bookApi'; 
import rootReducer from './root-reducer'; 

export const store = configureStore({
  reducer: rootReducer, // The root reducer combines all reducers and then is passed to the store. 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware), // concat the default middleware and the API's middleware
});

export default store;
