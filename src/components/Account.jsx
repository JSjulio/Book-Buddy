/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import { useAccountQuery } from "../../api/bookApi";
import { useSelector } from "react-redux";

const Account = () => {
const token = useSelector((state)=> state.login.token)
console.log('token: ', token)
    if (!token) {
        return <div></div>
    }

    const { data, isLoading } = useAccountQuery();
    
    if (isLoading) {
        return <div>Loading...</div>
    }

    console.log('data: ', data)
    // console.log('email: ', data.email)
    return (
        <>
        <h3>Welcome, {data.email}</h3>
        <h3>Books you have checked out:</h3>
        </>
    )
}

export default Account;