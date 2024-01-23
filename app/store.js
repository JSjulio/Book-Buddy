import { configureStore } from "@reduxjs/toolkit"
import { bookApi } from "../api/bookApi"
// to install the toolkit run the: 
// npm install @reduxjs/toolkit react-redux

export const store = configureStore({ 
    // TODO reducer goes here 


    // TODO  middleware goes here
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});


