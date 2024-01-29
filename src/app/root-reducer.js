
import { combineReducers } from 'redux';

import { mainApi } from '../../api/bookApi';
import authReducer from '../components/AuthSlice'


//? Root reducer and CombineReducer function 
// ? to combine all reducers in the store. 
// ? Combine reducer is then passed into the store.js 

const rootReducer = combineReducers({
  auth: authReducer,
  [mainApi.reducerPath]: mainApi.reducer
  // TODO login reducer
  //add more reducers here: 
  // reducer3: reducer3, 
});

export default rootReducer; 