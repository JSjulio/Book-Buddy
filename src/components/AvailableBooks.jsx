import { useSelector } from 'react-redux';
import { useFetchBooksQuery, useCheckoutBookMutation, useGetReservationsQuery } from '../../api/bookApi';
import { Link } from 'react-router-dom';

const AvailableBooks = () => {
    // Access the token from Redux store
    const token = useSelector((state) => state.auth.token);

    //Assign consts to use fetchBooks Query
    const { data: books, error: booksError, isLoading: booksLoading, refetch: refetchBooks } = useFetchBooksQuery();
    

    //Get reserved books
    const { refetch: refetchReservations } = useGetReservationsQuery(token);

    //Assign variable to checkout mutation in API
    const [checkoutBook] = useCheckoutBookMutation();

    //Load books
    if (booksLoading) return <div>Loading books...</div>;
    if (booksError) return <div>Error loading books: {booksError.toString()}</div>;

    //Upon clicking on checkout return to available state and remove from reserved books
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