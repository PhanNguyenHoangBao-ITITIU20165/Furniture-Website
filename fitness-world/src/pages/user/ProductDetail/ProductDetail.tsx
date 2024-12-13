import { useState } from 'react';
import { Flex, Row, Typography, Image, Col, theme, Breadcrumb } from 'antd';
import { customColors, navBarHeight } from '../../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faStar, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { assets } from '../../../assets';
import { Description } from '../../../components/userComponents/description';

import './style.scss';
import { HomeOutlined } from '@ant-design/icons';
import { updateItemQuantity } from 'src/redux/userApi/cart/cartSlice';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/redux/store';
import { useDispatch } from 'react-redux';
import { RatingForm } from 'src/components/userComponents/rating-form';
import { Reviews } from 'src/components/userComponents/reviews';
import { IProduct } from 'src/redux/products/productsSlice';

const { Text } = Typography;

export const ProductDetailsPage = () => {
    const { token } = theme.useToken();
    const [activeSize, setActiveSize] = useState<string>('L');
    const [activeColor, setActiveColor] = useState<string>('#816DFA');
    const [quantity, setQuantity] = useState<number>(1);
    const [tab, setTab] = useState<string>('description');
    const [isRating, setIsRating] = useState(false);
    const { id } = useParams<{ id: string }>();
    const productDetail = useSelector((state: IRootState) => state.products.items).find(
        (productDetail) => productDetail.id === id,
    );
    const dispatch = useDispatch();

    const sizes = ['L', 'XL', 'XS'];
    const colors = ['#816DFA', '#000', '#B88E2F'];

    const handleSizeClick = (size: string) => {
        setActiveSize(size);
    };
    const handleColorClick = (color: string) => {
        setActiveColor(color);
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleDecreaseQuantity = () => {
        if (quantity <= 0) {
            setQuantity(0);
        } else {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = (product?: IProduct) => {
        dispatch(updateItemQuantity({ product, quantity }));
    };

    return (
        <Flex
            style={{
                flexDirection: 'column',
                alignItems: 'center',
                width: '100vw',
                paddingTop: `${navBarHeight}`,
                overflow: 'none',
            }}
        >
            <Row
                style={{
                    width: '100%',
                    alignItems: 'center',
                    gap: '15px',
                    backgroundColor: customColors.colorBgSecondary,
                    padding: '20px 100px',
                }}
            >
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            href: '/',
                            title: <HomeOutlined />,
                        },
                        {
                            href: '/shop',
                            title: <Typography>Shop</Typography>,
                        },
                        {
                            title: <Typography>{productDetail?.name}</Typography>,
                        },
                    ]}
                />
            </Row>
            <Flex
                style={{
                    marginTop: '100px',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0 100px',
                    boxSizing: 'border-box',
                }}
            >
                <Row style={{ gap: '20px', width: '50%', display:'flex', justifyContent: 'center' }}>
                    {/* <Flex style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Row
                            style={{
                                width: '80px',
                                height: '80px',
                                backgroundColor: customColors.colorBgSecondary,
                                borderRadius: '10px',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image preview={false} src={assets.asgaardSofa2} />
                        </Row>
                        <Row
                            style={{
                                width: '80px',
                                height: '80px',
                                backgroundColor: customColors.colorBgSecondary,
                                borderRadius: '10px',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image preview={false} src={assets.asgaardSofa3} />
                        </Row>
                        <Row
                            style={{
                                width: '80px',
                                height: '80px',
                                backgroundColor: customColors.colorBgSecondary,
                                borderRadius: '10px',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image preview={false} src={assets.asgaardSofa4} />
                        </Row>
                        <Row
                            style={{
                                width: '80px',
                                height: '80px',
                                backgroundColor: customColors.colorBgSecondary,
                                borderRadius: '10px',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image preview={false} src={assets.asgaardSofa5} />
                        </Row>
                    </Flex> */}
                    <Image preview={{ mask: null }} src={productDetail?.image_dir} />
                </Row>
                <Flex style={{ flexDirection: 'column', width: '50%' }}>
                    <Text
                        style={{
                            fontSize: '40px',
                            fontWeight: '400',
                        }}
                    >
                        {productDetail?.name}
                    </Text>
                    <Text
                        style={{
                            fontSize: '24px',
                            fontWeight: '500',
                            color: customColors.colorQuaternaryText,
                        }}
                    >
                        {productDetail?.price}
                    </Text>
                    <Row style={{ alignItems: 'center', gap: '15px', marginTop: '10px' }}>
                        <Row style={{ alignItems: 'center', gap: '5px' }}>
                            <FontAwesomeIcon
                                icon={faStar}
                                style={{ fontSize: '18px', color: customColors.colorYellow }}
                            />
                            <Text
                                style={{
                                    fontSize: '18px',
                                    fontWeight: '400',
                                    color: customColors.colorQuaternaryText,
                                }}
                            >
                                250
                            </Text>
                        </Row>
                        <Text
                            style={{
                                fontSize: '20px',
                                fontWeight: '500',
                                color: customColors.colorQuaternaryText,
                            }}
                        >
                            |
                        </Text>
                        <Text
                            style={{
                                fontSize: '18px',
                                fontWeight: '400',
                                color: customColors.colorQuaternaryText,
                            }}
                        >
                            5 Customer Review
                        </Text>
                    </Row>
                    <Text
                        style={{
                            fontSize: '16px',
                            fontWeight: '400',
                            marginTop: '10px',
                            width: '100%',
                            textAlign: 'justify',
                        }}
                    >
                        {productDetail?.description}
                    </Text>
                    <Row style={{ alignItems: 'center', gap: '100px' }}>
                        <Col style={{ marginTop: '20px' }}>
                            <Text
                                style={{
                                    fontSize: '18px',
                                    fontWeight: '500',
                                    marginTop: '10px',
                                    color: customColors.colorQuaternaryText,
                                }}
                            >
                                Size
                            </Text>
                            <Row style={{ gap: '15px' }}>
                                {sizes.map((size, index) => (
                                    <Row
                                        key={index}
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            marginTop: '10px',
                                            color: activeSize === size ? '#fff' : '#000',
                                            width: '30px',
                                            height: '30px',
                                            backgroundColor:
                                                activeSize === size
                                                    ? token.colorPrimary
                                                    : customColors.colorBgSecondary,
                                            borderRadius: '5px',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleSizeClick(size)}
                                        className="active"
                                    >
                                        {size}
                                    </Row>
                                ))}
                            </Row>
                        </Col>
                        <Col style={{ marginTop: '20px' }}>
                            <Text
                                style={{
                                    fontSize: '18px',
                                    fontWeight: '500',
                                    marginTop: '10px',
                                    color: customColors.colorQuaternaryText,
                                }}
                            >
                                Color
                            </Text>
                            <Row style={{ gap: '15px' }}>
                                {colors.map((color, index) => (
                                    <Row
                                        key={index}
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            marginTop: '10px',
                                            width: '30px',
                                            height: '30px',
                                            backgroundColor: color,
                                            borderRadius: '50px',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleColorClick(color)}
                                        className="active"
                                    />
                                ))}
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '40px', gap: '50px' }}>
                        <Row
                            style={{
                                gap: '20px',
                                border: `2px solid ${customColors.colorQuaternaryText}`,
                                width: '130px',
                                height: '50px',
                                borderRadius: '10px',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faMinus}
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '400',
                                    cursor: 'pointer',
                                    padding: '5px',
                                }}
                                onClick={handleDecreaseQuantity}
                            />
                            <Text
                                style={{
                                    fontSize: '18px',
                                    fontWeight: '500',
                                    color: token.colorPrimary,
                                    width: '20px',
                                    textAlign: 'center',
                                }}
                            >
                                {quantity}
                            </Text>
                            <FontAwesomeIcon
                                icon={faPlus}
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '400',
                                    cursor: 'pointer',
                                    padding: '5px',
                                }}
                                onClick={handleIncreaseQuantity}
                            />
                        </Row>
                        <Row
                            style={{
                                alignItems: 'center',
                                backgroundColor: token.colorPrimary,
                                padding: '10px 20px',
                                borderRadius: '10px',
                                fontWeight: '500',
                                fontSize: '18px',
                                color: '#fff',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleAddToCart(productDetail)}
                            className="add-btn"
                        >
                            Add to cart
                        </Row>
                        <Row
                            style={{
                                alignItems: 'center',
                                border: `2px solid ${customColors.colorQuaternaryText}`,
                                padding: '10px 20px',
                                borderRadius: '10px',
                                fontWeight: '500',
                                fontSize: '18px',
                            }}
                            className="rating-btn"
                            onClick={() => setIsRating(true)}
                        >
                            Rating
                        </Row>
                    </Row>
                </Flex>
            </Flex>
            <Row
                style={{
                    width: '90%',
                    border: `1px solid ${customColors.colorQuaternaryText}`,
                    marginTop: '40px',
                }}
            />
            <Flex style={{ flexDirection: 'column', justifyContent: 'center', padding: '0 100px' }}>
                <Row style={{ marginTop: '20px', gap: '50px', justifyContent: 'center' }}>
                    <Text
                        style={{
                            fontSize: '24px',
                            fontWeight: tab === 'description' ? '500' : '400',
                            color: tab === 'description' ? '#000' : customColors.colorQuaternaryText,
                            cursor: 'pointer',
                        }}
                        onClick={() => setTab('description')}
                    >
                        Description
                    </Text>
                    <Text
                        style={{
                            fontSize: '24px',
                            fontWeight: tab === 'reviews' ? '500' : '400',
                            color: tab === 'reviews' ? '#000' : customColors.colorQuaternaryText,
                            cursor: 'pointer',
                        }}
                        onClick={() => setTab('reviews')}
                    >
                        Reviews
                    </Text>
                </Row>
                {tab === 'description' ? <Description /> : <Reviews />}
                {isRating && (
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
                        onClick={() => setIsRating(false)}
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
                            <RatingForm setIsRating={setIsRating} />
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
                )}
            </Flex>
        </Flex>
    );
};
