import { Image, Menu, Col, Row, Button, Flex, ConfigProvider, theme, Badge, Dropdown, MenuProps, Popover } from 'antd';
import React, { Component, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { assets } from '../../../assets';
import { icons } from 'antd/es/image/PreviewGroup';
import { LogoutOutlined, LoginOutlined, UserOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import './style.scss';
import MenuItem from 'antd/es/menu/MenuItem';
import { useSelector } from 'react-redux';
import { IAppDispatch, IRootState } from 'src/redux/store';
import { useDispatch } from 'react-redux';
import { setSelectedPath } from 'src/redux/navbar';
import { signOut } from 'src/redux/api/authSlice';
import Cookies from 'js-cookie';
import { fetchProducts } from 'src/redux/products/productsSlice';
import { Footer } from 'src/components/userComponents/footer';

export const NavbarAdmin = () => {
    const location = useLocation();
    const dispatch = useDispatch<IAppDispatch>();
    const selectedPath = useSelector((state: IRootState) => state.navbarPath.path);
    const isAuthenticated = useSelector((state: IRootState) => state.auth.accessToken);
    const products = useSelector((state: IRootState) => state.cart.items) ?? null;
    const cartProductCount = products.reduce((total, product) => {
        return total + product.quantity;
    }, 0);
    const navigate = useNavigate();
    // fetch Products
    const productsStatus = useSelector((state: IRootState) => state.products.status);
    useEffect(() => {
        if (productsStatus == 'idle') dispatch(fetchProducts());
    });
    useEffect(() => {
        switch (location.pathname) {
            case '/':
                dispatch(setSelectedPath('home'));
                break;
            default:
                dispatch(setSelectedPath(''));
        }
    }, [location.pathname, dispatch]);

    const handleUserSignOut = () => {
        console.log('out');
        dispatch(signOut());
        navigate('/');
    };

    return (
        <>
            <Row
                gutter={16}
                style={{
                    padding: '8px 0 0px 0',
                    position: 'fixed',
                    margin: '0',
                    zIndex: '50',
                    width: '100%',
                    backgroundColor: '#fff',
                    top: '0',
                    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                }}
            >
                <Col className="navbar_logo" span={12}>
                    <Link to="/" >
                        <img src={assets.logo} alt="logo" width={180} style={{ padding: '0 0 4px 20px' }} />
                    </Link>
                </Col>

                <Col
                    className="navbar_button"
                    span={12}
                    style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '10px' }}
                >
                    <Flex gap="large" wrap="wrap" style={{ paddingTop: '4px' }}>
                        <ConfigProvider theme={{ components: { Button: { textHoverBg: '#ffffff' } } }}>
                            <Badge>
                                <Button
                                    icon={<UserOutlined style={{ fontSize: '18px' }} />}
                                    style={{ background: 'transparent', border: 0, boxShadow: 'none' }}
                                    size="large"
                                    onClick={() => navigate('/profile')}
                                />
                            </Badge>

                            <Badge>
                                <Button
                                    icon={<LogoutOutlined style={{ fontSize: '18px' }} />}
                                    style={{ background: 'transparent', border: 0, boxShadow: 'none' }}
                                    size="large"
                                    onClick={() => handleUserSignOut()}
                                />
                            </Badge>
                        </ConfigProvider>
                    </Flex>
                </Col>
            </Row>

            <Outlet />
        </>
    );
};
