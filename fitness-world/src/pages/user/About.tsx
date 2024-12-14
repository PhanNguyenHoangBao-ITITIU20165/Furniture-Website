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
        <Flex style={{ flexDirection: 'column', alignItems: 'center', width: '100vw', paddingTop: `${navBarHeight}`, backgroundColor:'black' }}>
            <Banner title="About" />
            <Flex style={{ flexDirection: 'column', gap: '60px', width: '100%', marginTop: '50px' }}>
                <Flex style={{ justifyContent: 'space-between', alignItems: 'center', padding: '0 100px' }}>
                    <Image src={assets.banner} preview={false} style={{ width: '600px', borderRadius: '10px' }} />
                    <Flex style={{ flexDirection: 'column', gap: '20px', width: '50%' }}>
                        <Text style={{ fontSize: '24px', fontWeight: '500', color:'white' }}>About TrueWellnessWay</Text>
                        <Text style={{ fontSize: '18px', fontWeight: '400', textAlign: 'justify', color:'white' }}>
                            At True WellnessWay, we believe that wellness is not just a goal but a lifestyle. Our mission is to empower individuals to achieve their fitness and wellness 
                            aspirations by offering high-quality fitness tools and accessories tailored to every need. Whether you’re a beginner starting your journey or an enthusiast seeking 
                            to elevate your routine, our carefully curated collection ensures you have the best gear to succeed. True WellnessWay is more than a store; it’s a community 
                            dedicated to promoting strength, balance, and overall well-being. From state-of-the-art treadmills to versatile weights and essential accessories, we provide 
                            tools that inspire and support you on your path to a healthier, happier you. Let us be your partner in transforming your wellness journey. Together, we’ll help 
                            you take confident strides towards achieving your true potential. Welcome to your way, the True WellnessWay!
                        </Text>
                    </Flex>
                </Flex>
                <Flex style={{ justifyContent: 'space-between', alignItems: 'center', padding: '0 100px' }}>
                    <Flex style={{ flexDirection: 'column', gap: '20px', width: '45%' }}>
                        <Text style={{ fontSize: '24px', fontWeight: '500', color:'white' }}>Our Products and Services</Text>
                        <Text style={{ fontSize: '18px', fontWeight: '400', textAlign: 'justify', color:'white' }}>
                            At True WellnessWay, we are committed to providing premium fitness tools and wellness solutions that cater to a variety of needs and goals. Our offerings 
                            are designed to help you achieve a balanced and healthier lifestyle with ease and convenience. Your journey to wellness is our priority. Explore our 
                            range of products and services, and let us help you find your true path to health and vitality!
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
                        <Text style={{ fontSize: '24px', fontWeight: '500', color:'white' }}>
                            Commitment to Quality and Sustainability
                        </Text>
                        <Text style={{ fontSize: '18px', fontWeight: '400', textAlign: 'justify', color:'white' }}>
                            True WellnessWay believes that wellness isn’t just about personal health—it’s about the health of the planet, too. By choosing our products, 
                            you are not only investing in yourself but also contributing to a more sustainable future for generations to come. Together, let’s build a path 
                            to true wellness—one that nurtures both you and the environment. Choose True WellnessWay, where quality meets sustainability.
                        </Text>
                    </Flex>
                </Flex>
                <Flex style={{ justifyContent: 'space-between', alignItems: 'center', padding: '0 100px' }}>
                    <Flex style={{ flexDirection: 'column', gap: '20px', width: '45%' }}>
                        <Text style={{ fontSize: '24px', fontWeight: '500', color:'white' }}>Our Founding and Management Team</Text>
                        <Text style={{ fontSize: '18px', fontWeight: '400', textAlign: 'justify', color:'white' }}>
                            True WellnessWay is more than just a company—it’s a team of individuals united by a mission to inspire healthier lives. We combine our diverse expertise 
                            in fitness, technology, sustainability, and business to bring you the best in wellness solutions. Our leadership team is committed to 
                            continuously evolving our offerings, creating a community of wellness enthusiasts, and delivering an exceptional experience for all our customers. 
                            At True WellnessWay, we don’t just guide your journey—we walk it with you.
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
