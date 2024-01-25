import BooksReducer from '../components/BooksSlice';
import { combineReducers } from 'redux';

//Combine reducers
//If you create another reducer place in here
export const rootReducer = combineReducers ({
    books: BooksReducer
})