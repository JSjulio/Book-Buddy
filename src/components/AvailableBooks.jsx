import React from 'react';
import { useSelector } from 'react-redux';
import { useFetchBooksQuery, useCheckoutBookMutation, useGetReservationsQuery } from '../../api/bookApi';
import { Link } from 'react-router-dom';

const AvailableBooks = () => {
    // Access the token from Redux store
    const token = useSelector((state) => state.auth.token);

    const { data: books, error: booksError, isLoading: booksLoading, refetch: refetchBooks } = useFetchBooksQuery();
    const [checkoutBook] = useCheckoutBookMutation();
    const { refetch: refetchReservations } = useGetReservationsQuery(token);

    if (booksLoading) return <div>Loading books...</div>;
    if (booksError) return <div>Error loading books: {booksError.toString()}</div>;

    const handleCheckout = (bookId) => {
        checkoutBook({ bookId, available: false, token })
            .unwrap()
            .then(() => {
                refetchBooks();
                refetchReservations();
            })
            .catch(error => {
                console.error('Error updating the book', error);
            });
    };

    const availableBooks = books?.filter(book => book.available);
    const notAvailableBooks = books?.filter(book => !book.available);

    return (
        <div className='bookGrid'>
            <h1>Available Books</h1>
            {availableBooks.length > 0 && (
                <div className="grid-container">
                    {availableBooks.map(book => (
                        <div key={book.id} className='individualBook'>
                            <h3>{book.title}</h3>
                            <p>Author: {book.author}</p>
                            <img src={book.coverimage} alt={book.title} />
                            <Link to={`/books/${book.id}`}>More Details</Link>
                            <button onClick={() => handleCheckout(book.id)}>Checkout</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AvailableBooks;