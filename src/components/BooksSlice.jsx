import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';

//Store the API URL
const BOOKS_URL = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api';

export const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: fetchBaseQuery({ baseUrl: BOOKS_URL }),
    endpoints: (builder) => ({
        fetchBooks: builder.query({
            query: () => `/books`,
            transformResponse: (response, meta, arg) => response.books,
        }),
    }),
});


const initialState = {
    selectedBook: null,
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        selectBook: (state, action) => {
            state.selectedBook = action.payload;
        },
        clearSelection: (state) => {
            state.selectedBook = null;
        },
    },
});

export const { selectBook, clearSelection } = booksSlice.actions;
export default booksSlice.reducer;

export const { useFetchBooksQuery } = booksApi;