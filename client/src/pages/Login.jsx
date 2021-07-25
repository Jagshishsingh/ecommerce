import { GoogleOutlined, LoadingOutlined, LoginOutlined } from '@ant-design/icons';
import { Button, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { auth, googleAuthProvider } from '../firebase';
import { createOrUpdateUser } from '../functions/auth';

const Login = ({ history }) => {
    const [email, setEmail] = useState('singhjagshish0001@gmail.com');
    const [password, setPassword] = useState('12345678');
    const [loading, setLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        let intended = history.location.state;
        if (intended) {
            return;
        } else {
            if (user && user.token) history.push("/");
        }
    }, [user, history])

    const roleBasedRedirect = (res) => {
        let intended = history.location.state;
        if (intended) {
            history.push(intended.from);
        } else {
            if (res === 'admin') {
                history.push('/admin/dashboard');
            }
            else if (res === 'subscriber') {
                history.push('/user/history');
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoadingError(false);
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();

            createOrUpdateUser(idTokenResult.token)
                .then(res => {
                    console.log(res);
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            _id: res.data._id
                        }
                    });
                    roleBasedRedirect(res);
                }).catch(error => {
                    console.log(error);
                });


        }
        catch (error) {
            console.log(error);
            toast.error(error);
            setLoading(false);
            setLoadingError(true);
        }

    }
    const googleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoadingError(false);
        try {
            const result = await auth.signInWithPopup(googleAuthProvider);
            console.log('------');
            console.log(result);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();

            createOrUpdateUser(idTokenResult.token)
                .then(res => {
                    console.log(res);
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            _id: res.data._id
                        }
                    });
                    roleBasedRedirect(res);
                }).catch(error => {
                    console.log(error);
                });
        }
        catch (error) {
            console.log(error);
            toast.error(error);
            setLoading(false);
            setLoadingError(true);
        }
    }
    return (
        <div className="container p-5 d-flex justify-content-center">
            <Col sm={24} lg={16}>
                <div className="">
                    {loading ? (<h1><LoadingOutlined spin /></h1>) : (<h1>Login</h1>)}
                    <form onSubmit={handleSubmit}>
                        <input type="email" className="form-control" style={{ fontSize: "20px" }}
                            value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                        <input type="password" className="form-control mb-3" style={{ fontSize: "20px" }}
                            value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                        {loadingError && (<small class="text-danger">
                            Email Id or Password wrong
                        </small>)}
                        <Button type="primary" shape="round" className="mb-2" size="large"
                            disabled={!email || password.length < 6 || loading}
                            icon={<LoginOutlined spin />} block onClick={handleSubmit} >
                            Login
                        </Button>

                        <Button type="danger" shape="round" size="large"
                            disabled={loading}
                            icon={<GoogleOutlined spin />} block onClick={googleLogin} >
                            Login with google
                        </Button>
                        <Link to="/forgot/password" className="float-right text-danger">Forgot Password</Link>
                    </form>
                </div>
            </Col>
        </div>
    )
}

export default Login

