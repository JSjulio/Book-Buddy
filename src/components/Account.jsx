/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */


const Account = ( {email} ) => {

    return (
        <>
        <h3>Welcome, {email}</h3>
        <h3>Books check out:</h3>       
        </>
    )
}

export default Account;