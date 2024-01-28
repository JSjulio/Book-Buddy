/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFetchBookByIdQuery, useCheckoutBookMutation } from "../../api/bookApi";

const SingleBook = () => {
    const { bookId } = useParams();
    const { data: book, error, isLoading } = useFetchBookByIdQuery(bookId);

    //Assign token to use selector
    const token = useSelector((state) => state.auth.token);

    //Assign checkoutbook API mutation
    const [checkoutBook] = useCheckoutBookMutation();

    //Declare boolean so checkout button only displays when logged in
    const isLoggedIn = Boolean(token)

    //Navigate for going to previous page
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>

    //Checkout book by ID change availability to false
    const handleCheckout = () => {
        if (book && book.available) {
            checkoutBook({ bookId, available: false, token })
                .unwrap()
                .then(() => {
                    navigate('/');
                }).catch(error => {
                    console.error('error checking out the book', error);
                });
        }
    };

    return (
        <div className="container">
            <div className="singleBook">
                <h1>{book.title}</h1>
                <h3>{book.author}</h3>
                <img src={book.coverimage} alt={book.title} />
                <p>{book.description}</p>
                <button onClick={goBack}>Go Back</button>
                {isLoggedIn && book?.available && (
                    <button onClick={() => handleCheckout(book.id)}>Checkout</button>
                )}
            </div>
        </div>
    );
};

export default SingleBook;