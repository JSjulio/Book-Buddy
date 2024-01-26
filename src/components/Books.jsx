/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import  { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchBooks } from './BooksSlice' 

const Books = () => {
    const dispatch = useDispatch(); //Creates a dispatch action, makes it work in the application
    const { allBooks, loading, error } = useSelector(state => state.books); //Accesses book state from redux store

    useEffect(() => {
        //Dispatches action of displaying books when call is made
        dispatch(fetchBooks());
    }, [dispatch]);

    if (loading) {
        //Displays loading message if data is still being fetched
        return <div>Loading books...</div>;
    }

    if (error) {
        //Throws error if books cannot be loaded
        return <div>Error loading books: {error}</div>
    }

    //If not an array specifies what is being passed
    if(!Array.isArray(allBooks)){
        console.error('Expected to be an array, but got', typeof allBooks);
        return <div>Error: Books data is not set in the correct format.</div>
    }

    return (
        <div>
            <h1>Books</h1>
            {/* Ternary staement CONDITIONAL STATEMENT ? (IF) : (ELSE) 
            Map out book array
            */}
            {allBooks.length > 0 ? (
                <ul>
                    {allBooks.map(book => (
                        <li key={book.id}>
                            <h3>{book.title}</h3>
                            <p>Author: {book.author}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No books available.</p>
            )}
        </div>
    );
};

export default Books;