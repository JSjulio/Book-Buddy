import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Import axios to use easier call
import axios from "axios";

//Store the API URL
const BOOKS_URL = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books';

//Set up initial state
const initialState = {
    allBooks: [], //Books is an array
    selectedBook: null, //No specific book is selected
    loading: false, //Loading is not currently happening
    error: null //No current error
};

//Fetches data
export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    //Fetches information using axios
    //Axios sipmlifies API calls. Install by using npm install axios
    async () => {
        try {
            const response = await axios.get(BOOKS_URL)
            return response.data.books;
        } catch (err) {
            return err.message;
        }
    })


const booksSlice = createSlice({
    name: 'books', //Name of state
    initialState, //State created abovce
    reducers: {}, //Reducers can be used for synchronous actions that don't invovle API calls

    //Reducers are dependnecy linked actions
    extraReducers: (builder) => {
    
    builder
        //While awaiting fetch load books
        .addCase(fetchBooks.pending, (state) => {
            state.loading = true;
        })
        //If call is succesful render books
        .addCase(fetchBooks.fulfilled, (state, action) => {
            state.loading = false;
            state.allBooks = action.payload;
        })
        //If call fails render error
        .addCase(fetchBooks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "An error occured";
        });
    },
});

export default booksSlice.reducer;