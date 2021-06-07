import React, { useState } from 'react';

import { Menu } from 'antd';
import { HomeOutlined, EllipsisOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';

const { SubMenu, Item } = Menu;


const Header = () => {
    const [current, setCurrent] = useState('home')
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => { return state.user });
    const handleClick = (e) => {
        setCurrent(e.key);
    }
    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: 'LOGOUT',
            payload: null
        });
        history.push('/login');
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<HomeOutlined />}>
                <Link to="/">HOME</Link>
            </Item>
            {!user && (<Item key="register" icon={<UserAddOutlined />} className="float-right">
                <Link to="/register">REGISTER</Link>
            </Item>)}

            {!user && (<Item key="login" icon={<UserOutlined />} className="float-right">
                <Link to="/login">LOGIN</Link>
            </Item>)}

            {user && (<SubMenu title={user && user.email.split('@')[0]} className="float-right">
                {user && user.role === "subscriber" && (
                    <Item>
                        <Link to="/user/history">Dashboard</Link>
                    </Item>
                )}

                {user && user.role === "admin" && (
                    <Item>
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </Item>
                )}
                <Item key="logout" onClick={logout}>Logout</Item>
            </SubMenu>)}


        </Menu>
    )
}

export default Header;
