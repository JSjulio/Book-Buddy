import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    selectedBook: null,
    selectedBookDetails: null,
    reservedBooks: [],
    availableBooks: [],
    unavailableBooks: [],
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        fetchBookDetails: (state, action) => {
            state.selectedBookDetails = action.payload;
        },
        selectBook: (state, action) => {
            state.selectedBook = action.payload;
        },
        clearSelection: (state) => {
            state.selectedBook = null;
            state.selectedBookDetails = null;
        },
        reserveBook: (state, action) => {
            const index = state.availableBooks.findIndex(book => book.id === action.payload);
            if (index !== -1) {
                state.availableBooks[index].available = false;
                const [bookToReserve] = state.availableBooks.splice(index, 1);
                state.reservedBooks.push(bookToReserve);
            }
        },
        returnBook: (state, action) => {
            const index = state.reservedBooks.findIndex(book => book.id === action.payload);
            if (index !== -1) {
                state.reservedBooks[index].available = true;
                const [bookToReturn] = state.reservedBooks.splice(index, 1);
                state.availableBooks.push(bookToReturn);

                const unavailableIndex = state.unavailableBooks.findIndex(book => book.id === action.payload);
                if (unavailableIndex !== -1) {
                    state.unavailableBooks.splice(unavailableIndex, 1);
                }
            }
        },
        setBooks: (state, action) => {
            state.availableBooks = action.payload.available;
            state.reservedBooks = action.payload.reserved
        }
    },
});

export const { selectBook, clearSelection, fetchBookDetails, reserveBook, returnBook, setBooks } = booksSlice.actions;
export default booksSlice.reducer;

export const getSelectedBookDetails = (state) => state.books.selectedBookDetails;

export const getAvailableBooks = (state) => {
    return state.books.availableBooks.filter(book => book.available);
};