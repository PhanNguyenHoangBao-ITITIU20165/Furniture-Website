import { useState, ChangeEvent, useEffect } from 'react';
import { Image, Button, Flex, Row, Col, Typography, Input, Table, theme, Form, Modal, Select, message } from 'antd';
import type { ThHTMLAttributes, TdHTMLAttributes } from 'react';
import type { TableColumnsType } from 'antd';
import { customColors, navBarHeight } from '../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { assets } from '../../assets';
import { ChangeInformation } from '../../components/userComponents/change-info';
import { useSelector } from 'react-redux';
import { IAppDispatch, IRootState } from 'src/redux/store';
import { IUserData } from 'src/redux/api/authSlice';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { IUserUpdateInfo, getUserInfo, updateUserInfo } from 'src/redux/api/authApi';
import { getUserOrders, getUserOrderDetails, IOrder } from 'src/redux/order/orderSlice';
import { OrderDataTable } from 'src/components/userComponents/dataTable/DataTable';
import { EditOutlined } from '@ant-design/icons';

const { Text } = Typography;

export const ProfilePage = () => {
    const { token } = theme.useToken();
    const [query, setQuery] = useState('');
    const [isChangeInfo, setIsChangeInfo] = useState(false);
    const userData: IUserData = useSelector((state: IRootState) => state.auth.userData) ?? {};
    const isAuthenticated = Cookies.get('accessToken');
    const dispatch = useDispatch<IAppDispatch>();
    const userOrders: IOrder[] | null = useSelector((state: IRootState) => state.order.orderList);
    const [form] = Form.useForm();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleClearSearch = () => {
        setQuery('');
    };

    // get all details of each order
    useEffect(() => {
        dispatch(getUserOrders());
        dispatch(getUserInfo());
    }, []);

    interface DataType {
        key: string;
        name: string;
        category: string;
        quantity: number;
        price: string;
    }

    // Change information
    const handleOpenChangeInfo = () => {
        form.setFieldsValue(userData);
        setIsChangeInfo(true);
    };

    const handleCloseChangeInfoModal = () => {
        form.resetFields();
        setIsChangeInfo(false);
    };

    const handleSave = async () => {
        try {
            if (userData !== null) {
                // Logic to update product information (replace with actual implementation)
                const values: any = await form.validateFields(); // Validate and get form values
                const data: IUserUpdateInfo = {
                    id: userData.id,
                    fullname: values.fullname,
                    phone: values.phone,
                    email: values.email,
                    address: values.address,
                    country: values.country,
                };
                dispatch(updateUserInfo(data));
            }
            message.success('User information updated successfully');
            setIsChangeInfo(false);
        } catch (error) {
            console.error('Validation error:', error);
        }
    };

    return (
        <Flex
            style={{
                flexDirection: 'column',
                alignItems: 'center',
                width: '100vw',
                position: 'relative',
                paddingTop: `${navBarHeight}`,
            }}
        >
            <Flex style={{ width: '70%', justifyContent: 'space-between', alignItems: 'center', marginTop: '50px' }}>
                <Flex style={{ gap: '20px', alignItems: 'center' }}>
                    <Image
                        src={assets.avatar}
                        preview={{ mask: null }}
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '100px',
                            border: `5px solid ${token.colorPrimary}`,
                        }}
                    />
                    <Flex style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: '30px', fontWeight: '600' }}>{userData.fullname}</Text>
                        <Text style={{ fontSize: '20px', fontWeight: '500', color: customColors.colorQuaternaryText }}>
                            {userData.email}
                        </Text>
                    </Flex>
                </Flex>
                <Button
                    size="large"
                    style={{
                        fontWeight: '600',
                    }}
                    onClick={handleOpenChangeInfo}
                >
                    Change Information
                </Button>
            </Flex>
            <Flex style={{ width: '70%', marginTop: '50px', flexDirection: 'column' }}>
                <Flex justify="space-between">
                    <Text style={{ fontSize: '30px', fontWeight: '500', marginBottom: '20px' }}>Purchase History</Text>
                    {/* <Input.Search
                        size="large"
                        placeholder="input search text"
                        allowClear
                        // onSearch={onSearch}
                        style={{ width: '25%' }}
                    /> */}
                </Flex>

                <OrderDataTable orderData={userOrders || []} />
            </Flex>

            {/* {isChangeInfo && (
                <Flex
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        overflow: 'hidden',
                        animation: 'fadeIn 0.3s ease-in',
                    }}
                    onClick={() => setIsChangeInfo(false)}
                >
                    <Flex
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: 'absolute',
                            transform: 'translate(-50%, -50%)',
                            left: '50%',
                            top: '50%',
                            animation: 'slideUp 0.3s ease-out',
                        }}
                    >
                        <ChangeInformation setIsChangeInfo={setIsChangeInfo} />
                    </Flex>
                    <style>
                        {`  
                            @keyframes fadeIn {
                                from {
                                    background-color: rgba(0, 0, 0, 0);
                                }
                                to {
                                    background-color: rgba(0, 0, 0, 0.7);
                                }
                            }
                            @keyframes slideUp {
                                from {
                                    transform: translate(-50%, 100%);
                                }
                                to {
                                    transform: translate(-50%, -50%);
                                }
                            }
                        `}
                    </style>
                </Flex>
)} */}

            <Modal
                title="Change Information"
                visible={isChangeInfo}
                onCancel={handleCloseChangeInfoModal}
                footer={[
                    <Button key="back" onClick={handleCloseChangeInfoModal}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" onClick={handleSave}>
                        Save
                    </Button>,
                ]}
            >
                {userData && (
                    <Form
                        form={form}
                        layout="vertical"
                        // onFinish={(values) => handleSave({ ...currentProductData, ...values })}
                        onFinish={handleSave}
                    >
                        <Form.Item label="Full Name" name="fullname">
                            <Input suffix={<EditOutlined />} />
                        </Form.Item>
                        <Form.Item label="Phone" name="phone">
                            <Input type="number" suffix={<EditOutlined />} />
                        </Form.Item>

                        <Form.Item label="Address" name="address">
                            <Input suffix={<EditOutlined />} />
                        </Form.Item>
                        <Form.Item label="Country" name="country">
                            <Input suffix={<EditOutlined />} />
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </Flex>
    );
};
