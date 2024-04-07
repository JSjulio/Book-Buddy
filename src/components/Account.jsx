import { useAccountQuery } from "../../api/bookApi";
import { useSelector } from "react-redux";

import '../index.css';

const Account = () => {

    const token = useSelector((state) => state.auth.token);

    const { data: userDetails, isLoading, isError } = useAccountQuery(token);

    // Loading and error handling
    if (isLoading) return <div>Loading account details...</div>;
    if (isError || !userDetails) return <div>Error fetching account details</div>;

    return (
        <>
        <div className='container'>
            <div className='singleBook'>
            <h2>Account Details</h2>
                <p><strong>Email:</strong> {userDetails.email}</p>
            </div>
        </div>
        </>
    );

}

export default Account;