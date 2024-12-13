import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Button, Flex, Row, Typography, theme } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { IRootState } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeItem } from 'src/redux/userApi/cart/cartSlice';
import { customColors } from 'src/theme';

type Props = {};
const { Text } = Typography;

export const ShoppingCart = () => {
    const { token } = theme.useToken();
    const cart = useSelector((state: IRootState) => state.cart);
    const dispatch = useDispatch();

    const handleRemoveItem = (id: string) => {
        dispatch(removeItem(id));
    };

    return (
        <Flex
            style={{
                flexDirection: 'column',
                alignItems: 'center',
                right: '0',
                backgroundColor: '#fff',
                padding: '20px 30px 30px 30px',
            }}
        >
            <Text style={{ fontSize: '22px', fontWeight: '600' }}>Shopping Cart</Text>
            <Flex
                style={{
                    flexDirection: 'column',
                    gap: '30px',
                    marginTop: '30px',
                    maxHeight: '250px',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    paddingRight: '10px',
                    boxSizing: 'border-box',
                }}
                className="item-list"
            >
                {cart.items.map((item) => (
                    <Row
                        key={item.id}
                        style={{
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '40px',
                        }}
                    >
                        <Row
                            style={{
                                alignItems: 'center',
                                gap: '20px',
                            }}
                        >
                            <Image
                                src={item.image_dir}
                                alt=""
                                preview={{ mask: null }}
                                style={{ width: '60px', height: '60px', borderRadius: '10px' }}
                            ></Image>
                            <Flex style={{ flexDirection: 'column', gap: '5px' }}>
                                <Text style={{ fontSize: '18px', fontWeight: '500' }}>{item.name}</Text>
                                <Row
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        alignItems: 'center',
                                        gap: '10px',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: '16px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        {item.quantity}
                                    </Text>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        style={{ marginTop: '3px', color: customColors.colorQuaternaryText }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            color: token.colorPrimary,
                                        }}
                                    >
                                        ${item.price}
                                    </Text>
                                </Row>
                            </Flex>
                        </Row>
                        <FontAwesomeIcon
                            icon={faCircleXmark}
                            style={{ fontSize: '18px', color: customColors.colorQuaternaryText, cursor: 'pointer' }}
                            className="close-btn"
                            onClick={() => handleRemoveItem(item.id)}
                        />
                    </Row>
                ))}
            </Flex>
            <Row style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <Text style={{ fontSize: '16px', fontWeight: '500' }}>Subtotal</Text>
                <Text style={{ fontSize: '18px', fontWeight: '500', color: token.colorPrimary }}>
                    ${cart.totalPrice}
                </Text>
            </Row>
            <Row style={{ width: '100%', border: `1px solid ${customColors.colorQuaternaryText}`, margin: '20px 0' }} />
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Link to="/cart">
                    <Button
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '15px 20px',
                            backgroundColor: 'transparent',
                            borderRadius: '50px',
                            fontSize: '16px',
                            fontWeight: '500',
                            border: `2px solid`,
                        }}
                    >
                        Cart
                    </Button>
                </Link>
                <Link to="/checkout">
                    <Button
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '15px 20px',
                            backgroundColor: 'transparent',
                            borderRadius: '50px',
                            fontSize: '16px',
                            fontWeight: '500',
                            border: `2px solid`,
                        }}
                    >
                        Checkout
                    </Button>
                </Link>
            </Row>
        </Flex>
    );
};
