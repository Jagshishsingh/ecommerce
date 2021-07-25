import { LoadingOutlined } from '@ant-design/icons';
import { Button, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { auth } from '../firebase';

const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

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
            .then(() => {
                setEmail('');
                setLoading(false);
                toast.success('Check your email for password reset link');
            }).catch((error) => {
                setLoading(false);
                toast.error(error.message);
                console.log(error);
            })

    }

    return (

        <div className="container p-5 d-flex justify-content-center">
            <Col sm={24} lg={16}>
                <div className="">
                    {loading ? (<h1><LoadingOutlined spin /></h1>) : (<h1>Forgot Password</h1>)}
                    <form onSubmit={handleSubmit}>
                        <input type="email" className="form-control mb-3" style={{ fontSize: "20px" }}
                            value={email} onChange={e => setEmail(e.target.value)} autoFocus />
                        <Button
                            shape="round" size="large" type="primary" disabled={!email || loading}
                            block onClick={handleSubmit}>Send Email</Button>
                    </form>
                </div>

            </Col>
        </div>
    )
}

export default ForgotPassword
