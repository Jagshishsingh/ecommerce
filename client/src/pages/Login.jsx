import React, { useState } from 'react';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import {useDispatch} from 'react-redux';

const Login = ({ history }) => {
    const [email, setEmail] = useState('singhjagshish0001@gmail.com');
    const [password, setPassword] = useState('1234567');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await auth.signInWithEmailAndPassword(email,password);
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();
            dispatch({
                type: "LOGGED_IN_USER",
                payload:{
                    email : user.email,
                    token : idTokenResult
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
                <p>Login</p>
                <form onSubmit={handleSubmit}>
                    <input type="email" className="form-control"
                        value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email"/>
                    <input type="password" className="form-control mb-3"
                        value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
                    <Button type="primary" shape="round" 
                    disabled ={!email || password.length < 6}
                    icon={<LogoutOutlined />} block onClick={handleSubmit} >
                        Login
                    </Button>
                </form>
            </div>

        </div>
    )
}

export default Login

