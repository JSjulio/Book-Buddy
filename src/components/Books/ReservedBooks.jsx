import React, {useContext} from 'react';
import { AuthContext } from '../../App';
import { useGetReservationsQuery } from '../../../api/bookApi';

const ReservedBooks = () => {
    const { token } = useContext(AuthContext);
    const { data: reservations, isLoading, isError } = useGetReservationsQuery(token);

    console.log('reservations data:', reservations);

    if (isLoading) return <div>Loading...</div>;
    if (isError || !reservations) return <div>Error fetching reservations</div>;

    return (
        <div>
            <h2>Reserved Books</h2>
            <ul>
                {reservations.map(book => (
                    <li key={book.id}>
                    <h3>{book.title}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReservedBooks;