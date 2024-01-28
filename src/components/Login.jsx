import { useState } from "react";
import { useLoginMutation } from "../../api/bookApi";
import { useDispatch } from 'react-redux';
import { setToken } from './AuthSlice';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [login, { isLoading, isError, error}] = useLoginMutation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const { token } = await login({ email, password }).unwrap();
            dispatch(setToken(token)); // Dispatching the setToken action
            navigate('/availablebooks')
        } catch (error) {
            console.error('Login failed: ', error);
        }
    }

    return (
        <>
            <div className="loginContainer">
            <h3>Login</h3>
            <h2 style={{color:'red'}}>{isError && error.data.message}</h2>
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