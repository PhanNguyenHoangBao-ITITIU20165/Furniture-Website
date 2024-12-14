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
        <Flex style={{ flexDirection: 'column', alignItems: 'center', paddingTop: `${navBarHeight}`, backgroundColor:'black' }}>
            <Banner title="Contact" />
            <Flex style={{ flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
                <Text style={{ fontSize: '36px', fontWeight: '600', color:'white' }}>Get In Touch With Us</Text>
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
                        <Flex style={{ flexDirection: 'column', gap: '30px', color:'white' }}>
                            <Row gutter={20} style={{ alignItems: 'center' }}>
                                <Col>
                                    <Flex
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            border: '3px solid white',
                                            borderRadius: '100px',
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: '25px'}} />
                                    </Flex>
                                </Col>
                                <Col>
                                    <Flex style={{ flexDirection: 'column' }}>
                                        <Text style={{ fontSize: '22px', fontWeight: '500', color:'white' }}>Address</Text>
                                        <Text style={{ fontSize: '16px', fontWeight: '400', color:'white' }}>
                                            59 Xa Lo Ha Noi, District 2, Ho Chi Minh City
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
                                            border: '3px solid white',
                                            borderRadius: '100px',
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPhone} style={{ fontSize: '25px' }} />
                                    </Flex>
                                </Col>
                                <Col>
                                    <Flex style={{ flexDirection: 'column' }}>
                                        <Text style={{ fontSize: '22px', fontWeight: '500', color:'white' }}>Phone</Text>
                                        <Text style={{ fontSize: '16px', fontWeight: '400', color:'white' }}>
                                            Mobile: +(84) 0915434444
                                        </Text>
                                        <Text style={{ fontSize: '16px', fontWeight: '400', color:'white' }}>
                                            Hotline: +(84) 091543555
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
                                            border: '3px solid white',
                                            borderRadius: '100px',
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faClock} style={{ fontSize: '25px' }} />
                                    </Flex>
                                </Col>
                                <Col>
                                    <Flex style={{ flexDirection: 'column' }}>
                                        <Text style={{ fontSize: '22px', fontWeight: '500', color:'white' }}>Working time</Text>
                                        <Text style={{ fontSize: '16px', fontWeight: '400', color:'white' }}>
                                            Monday - Friday: 9:00 - 17:00
                                        </Text>
                                        <Text style={{ fontSize: '16px', fontWeight: '400', color:'white' }}>
                                            {' '}
                                            Saturday - Sunday: 9:00 - 16:00
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
                                    placeholder="Hoang Bao"
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
                                    placeholder="tuchi@gmail.com"
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
