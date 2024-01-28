/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import React from 'react';
import { useFetchBooksQuery } from '../../api/bookApi';
import { Link } from 'react-router-dom';

const Books = () => {
    const { data: books, error, isLoading } = useFetchBooksQuery();

    if (isLoading) return <div>Loading books...</div>;
    if (error) return <div>Error loading books: {error.toString()}</div>;

    const availableBooks = books.filter(book => book.available);
    const notAvailableBooks = books.filter(book => !book.available);

    return (
        <div className='bookGrid'>
            <h1>Welcome</h1>
            {books.length > 0 &&
                <div className="grid-container">
                    {books.map(book => (
                        <div key={book.id} className='individualBook'>
                            <h3>{book.title}</h3>
                            <p>Author: {book.author}</p>
                            <img src={book.coverimage} alt={book.title} />
                            <Link to={`/books/${book.id}`}>More Details</Link>
                        </div>
                    ))}
                </div>
            };
        </div>
    );
};

export default Books;