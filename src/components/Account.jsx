/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
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