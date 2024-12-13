import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Alert } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined, GoogleOutlined, FacebookFilled } from '@ant-design/icons';
import { Spin } from 'antd';
import { assets } from '../../assets';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IAppDispatch, IRootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { userSignIn } from 'src/redux/api/authApi';
import './signIn.scss';
import { IUserData } from 'src/redux/api/authSlice';
import { setSelectedPath } from 'src/redux/navbar';

export interface IUserSignInData {
    email: string;
    password: string;
    remember: boolean;
}

export const SignInPage = () => {
    const dispatch = useDispatch<IAppDispatch>();
    const { loading, error, userData, role } = useSelector((state: IRootState) => state.auth);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(role);
    const onSubmit = (data: IUserData) => {
        dispatch(userSignIn(data));
    };

    // useEffect(() => {
    //     if (userData) navigate('/');
    // }, [userData]);

    // navigate with pathname
    useEffect(() => {
        console.log('run');
        if (role === 'user') {
            // dispatch(setSelectedPath('/'));
            navigate('/');
        }

        if (role === 'admin') {
            // dispatch(setSelectedPath('admin'));
            navigate('/admin');
        }
    }, [role]);

    // reload getUserInfo by token

    return (
        <Row gutter={16} style={{ height: '100vh' }}>
            <Col style={{ display: 'flex' }} span="14">
                <div className="backgroundSignIn">
                    <img src={assets.signInSignUpBG} alt="" />
                </div>
            </Col>

            <Col span="10" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '90%' }}>
                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={onSubmit}
                        style={{ maxWidth: 350, margin: 'auto' }}
                    >
                        <Link to="/">
                            <img src={assets.loginLogo} alt="loginLogo" width={190} style={{ marginBottom: '20px' }} />
                        </Link>

                        <Form.Item name="email" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" style={{ marginRight: '6px' }} />}
                                placeholder="Email"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password
                                size="large"
                                prefix={<LockOutlined className="site-form-item-icon" style={{ marginRight: '6px' }} />}
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot" href="/">
                                    Forgot password
                                </a>
                            </div>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" size="large" htmlType="submit" style={{ width: '100%' }}>
                                {loading ? (
                                    <Spin indicator={<LoadingOutlined style={{ fontSize: '14px' }} spin />} />
                                ) : (
                                    'Sign In'
                                )}
                                {error && <Alert type="warning" showIcon message="Wrong username or password" />}
                            </Button>
                            Or <Link to="/signUp">Sign up now</Link>
                        </Form.Item>

                        <hr className="solid" style={{ width: '60%', color: 'red' }} />
                        <div style={{ textAlign: 'center' }}>
                            <p>Or Sign up with:</p>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <FacebookFilled style={{ fontSize: '200%', margin: '0 10px 0 10px' }} />

                                <GoogleOutlined style={{ fontSize: '200%', margin: '0 10px 0 10px' }} />
                            </div>
                        </div>
                    </Form>
                </div>
            </Col>
        </Row>
    );
};
