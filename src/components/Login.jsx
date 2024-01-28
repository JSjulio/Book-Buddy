import { useState } from "react";
import { useLoginMutation } from "../../api/bookApi";
import { useDispatch } from 'react-redux';
import { setToken } from './AuthSlice';
import { useNavigate } from "react-router-dom";

const Login = () => {

    //API call to login
    const [login, { isLoading, isError, error}] = useLoginMutation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Declare dispatch and navigate function
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Take token and submit for authentication
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const { token } = await login({ email, password }).unwrap();
            dispatch(setToken(token)); // Dispatching the setToken action
            //After succesful log in navigate to available books
            navigate('/availablebooks')
        } catch (error) {
            console.error('Login failed: ', error);
        }
    }

    return (
        <>
            <div className="loginContainer">
            <h3>Login</h3>
            <p style={{color:'red'}}>{isError && error.data.message}</p>
            <div className="login">
            <form onSubmit={handleSubmit}>
                <label>
                    Email: 
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    Password: 
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button type="submit" disabled={isLoading}>Submit</button>
            </form>
            </div>
            </div>
        </>
    )
};

export default Login;