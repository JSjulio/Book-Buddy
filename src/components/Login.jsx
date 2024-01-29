/* TODO - add your code to create a functional React component that renders a login form */
import { useState } from "react";
import { useLoginMutation } from "../../api/bookApi";
import Account from './Account'

const Login = () => {

    const [ login, {
        isLoading,
        isError,
        error
    } ] = useLoginMutation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formSubmitted, setForm] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Submit clicked 👋");
        setForm(true);

        if (!isError) {
            console.log('error is false; token exists!!! :)');
        } else {
            console.log('error is true; NO token :(')
        }

        const data = await login({email, password}).unwrap()
        console.log('data: ', data)

        }
    
        return (
            <>
                <h1>Login</h1>
                {!formSubmitted && (
                    <h3>Welcome! Please sign in to see your account details.</h3>
        
                )}
                {isError && (
                    <h2 style={{color:'red'}}> {error.data.message}</h2>
                )}

                {formSubmitted && !isError && (
                    <Account />
                )}
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