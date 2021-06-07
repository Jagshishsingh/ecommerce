import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../functions/auth';

const AdminRoute = ({ children, ...rest }) => {
    const [ok, setOk] = useState(false)
    const { user } = useSelector(state => ({ ...state }));

    useEffect(async () => {
        if (user && user.token) {
            await currentAdmin(user.token)
                .then((res) => {
                    console.log("CURRENT ADMIN RES: ", res);
                    setOk(true);
                })
                .catch((err) => {
                    console.log("ADMIN ROUTE ERR: ", err);
                    setOk(false);
                })
        }
    },[user]);



    return ok ? (<Route {...rest} render={() => children} />)
        : <LoadingToRedirect />;
}

export default AdminRoute
