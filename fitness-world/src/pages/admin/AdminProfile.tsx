import {
    Row,
    Flex,
    Select,
    Input,
    Typography,
    Menu,
    MenuProps,
    Button,
    Col,
    Avatar,
    Modal,
    Upload,
    Form,
    Image,
    theme,
} from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { customColors, navBarHeight } from 'src/theme';
import {
    EditOutlined,
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
    UserOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { Props } from 'react-infinite-scroll-component';
import { ChangeInformation } from 'src/components/userComponents/change-info';
import { assets } from 'src/assets';

export const AdminProfilePage = () => {
    const [isEditForm, setIsEditForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = theme.useToken();

    const handleSubmitEditForm = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsEditForm(false);
            setIsLoading(false);
        }, 3000);
    };

    const handleCloseEditForm = () => {
        setIsEditForm(false);
    };

    return (
        <>
            <Row gutter={16}>
                <Col span={24}>
                    <Flex justify="space-between" align="center">
                        <Flex>
                            <Avatar size={64} icon={<UserOutlined />} style={{ margin: '5px 10px' }} />
                            <Flex vertical>
                                <Typography.Title level={4} style={{ margin: '5px' }}>
                                    Phan Nguyen Hoang Bao
                                </Typography.Title>
                                <Typography.Title level={4} style={{ margin: '5px' }}>
                                    Ho Chi Minh, Viet Nam
                                </Typography.Title>
                            </Flex>
                        </Flex>
                        <Button
                            icon={<EditOutlined />}
                            size="large"
                            style={{ fontWeight: '600', marginRight: '10px' }}
                            onClick={() => setIsEditForm(true)}
                        >
                            Edit information
                        </Button>
                    </Flex>
                </Col>
            </Row>
            <Modal
                open={isEditForm}
                onOk={handleSubmitEditForm}
                onCancel={handleCloseEditForm}
                confirmLoading={isLoading}
            >
                {/* <Flex
                    style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        padding: '20px 50px 30px 50px',
                        borderRadius: '20px',
                    }}
                >
                    
                </Flex> */}
                <Flex justify="center" vertical>
                    <Typography style={{ fontSize: '30px', textAlign: 'center', fontWeight: '500' }}>
                        Change Information
                    </Typography>
                    <Flex>
                        <Form layout="vertical" style={{ marginTop: '40px' }}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label={
                                            <Typography
                                                style={{
                                                    color: customColors.colorQuaternaryText,
                                                    fontWeight: 'bold',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                Fullname
                                            </Typography>
                                        }
                                    >
                                        <Input placeholder="Enter your fullname here" size="large" />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item
                                        label={
                                            <Typography
                                                style={{
                                                    color: customColors.colorQuaternaryText,
                                                    fontWeight: 'bold',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                Old Password
                                            </Typography>
                                        }
                                    >
                                        <Input.Password placeholder="Enter your old password" size="large" />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item
                                        label={
                                            <Typography
                                                style={{
                                                    color: customColors.colorQuaternaryText,
                                                    fontWeight: 'bold',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                Email address
                                            </Typography>
                                        }
                                    >
                                        <Input placeholder="Enter your email here" size="large" />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item
                                        label={
                                            <Typography
                                                style={{
                                                    color: customColors.colorQuaternaryText,
                                                    fontWeight: 'bold',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                New Password
                                            </Typography>
                                        }
                                    >
                                        <Input.Password placeholder="Enter your old password" size="large" />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item
                                        label={
                                            <Typography
                                                style={{
                                                    color: customColors.colorQuaternaryText,
                                                    fontWeight: 'bold',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                Choose an avatar (optional)
                                            </Typography>
                                        }
                                    >
                                        <Row style={{ alignItems: 'center', gap: '20px' }}>
                                            <Image
                                                src={assets.avatar}
                                                alt="Avatar"
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    borderRadius: '50px',
                                                    border: `2px solid ${token.colorPrimary}`,
                                                    objectFit: 'cover',
                                                    aspectRatio: '1 / 1',
                                                }}
                                                preview={{ mask: null }}
                                            />

                                            <Upload>
                                                <Button icon={<UploadOutlined />}>Change Avatar</Button>
                                            </Upload>
                                        </Row>
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item
                                        label={
                                            <Typography
                                                style={{
                                                    color: customColors.colorQuaternaryText,
                                                    fontWeight: 'bold',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                Confirm New Password
                                            </Typography>
                                        }
                                    >
                                        <Input.Password placeholder="Enter your old password" size="large"/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Flex>
                </Flex>
            </Modal>
        </>
    );
};
