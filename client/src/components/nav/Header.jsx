import { HomeOutlined, ShoppingCartOutlined, ShoppingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Badge, Col, Menu, Row } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import firebase from 'firebase';

import Search from "../forms/Search";

const { SubMenu, Item } = Menu;


const Header = () => {
    const [current, setCurrent] = useState('home')
    const history = useHistory();
    const dispatch = useDispatch();
    const { user, cart } = useSelector((state) => ({ ...state }));
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
            <Row className="">
                <Col sm={24} lg={8} className="d-flex justify-content-lg-start justify-content-sm-center ">
                    <Row >
                        <Item key="home" icon={<HomeOutlined />}>
                            <Link to="/">HOME</Link>
                        </Item>

                        <Item key="shop" icon={<ShoppingOutlined />}>
                            <Link to="/shop">Shop</Link>
                        </Item>

                        <Item key="cart" icon={<ShoppingCartOutlined />}>
                            <Link to="/cart">
                                <Badge count={cart.length} offset={[9, 0]}>
                                    Cart
                                </Badge>
                            </Link>
                        </Item>
                    </Row>
                </Col>
                <Col sm={24} lg={8} className="d-flex justify-content-center">
                    <span className="float-right p-1">
                        <Search />
                    </span>
                </Col>
                <Col sm={24} lg={8} className="d-flex justify-content-lg-end justify-content-sm-center ">
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

                </Col>

            </Row>
        </Menu>
    )
}

export default Header;
