import { useState } from "react";
import { useRegisterMutation } from "../../api/bookApi";

const Registration = () => {

    //Assign consts registraiton mutation
    const [register, { isLoading, error }] = useRegisterMutation();

    //Form data to be submitted
    const [formData, setFormData] = useState({ email: "", password: "", });
    
    //Set state for token
    const [token, setToken] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //Wait for form data create token
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await register(formData).unwrap();
            setToken(result.token);
        } catch (err) {
            console.error('error occured:', err);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>An error occurred: {error.data.message}</div>;

    // Render the form
    return (
        <>
            <div class="loginContainer">
            <h3>Register</h3>
            <div class="login">
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
                {token && <div>Your token is: {token}</div>}
                <hr></hr>
            </div>
            </div>
        </>
    );
};

export default Registration;