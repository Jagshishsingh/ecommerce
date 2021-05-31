import React, { useState } from 'react';
import { auth } from '../firebase';
import { toast } from 'react-toastify';

const Register = () => {
    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_REGISTERED_REDIRECT_URL,
            handleCodeInApp: true
        };
        await auth.sendSignInLinkToEmail(email, config);
        toast.success(`Email sent to ${email},click link to confirm registration.`);
        window.localStorage.setItem("emailForRegistration", email);
        setEmail("");
    }

    return (
        <div className="container p-5">
            <div className="offset-md-3 col-md-6">
                <p>Register</p>
                <form onSubmit={handleSubmit}>
                    <input type="email" className="form-control"
                        value={email} onChange={e => setEmail(e.target.value)} autoFocus />
                    <button type="submit" className="btn btn-raised"> REGISTER</button>
                </form>
            </div>

        </div>
    )
}

export default Register
