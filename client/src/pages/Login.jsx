import React, { useState,useEffect } from 'react';
import { auth, googleAuthProvider } from '../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { LoginOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch,useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

const Login = ({ history }) => {
    const [email, setEmail] = useState('singhjagshish0001@gmail.com');
    const [password, setPassword] = useState('1234567');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        (user && user.token) && history.push('/');   
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    email: user.email,
                    token: idTokenResult.token
                }
            });
            history.push('/');

        }
        catch (error) {
            console.log(error);
            toast.error(error);
            setLoading(false);
        }

    }
    const googleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await auth.signInWithPopup(googleAuthProvider);
            console.log('------');
            console.log(result);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    email: user.email,
                    token: idTokenResult.token
                }
            });
            history.push('/');
        }
        catch (error) {
            console.log(error);
            toast.error(error);
            setLoading(false);
        }
    }
    return (
        <div className="container p-5">
            <div className="offset-md-3 col-md-6">
                {loading?(<h1>Loading...</h1>):(<h1>Login</h1>)}
                <form onSubmit={handleSubmit}>
                    <input type="email" className="form-control"
                        value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                    <input type="password" className="form-control mb-3"
                        value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                    <Button type="primary" shape="round"
                        disabled={!email || password.length < 6}
                        icon={<LoginOutlined />} block onClick={handleSubmit} >
                        Login
                    </Button>
                    <Button type="danger" shape="round"
                        icon={<GoogleOutlined />} block onClick={googleLogin} >
                        Login with google
                    </Button>
                    <Link to="/forgot/password" className="float-right text-danger">Forgot Password</Link>
                </form>
            </div>

        </div>
    )
}

export default Login

