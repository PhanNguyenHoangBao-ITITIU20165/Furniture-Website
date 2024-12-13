import React from 'react';
import { Flex, Row, Image, Typography, theme } from 'antd';
import { Banner } from '../../components/userComponents/banner';
import { assets } from '../../assets';
import { navBarHeight } from 'src/theme';

type Props = {};

const { Text } = Typography;

export const AboutPage = (props: Props) => {
    const { token } = theme.useToken();

    const members = [
        {
            middleName: 'Hoang',
            firstName: 'Bao',
            image: assets.HoangBao,
        },
        {
            middleName: 'Tu',
            firstName: 'Chi',
            image: assets.TuChi,
        },
    ];

    return (
        <Flex style={{ flexDirection: 'column', alignItems: 'center', width: '100vw', paddingTop: `${navBarHeight}` }}>
            <Banner title="About" />
            <Flex style={{ flexDirection: 'column', gap: '60px', width: '100%', marginTop: '50px' }}>
                <Flex style={{ justifyContent: 'space-between', alignItems: 'center', padding: '0 100px' }}>
                    <Image src={assets.company} preview={false} style={{ width: '600px', borderRadius: '10px' }} />
                    <Flex style={{ flexDirection: 'column', gap: '20px', width: '50%' }}>
                        <Text style={{ fontSize: '24px', fontWeight: '500' }}>About FurniScape</Text>
                        <Text style={{ fontSize: '18px', fontWeight: '400', textAlign: 'justify' }}>
                            Welcome to FurniScape, where our mission is to transform your living spaces into hubs of
                            comfort and style. Since our inception in 2015, FurniScape has carved a niche in the
                            furniture market with innovative designs and exceptional customer service. Our slogan,
                            'Transforming Spaces, Creating Comfort,' encapsulates our commitment to enhancing your home
                            with furniture that not only looks stunning but feels wonderfully comfortable. We
                            collaborate with renowned designers and skilled artisans to bring you furniture that stands
                            the test of time and trends.
                        </Text>
                    </Flex>
                </Flex>
                <Flex style={{ justifyContent: 'space-between', alignItems: 'center', padding: '0 100px' }}>
                    <Flex style={{ flexDirection: 'column', gap: '20px', width: '45%' }}>
                        <Text style={{ fontSize: '24px', fontWeight: '500' }}>Our Products and Services</Text>
                        <Text style={{ fontSize: '18px', fontWeight: '400', textAlign: 'justify' }}>
                            FurniScape boasts a diverse selection of furniture that encompasses everything needed to
                            furnish a home or office, from plush sofas and ergonomic office chairs to luxurious beds and
                            stylish dining sets. Each product is designed with the utmost attention to aesthetics and
                            practical functionality. Beyond just selling furniture, we offer comprehensive interior
                            design services that guide customers through the process of envisioning and realizing the
                            layout and decoration of their spaces. Our team works closely with clients to ensure their
                            decor reflects their personal style and meets their functional needs.
                        </Text>
                    </Flex>
                    <Flex style={{ gap: '20px' }}>
                        <Image
                            src={assets.image14}
                            preview={{ mask: null }}
                            style={{ width: '200px', borderRadius: '10px' }}
                        />
                        <Image
                            src={assets.image12}
                            preview={{ mask: null }}
                            style={{ width: '200px', borderRadius: '10px' }}
                        />
                        <Image
                            src={assets.image16}
                            preview={{ mask: null }}
                            style={{ width: '200px', borderRadius: '10px' }}
                        />
                    </Flex>
                </Flex>
                <Flex style={{ justifyContent: 'space-between', alignItems: 'center', padding: '0 100px' }}>
                    <Image
                        src={assets.commitment}
                        preview={false}
                        style={{ width: '600px', height: '350px', borderRadius: '10px' }}
                    />
                    <Flex style={{ flexDirection: 'column', gap: '20px', width: '50%' }}>
                        <Text style={{ fontSize: '24px', fontWeight: '500' }}>
                            Commitment to Quality and Sustainability
                        </Text>
                        <Text style={{ fontSize: '18px', fontWeight: '400', textAlign: 'justify' }}>
                            Sustainability is at the core of our manufacturing processes at FurniScape. We are dedicated
                            to reducing our environmental footprint by utilizing responsibly sourced materials and
                            implementing eco-friendly manufacturing techniques. Our commitment extends beyond the
                            materials we use to the methods of our craftsmanship, ensuring that every piece of furniture
                            is not only durable and safe but also environmentally conscious. We engage in continuous
                            dialogue with sustainability experts to improve our practices and contribute positively to
                            the global community. By choosing FurniScape, customers not only invest in superior quality
                            furniture but also support sustainable practices that benefit the environment.
                        </Text>
                    </Flex>
                </Flex>
                <Flex style={{ justifyContent: 'space-between', alignItems: 'center', padding: '0 100px' }}>
                    <Flex style={{ flexDirection: 'column', gap: '20px', width: '45%' }}>
                        <Text style={{ fontSize: '24px', fontWeight: '500' }}>Our Founding and Management Team</Text>
                        <Text style={{ fontSize: '18px', fontWeight: '400', textAlign: 'justify' }}>
                            The foundation of FurniScape was laid by a group of visionaries who are seasoned in both the
                            art of furniture craftsmanship and the intricacies of business management. Our founders
                            bring over two decades of combined experience in interior design and a robust understanding
                            of global market dynamics. This rich background has been pivotal in shaping FurniScape’s
                            ethos and in steering its journey towards becoming a leader in the furniture industry.
                            Today, our management team continues to drive innovation, overseeing a talented crew that’s
                            dedicated to upholding the highest standards of furniture production and customer
                            satisfaction.
                        </Text>
                    </Flex>
                    <Flex
                        style={{
                            backgroundColor: token.colorPrimary,
                            padding: '20px',
                            borderRadius: '10px',
                            gap: '20px',
                        }}
                    >
                        <Text
                            style={{
                                writingMode: 'vertical-lr',
                                transform: 'rotate(180deg)',
                                fontSize: '24px',
                                fontWeight: '500',
                                color: '#fff',
                                textAlign: 'center',
                            }}
                        >
                            MEMBERS
                        </Text>

                        <Flex
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'auto auto',
                                gap: '20px',
                                backgroundColor: '#fff',
                                borderRadius: '10px',
                                padding: '15px',
                            }}
                        >
                            {members.map((member, index) => (
                                <Row
                                    key={index}
                                    style={{
                                        alignItems: 'center',
                                        gap: '20px',
                                        padding: '20px',
                                        borderRadius: '10px',
                                        boxShadow: `0 0 10px ${token.colorPrimary}`,
                                    }}
                                >
                                    <Image
                                        src={member.image}
                                        preview={false}
                                        style={{
                                            width: '150px',
                                            aspectRatio: '1/1',
                                            objectFit: 'cover',
                                            borderRadius: '10px',
                                        }}
                                    />
                                    <Text style={{ fontSize: '24px', fontWeight: '500' }}>
                                        {member.middleName} <br />
                                        {member.firstName}
                                    </Text>
                                </Row>
                            ))}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
