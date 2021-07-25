import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import {createOrUpdateUser} from '../functions/auth';


const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();


    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Email and password is required');
        }
        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            // console.log(result);
            if (result.user.emailVerified) {
                window.localStorage.removeItem('emailForRegistration');

                const user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                
                createOrUpdateUser(idTokenResult.token)
                .then(res=>{
                    console.log(res);
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            name:res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role:res.data.role,
                            _id : res.data._id
                        }
                    });
                }).catch(error=>{
                    console.log(error);
                });
                history.push('/');
            }
        }
        catch (error) {
            console.log(error);
        }

    }
    return (
        <div className="container p-5">
            <div className="offset-md-3 col-md-6">
                <p>Complete Registration</p>
                <form onSubmit={handleSubmit}>
                    <input type="email" className="form-control"
                        value={email} disabled />
                    <input type="password" className="form-control"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="btn btn-raised"> COMPLETE REGISTRATION</button>
                </form>
            </div>

        </div>
    )
}

export default RegisterComplete
