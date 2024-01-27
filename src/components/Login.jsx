/* TODO - add your code to create a functional React component that renders a login form */
import { useState, useContext } from "react";
import { useLoginMutation } from "../../api/bookApi";
import { AuthContext } from '../App'

const Login = () => {
    const [login, { isLoading, isError, error}] = useLoginMutation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { onLogin } = useContext(AuthContext);

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Hello 👋");
        const { token } = await login({email, password}).unwrap()

        console.log('token: ', token)
        onLogin(token);

        }
    
        return (
            <>
                <h3>Login</h3>
                <h2 style={{color:'red'}}>{isError && error.data.message}</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Email: <input value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                    <label>
                        Password: <input value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                    <button>Submit</button>
                </form>
            </>
        )
    }

;

export default Login