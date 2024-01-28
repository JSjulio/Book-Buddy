import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    selectedBook: null,
    selectedBookDetails: null,
    reservedBooks: [],
    availableBooks: [],
    unavailableBooks: [],
};

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        checkoutBook: (state, action) => {
            const bookId = action.payload;
            state.reservedBooks.push(bookId);
            state.availableBooks = state.availableBooks.filter(book => book.id !== bookId);
            state.unavailableBooks.push(bookId);
        },
        returnBook: (state, action) => {
            const bookId = action.payload;
            state.reservedBooks = state.reservedBooks.filter(book => book.id !== bookId);
            state.unavailableBooks = state.unavailableBooks.filter(book => book.id !== bookId);
            state.availableBooks.push(bookId);
        },
    },
});

export const { checkoutBook, returnBook } = bookSlice.actions;
export default bookSlice.reducer;