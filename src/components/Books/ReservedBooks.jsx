import React from 'react';
import { useSelector } from 'react-redux';
import { useGetReservationsQuery, useReturnBookMutation, useFetchBooksQuery } from '../../../api/bookApi';

const ReservedBooks = () => {
    // Use useSelector to access the token from Redux store
    const token = useSelector((state) => state.auth.token);

    const { data: reservations, isLoading, isError, refetch: refetchReservations } = useGetReservationsQuery(token);
    const { refetch: refetchBooks } = useFetchBooksQuery();
    const [returnBook] = useReturnBookMutation();

    console.log('reservations data:', reservations);

    if (isLoading) return <div>Loading...</div>;
    if (isError || !reservations) return <div>Error fetching reservations</div>;

    const handleReturn = (reservationId) => {    
        returnBook({ reservationId, token})
        .unwrap()
        .then(() => {
            refetchReservations();
            refetchBooks();
        })
        .catch(error => {
            console.error('Error updating the book', error);
        });
    };

    return (
        <div className='bookGrid'>
            <h2>Reserved Books</h2>
            <div className="grid-container">
                {reservations.map(reservation => (
                    <div key={reservation.id} className='individualBook'>
                        <h3>{reservation.title}</h3>
                        <p>{reservation.id}</p>
                        <p>Author: {reservation.author}</p>
                        <img src={reservation.coverimage} alt={reservation.title} />
                        <button onClick={() => handleReturn(reservation.id)}>Return</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReservedBooks;