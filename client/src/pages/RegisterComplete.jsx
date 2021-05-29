import React, { useState,useEffect } from 'react';
import { auth } from '../firebase';
import { toast } from 'react-toastify';

const RegisterComplete = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email || !password){
            toast.error('Email and password is required');
        }
        try{
            const result = await auth.signInWithEmailLink(email,window.location.href);
            // console.log(result);
            if (result.user.emailVerified){
                window.localStorage.removeItem('emailForRegistration');

                const user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();

                history.push('/');
            }

        }
        catch(error){
            console.log(error);
        }

    }
    const completeRegisterForm = () => {
        return <form onSubmit={handleSubmit}>
            <input type="email" className="form-control"
                value={email} disabled />
            <input type="password" className="form-control"
                value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="btn btn-raised"> COMPLETE REGISTRATION</button>
        </form>
    }
    return (
        <div className="container p-5">
            <div className="offset-md-3 col-md-6">
                <p>Complete Registration</p>
                {completeRegisterForm()}
            </div>

        </div>
    )
}

export default RegisterComplete
