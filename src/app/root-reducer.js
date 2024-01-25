import { bookApi } from '../../api/bookApi';
import { combineReducers } from 'redux';

//Combine reducers
//If you create another reducer place in here
export const rootReducer = combineReducers ({
    [bookApi.renderPath]: mainApi.reducer,
})