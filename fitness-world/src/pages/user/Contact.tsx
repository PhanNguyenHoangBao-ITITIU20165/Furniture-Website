import { assets } from '../../assets';
import { Flex, Row, Col, Typography, Form, Input, Button } from 'antd';
import { customColors, navBarHeight } from '../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan, faLocationDot, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';
import { Banner } from 'src/components/userComponents/banner';

const { Text } = Typography;
const { TextArea } = Input;

export const ContactPage = () => {
    return (
        <Flex style={{ flexDirection: 'column', alignItems: 'center', paddingTop: `${navBarHeight}` }}>
            <Banner title="Contact" />
            <Flex style={{ flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
                <Text style={{ fontSize: '36px', fontWeight: '600' }}>Get In Touch With Us</Text>
                <Text
                    style={{
                        fontSize: '16px',
                        fontWeight: '400',
                        margin: '10px 0 0 0',
                        color: customColors.colorQuaternaryText,
                    }}
                >
                    For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff
                    Always Be There To Help You Out. Do Not Hesitate!
                </Text>
                <Row gutter={100} style={{ marginTop: '50px' }}>
                    <Col>
                        <Flex style={{ flexDirection: 'column', gap: '30px' }}>
                            <Row gutter={20} style={{ alignItems: 'center' }}>
                                <Col>
                                    <Flex
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            border: '3px solid #000',
                                            borderRadius: '100px',
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: '25px' }} />
                                    </Flex>
                                </Col>
                                <Col>
                                    <Flex style={{ flexDirection: 'column' }}>
                                        <Text style={{ fontSize: '22px', fontWeight: '500' }}>Address</Text>
                                        <Text style={{ fontSize: '16px', fontWeight: '400' }}>
                                            236 5th SE Avenue, New York NY10000, United States
                                        </Text>
                                    </Flex>
                                </Col>
                            </Row>
                            <Row gutter={20} style={{ alignItems: 'center' }}>
                                <Col>
                                    <Flex
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            border: '3px solid #000',
                                            borderRadius: '100px',
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPhone} style={{ fontSize: '25px' }} />
                                    </Flex>
                                </Col>
                                <Col>
                                    <Flex style={{ flexDirection: 'column' }}>
                                        <Text style={{ fontSize: '22px', fontWeight: '500' }}>Phone</Text>
                                        <Text style={{ fontSize: '16px', fontWeight: '400' }}>
                                            Mobile: +(84) 546-6789
                                        </Text>
                                        <Text style={{ fontSize: '16px', fontWeight: '400' }}>
                                            Hotline: +(84) 456-6789
                                        </Text>
                                    </Flex>
                                </Col>
                            </Row>
                            <Row gutter={20} style={{ alignItems: 'center' }}>
                                <Col>
                                    <Flex
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            border: '3px solid #000',
                                            borderRadius: '100px',
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faClock} style={{ fontSize: '25px' }} />
                                    </Flex>
                                </Col>
                                <Col>
                                    <Flex style={{ flexDirection: 'column' }}>
                                        <Text style={{ fontSize: '22px', fontWeight: '500' }}>Working time</Text>
                                        <Text style={{ fontSize: '16px', fontWeight: '400' }}>
                                            Monday - Friday: 9:00 - 22:00
                                        </Text>
                                        <Text style={{ fontSize: '16px', fontWeight: '400' }}>
                                            {' '}
                                            Saturday - Sunday: 9:00 - 21:00
                                        </Text>
                                    </Flex>
                                </Col>
                            </Row>
                        </Flex>
                    </Col>
                    <Col>
                        <Form layout="vertical">
                            <Form.Item
                                label={
                                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: '18px' }}>
                                        Your name
                                    </Text>
                                }
                            >
                                <Input
                                    placeholder="David"
                                    style={{
                                        border: `2px solid ${customColors.lightGrayColor}`,
                                        backgroundColor: '#fff',
                                        width: '520px',
                                        height: '50px',
                                        fontSize: '16px',
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label={
                                    <Text
                                        style={{
                                            color: '#000',
                                            fontWeight: 'bold',
                                            fontSize: '18px',
                                        }}
                                    >
                                        Email address
                                    </Text>
                                }
                            >
                                <Input
                                    placeholder="David@gmail.com"
                                    style={{
                                        border: `2px solid ${customColors.lightGrayColor}`,
                                        backgroundColor: '#fff',
                                        width: '520px',
                                        height: '50px',
                                        fontSize: '16px',
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label={
                                    <Text
                                        style={{
                                            color: '#000',
                                            fontWeight: 'bold',
                                            fontSize: '18px',
                                        }}
                                    >
                                        Subject
                                    </Text>
                                }
                            >
                                <Input
                                    placeholder="This field is optional"
                                    style={{
                                        border: `2px solid ${customColors.lightGrayColor}`,
                                        backgroundColor: '#fff',
                                        width: '520px',
                                        height: '50px',
                                        fontSize: '16px',
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label={
                                    <Text
                                        style={{
                                            color: '#000',
                                            fontWeight: 'bold',
                                            fontSize: '18px',
                                        }}
                                    >
                                        Message
                                    </Text>
                                }
                            >
                                <TextArea
                                    placeholder="Give your issue here"
                                    style={{
                                        border: `2px solid ${customColors.lightGrayColor}`,
                                        backgroundColor: '#fff',
                                        width: '520px',
                                        fontSize: '16px',
                                    }}
                                    rows={5}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    style={{
                                        width: '200px',
                                        height: '50px',
                                        border: `1px solid ${customColors.colorQuaternaryText}`,
                                        fontSize: '16px',
                                        fontWeight: '500',
                                    }}
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Flex>
        </Flex>
    );
};
