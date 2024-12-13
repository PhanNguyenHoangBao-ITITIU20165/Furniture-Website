import { useState, useEffect } from 'react';
import { Flex, Row, Col, Typography, Image, Button, Table, theme } from 'antd';
import { customColors } from '../../../theme';
import type { TableColumnsType } from 'antd';
import type { ThHTMLAttributes, TdHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan, faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { assets } from 'src/assets';
import './Cart.scss';
import {
    ICartItems,
    decreaseItemQuantity,
    increaseItemQuantity,
    removeItem,
    updateItemQuantity,
} from 'src/redux/userApi/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'src/redux/store';
import { Banner } from 'src/components/userComponents/banner';

const { Text } = Typography;

export const CartPage = () => {
    const { token } = theme.useToken();
    const [shippingFee, setShippingFee] = useState(50);
    const dispatch = useDispatch();
    const cart = useSelector((state: IRootState) => state.cart);
    const handleIncreaseItems = (id: string) => {
        console.log(id);
        dispatch(increaseItemQuantity(id));
    };

    const handleDecreaseItems = (id: string) => {
        dispatch(decreaseItemQuantity(id));
    };

    const handleRemoveItem = (id: string) => {
        dispatch(removeItem(id));
    };

    const Quantity = (props: { id: string; value: number }) => {
        const { id, value } = props;
        return (
            <Row style={{ fontSize: '18px', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                <Flex
                    style={{
                        width: '20px',
                        height: '20px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '50px',
                        border: `2px solid ${customColors.colorQuaternaryText}`,
                        cursor: 'pointer',
                    }}
                    className="quantity-icon"
                    onClick={() => handleDecreaseItems(id)}
                >
                    <FontAwesomeIcon icon={faMinus} style={{ fontSize: '14px' }} />
                </Flex>
                <Text style={{ fontSize: '16px' }}>{value}</Text>
                <Flex
                    style={{
                        width: '20px',
                        height: '20px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '50px',
                        border: `2px solid ${customColors.colorQuaternaryText}`,
                        cursor: 'pointer',
                    }}
                    className="quantity-icon"
                    onClick={() => handleIncreaseItems(id)}
                >
                    <FontAwesomeIcon icon={faPlus} style={{ fontSize: '14px' }} />
                </Flex>
            </Row>
        );
    };

    const Price = (props: { price: number; quantity: number }) => {
        const { price, quantity } = props;
        return <Text style={{ fontSize: '16px' }}>${price * quantity}.00</Text>;
    };

    const dataSource = cart.items.map((item) => {
        return {
            key: item.id,
            image: (
                <Image
                    preview={{ mask: null }}
                    src={item.image_dir}
                    style={{ width: '80px', height: '80px', borderRadius: '10px' }}
                />
            ),
            name: item.name,
            category: item.category,
            quantity: <Quantity id={item.id} value={item.quantity} />,
            price: <Price price={item.price} quantity={item.quantity} />,
            delete: (
                <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => handleRemoveItem(item.id)} />
            ),
        };
    });

    interface DataType {
        key: string;
        name: string;
        category: string;
        quantity: ReactNode | number;
        price: string;
    }

    const columns: TableColumnsType = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '',
            dataIndex: 'delete',
            key: 'delete',
        },
    ];

    return (
        <Flex
            style={{
                flexDirection: 'column',
                alignItems: 'center',
                width: '100vw',
                position: 'relative',
                paddingTop: '50px',
            }}
        >
            <Banner title="Cart" />
            <Flex style={{ width: '70%', gap: '30px', marginTop: '50px' }}>
                <Col style={{ width: '70%' }}>
                    <Table
                        pagination={false}
                        dataSource={dataSource}
                        columns={columns}
                        components={{
                            header: {
                                cell: (props: ThHTMLAttributes<HTMLTableCellElement>) => (
                                    <th
                                        {...props}
                                        style={{
                                            ...props.style,
                                            backgroundColor: token.colorBgContainer,
                                            textAlign: 'center',
                                            fontSize: '18px',
                                        }}
                                    />
                                ),
                            },
                            body: {
                                cell: (props: TdHTMLAttributes<HTMLTableCellElement>) => (
                                    <td
                                        {...props}
                                        style={{
                                            ...props.style,
                                            backgroundColor: '#fff',
                                            textAlign: 'center',
                                            fontSize: '16px',
                                        }}
                                    />
                                ),
                            },
                        }}
                    />
                </Col>
                <Col
                    style={{
                        width: '30%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '10px 30px',
                        backgroundColor: token.colorBgContainer,
                        borderRadius: '10px',
                    }}
                >
                    <Text style={{ fontSize: '32px', fontWeight: '600' }}>Cart Totals</Text>
                    <Row
                        style={{
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '10px',
                            marginTop: '20px',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: '18px',
                                fontWeight: '500',
                            }}
                        >
                            Subtotal
                        </Text>

                        <Text
                            style={{
                                fontSize: '18px',
                                fontWeight: '500',
                                color: customColors.colorQuaternaryText,
                            }}
                        >
                            ${cart.totalPrice}.00
                        </Text>
                    </Row>
                    <Row
                        style={{
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '10px',
                            marginTop: '20px',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: '18px',
                                fontWeight: '500',
                            }}
                        >
                            Shipping fee
                        </Text>

                        <Text
                            style={{
                                fontSize: '18px',
                                fontWeight: '500',
                                color: customColors.colorQuaternaryText,
                            }}
                        >
                            ${shippingFee}.00
                        </Text>
                    </Row>
                    <Row
                        style={{
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '10px',
                            marginTop: '20px',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: '20px',
                                fontWeight: '500',
                            }}
                        >
                            Total
                        </Text>

                        <Text
                            style={{
                                fontSize: '20px',
                                fontWeight: '500',
                                color: token.colorPrimary,
                            }}
                        >
                            ${cart.totalPrice + shippingFee}.00
                        </Text>
                    </Row>
                    <Link to="/checkout" style={{ marginTop: '50px' }}>
                        <Button
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '20px 25px',
                                backgroundColor: 'transparent',
                                borderRadius: '10px',
                                fontSize: '20px',
                                fontWeight: '500',
                                border: `2px solid`,
                            }}
                        >
                            Checkout
                        </Button>
                    </Link>
                </Col>
            </Flex>
        </Flex>
    );
};
