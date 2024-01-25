// Registration.jsx
import { useState } from "react";
import { useUserRegistrationMutation } from "../../api/bookApi";
const Registration = () => {
    const [register, { isLoading, error }] = useUserRegistrationMutation();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData).unwrap();
        } catch (err) {
            //
        }
    };
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;
    // Render the form
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>
            <button type="submit">Register</button>
        </form>
    );
};

export default Registration;