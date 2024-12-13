import { useState } from 'react';
import { Flex, Row, Typography, Image, Select, theme } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { assets } from 'src/assets';
import { customColors } from 'src/theme';

const { Text } = Typography;

export const Reviews = () => {
    const { token } = theme.useToken();

    const initialReviews = [
        {
            name: 'John Smith',
            avatar: assets.avatar,
            date: '22-05-2024',
            rate: 4,
            content: 'The product is great !!!',
            like: false,
            dislike: false,
        },
        {
            name: 'Emily Johnson',
            avatar: assets.avatar,
            date: '21-05-2024',
            rate: 5,
            content: 'Excellent quality and fast delivery!',
            like: false,
            dislike: false,
        },
        {
            name: 'Michael Williams',
            avatar: assets.avatar,
            date: '20-05-2024',
            rate: 3,
            content: 'Good product, but the packaging could be better.',
            like: false,
            dislike: false,
        },
        {
            name: 'James Jones',
            avatar: assets.avatar,
            date: '18-05-2024',
            rate: 4,
            content: 'Very comfortable and stylish.',
            like: false,
            dislike: false,
        },
        {
            name: 'Olivia Garcia',
            avatar: assets.avatar,
            date: '17-05-2024',
            rate: 5,
            content: 'Highly recommend this product!',
            like: false,
            dislike: false,
        },
        {
            name: 'Sophia Hernandez',
            avatar: assets.avatar,
            date: '15-05-2024',
            rate: 3,
            content: 'Decent product for the price.',
            like: false,
            dislike: false,
        },
        {
            name: 'Benjamin Clark',
            avatar: assets.avatar,
            date: '14-05-2024',
            rate: 4,
            content: 'I love the design and the comfort it provides.',
            like: false,
            dislike: false,
        },
        {
            name: 'Mia Lewis',
            avatar: assets.avatar,
            date: '13-05-2024',
            rate: 5,
            content: 'Fantastic! Exceeded my expectations.',
            like: false,
            dislike: false,
        },
        {
            name: 'Alexander Walker',
            avatar: assets.avatar,
            date: '12-05-2024',
            rate: 2,
            content: 'Not worth the price. Poor build quality.',
            like: false,
            dislike: false,
        },
        {
            name: 'Ava Hall',
            avatar: assets.avatar,
            date: '11-05-2024',
            rate: 4,
            content: 'Great product overall. Would buy again.',
            like: false,
            dislike: false,
        },
    ];

    const [reviews, setReviews] = useState(initialReviews);

    const handleLikeClick = (index: number) => {
        setReviews(
            reviews.map((review, idx) => {
                if (idx === index) {
                    return { ...review, like: !review.like, dislike: !review.like ? false : review.dislike };
                }
                return review;
            }),
        );
    };

    const handleDislikeClick = (index: number) => {
        setReviews(
            reviews.map((review, idx) => {
                if (idx === index) {
                    return { ...review, dislike: !review.dislike, like: !review.dislike ? false : review.like };
                }
                return review;
            }),
        );
    };

    return (
        <Flex
            style={{
                flexDirection: 'column',
                alignItems: 'center',
                width: '100vw',
                marginTop: '30px',
            }}
        >
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0 100px' }}>
                <Text
                    style={{
                        fontSize: '24px',
                        fontWeight: '500',
                    }}
                >
                    All reviews ({reviews.length})
                </Text>
                <Row style={{ alignItems: 'center', gap: '15px' }}>
                    <Text
                        style={{
                            fontSize: '20px',
                            fontWeight: '500',
                        }}
                    >
                        Sorted by
                    </Text>
                    <Select
                        style={{
                            width: '200px',
                            height: '40px',
                            backgroundColor: '#fff',
                            border: `2px solid ${customColors.colorQuaternaryText}`,
                            fontSize: '18px',
                            borderRadius: '8px'
                        }}
                    >
                        <Select.Option value="newest">Newest</Select.Option>
                        <Select.Option value="oldest">Oldest</Select.Option>
                        <Select.Option value="highest">Highest rate</Select.Option>
                        <Select.Option value="lowest">Lowest rate</Select.Option>
                    </Select>
                </Row>
            </Row>
            <Flex
                style={{
                    width: '100%',
                    flexDirection: 'column',
                    gap: '40px',
                    padding: '0 100px',
                    marginTop: '30px',
                    boxSizing: 'border-box',
                }}
            >
                {reviews.map((review, index) => (
                    <Row key={index} style={{ gap: '15px' }}>
                        <Image
                            preview={false}
                            src={review.avatar}
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '100px',
                                border: `2px solid ${customColors.colorQuaternaryText}`,
                            }}
                        />
                        <Flex style={{ flexDirection: 'column', gap: '10px' }}>
                            <Row style={{ alignItems: 'center', gap: '20px' }}>
                                <Text
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: '500',
                                    }}
                                >
                                    {review.name}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: '400',
                                        color: customColors.colorQuaternaryText,
                                    }}
                                >
                                    {review.date}
                                </Text>
                            </Row>
                            <Row style={{ alignItems: 'center', gap: '5px' }}>
                                {[...Array(5)].map((_, index) => (
                                    <FontAwesomeIcon
                                        key={index}
                                        icon={faStar}
                                        style={{ color: index < review.rate ? '#FFD700' : '#D3D3D3' }}
                                    />
                                ))}
                            </Row>
                            <Text
                                style={{
                                    fontSize: '18px',
                                    fontWeight: '400',
                                }}
                            >
                                {review.content}
                            </Text>
                            <Row style={{ alignItems: 'center', gap: '30px' }}>
                                <Row
                                    style={{ alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '5px' }}
                                    onClick={() => handleLikeClick(index)}
                                >
                                    <FontAwesomeIcon
                                        icon={faThumbsUp}
                                        style={{
                                            fontSize: '18px',
                                            color: review.like ? token.colorPrimary : customColors.lightGrayColor,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: '16px',
                                            color: review.like ? token.colorPrimary : '#000',
                                        }}
                                    >
                                        Like
                                    </Text>
                                </Row>
                                <Row
                                    style={{ alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '5px' }}
                                    onClick={() => handleDislikeClick(index)}
                                >
                                    <FontAwesomeIcon
                                        icon={faThumbsDown}
                                        style={{
                                            fontSize: '18px',
                                            color: review.dislike ? token.colorPrimary : customColors.lightGrayColor,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: '16px',
                                            color: review.dislike ? token.colorPrimary : '#000',
                                        }}
                                    >
                                        Dislike
                                    </Text>
                                </Row>
                            </Row>
                        </Flex>
                    </Row>
                ))}
            </Flex>
        </Flex>
    );
};
