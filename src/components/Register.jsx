import { useState } from "react";
import { useRegisterMutation } from "../../api/bookApi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Registration = () => {

    const navigate = useNavigate();

    //Assign consts registraiton mutation
    const [register, { isLoading, error }] = useRegisterMutation();

    //Form data to be submitted
    const [formData, setFormData] = useState({ email: "", password: "", });
    
    //Set state for token
    const [token, setToken] = useState(null);

    const [registrationSuccess, setRegistrationSuccess] = useState(false); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //Wait for form data create token
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await register(formData).unwrap();
            setToken(result.token);
            setRegistrationSuccess(true);
        } catch (err) {
            console.error('error occured:', err);
        }
    };

    useEffect(() => {
        if (registrationSuccess) {
            // Navigate to the account page after 2 seconds
            const timer = setTimeout(() => {
                navigate('/account'); // Replace '/account' with your account page route
            }, 2000);

            // Cleanup the timer
            return () => clearTimeout(timer);
        }
    }, [registrationSuccess, navigate]);

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>An error occurred: {error.data.message}</div>;

    if (registrationSuccess) return <div>Registration Successful! </div>;

    // Render the form
    return (
        <>
            <div className="loginContainer">
            <h3>Register</h3>
            <div className="login">
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