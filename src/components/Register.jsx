import { useState } from "react";
import { useRegisterMutation } from "../../api/mainApi";

const Registration = () => {

    const [register, { isLoading, error }] = useRegisterMutation(); // access the query from bookAPI query function that is passed into rootReducer / store 
    const [formData, setFormData] = useState({email: "", password: ""}); // state to hold user data from entry
    const [token, setToken] = useState(null); // state to hold token from the API 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value }); // set form data to what is entered on the form 
    };

    // asyn function to POST to API 
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const result = await register(formData).unwrap(); //resigter triggers the builder.mutation to POST data to the API and recieve a token
            setToken(result.token); // capture and set the token from the result 

        } catch (error) {
            console.error('error occured:', {error}); // console error if API POST fails i.e: exsisting account 
        }
    };

    if (isLoading) 
        return <div>Loading...</div>; // rendered error on web app

    if (error) 
        return <div>An error occurred: {error.data.message}</div>;

    // Render the form
    return (
    <> 
        <h3>Register here:</h3>
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
                Password:
                <input type="password" name="password" autoComplete="new-password" value={formData.password} onChange={handleChange} required />
            </label>
            <button type="submit">Register</button>
        </form>
        {token && <div>Your token is: {token}</div>} {/* Conditionally render the token if it exists */}
        <hr></hr>
    </>
    );
};

export default Registration;


// account credientials I used: email : isaiasjulio1@icloud.com | pw: qwertyuiop