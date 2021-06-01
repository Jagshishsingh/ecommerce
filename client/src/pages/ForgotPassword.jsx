import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import {useSelector} from 'react-redux';

const ForgotPassword = ({history}) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        (user && user.token) && history.push('/');   
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true
        }
        await auth.sendPasswordResetEmail(email, config)
        .then(()=>{
            setEmail('');
            setLoading(false);
            toast.success('Check your email for password reset link');
        }).catch((error)=>{
            setLoading(false);
            toast.error(error.message);
            console.log(error);
        })
        
    }

    return (
        <div className="container p-5">
            <div className="offset-md-3 col-md-6">
            {loading?(<h1>Loading...</h1>):(<h1>Forgot Password</h1>)}
                <form onSubmit={handleSubmit}>
                    <input type="email" className="form-control" placeholder="email"
                        value={email} onChange={e => setEmail(e.target.value)} autoFocus />
                    <button type="submit" className="btn btn-raised" disabled={!email}> Send email</button>
                </form>
            </div>

        </div>
    )
}

export default ForgotPassword
