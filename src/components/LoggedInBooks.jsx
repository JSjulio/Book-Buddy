/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import React, { useContext } from 'react';
import { AuthContext } from '../App'
import { useFetchBooksQuery, useCheckoutBookMutation, useGetReservationsQuery } from '../../api/bookApi';

const LoggedInBooks = () => {
    const { token } = useContext(AuthContext);
    const { data: books, error: booksError , isLoading: booksLoading, refetch: refetchBooks } = useFetchBooksQuery();

    const [checkoutBook] = useCheckoutBookMutation();

    const { refetch: refetchReservations } = useGetReservationsQuery(token);

    if (booksLoading) return <div>Loading books...</div>;
    if (booksError) return <div>Error loading books: {booksError.toString()}</div>;

    const handleCheckout = (bookId) => {
        checkoutBook({ bookId, available: false, token})
        .unwrap()
        .then(() => {
            refetchBooks();
            refetchReservations();
        })
        .catch(error => {
            console.error('Error updating the book', error);
        });
    };

    const availableBooks = books.filter(book => book.available);
    const notAvailableBooks = books.filter(book => !book.available);

    return (
        <div className='bookGrid'>
            <h1>Available!</h1>
            {availableBooks.length > 0 && (
                <div className="grid-container">
                    {availableBooks.map(book => (
                        <div key={book.id} className='individualBook'>
                            <h3>{book.title}</h3>
                            <p>Author: {book.author}</p>
                            <img src={book.coverimage} alt={book.title} />
                            <button onClick={() => handleCheckout(book.id)}>Checkout</button>
                        </div>
                    ))}
                </div>
            )}
            <h1>Not available!</h1>
            {notAvailableBooks.length > 0 && (
                <div className="grid-container">
                    {notAvailableBooks.map(book => (
                        <div key={book.id} className='individualBook'>
                            <h3>{book.title}</h3>
                            <p>Author: {book.author}</p>
                            <img src={book.coverimage} alt={book.title} />
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default LoggedInBooks;