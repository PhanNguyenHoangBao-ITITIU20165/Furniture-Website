import { useState, Dispatch, SetStateAction } from 'react';
import { Button, Flex, Form, Typography, Input, Image, Row, theme, Upload } from 'antd';
import { customColors } from 'src/theme';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { assets } from 'src/assets';

const { Text } = Typography;

interface ChangeInformationProps {
    setIsChangeInfo: Dispatch<SetStateAction<boolean>>;
}

export const ChangeInformation = ({ setIsChangeInfo }: ChangeInformationProps) => {
    const { token } = theme.useToken();
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <Flex
            style={{
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#fff',
                padding: '20px 50px 30px 50px',
                borderRadius: '20px',
            }}
        >
            <Text style={{ fontSize: '30px', fontWeight: '500' }}>Change Information</Text>
            <Form layout="vertical" style={{ marginTop: '40px' }}>
                <Flex style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '0 30px' }}>
                    <Form.Item
                        label={
                            <Text
                                style={{
                                    color: customColors.colorQuaternaryText,
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                }}
                            >
                                Fullname
                            </Text>
                        }
                    >
                        <Input
                            placeholder="Enter your fullname here"
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
                                    color: customColors.colorQuaternaryText,
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                }}
                            >
                                Old Password
                            </Text>
                        }
                    >
                        <Input.Password
                            placeholder="Enter your old password"
                            style={{
                                border: `2px solid ${customColors.lightGrayColor}`,
                                backgroundColor: '#fff',
                                width: '520px',
                                height: '50px',
                                fontSize: '16px',
                            }}
                            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text
                                style={{
                                    color: customColors.colorQuaternaryText,
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                }}
                            >
                                Email address
                            </Text>
                        }
                    >
                        {/* <CustomInputWithoutBG placeholder='Enter your email here' size='large'></CustomInputWithoutBG> */}
                        <Input
                            placeholder="Enter your email here"
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
                                    color: customColors.colorQuaternaryText,
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                }}
                            >
                                New Password
                            </Text>
                        }
                    >
                        <Input.Password
                            placeholder="Enter your old password"
                            style={{
                                border: `2px solid ${customColors.lightGrayColor}`,
                                backgroundColor: '#fff',
                                width: '520px',
                                height: '50px',
                                fontSize: '16px',
                            }}
                            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text
                                style={{
                                    color: customColors.colorQuaternaryText,
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                }}
                            >
                                Choose an avatar (optional)
                            </Text>
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
                    <Form.Item
                        label={
                            <Text
                                style={{
                                    color: customColors.colorQuaternaryText,
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                }}
                            >
                                Confirm New Password
                            </Text>
                        }
                    >
                        <Input.Password
                            placeholder="Enter your old password"
                            style={{
                                border: `2px solid ${customColors.lightGrayColor}`,
                                backgroundColor: '#fff',
                                width: '520px',
                                height: '50px',
                                fontSize: '16px',
                            }}
                            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                        />
                    </Form.Item>
                </Flex>

                <Flex style={{ justifyContent: 'center', gap: '100px', marginTop: '20px' }}>
                    <Button
                        size="large"
                        type="primary"
                        style={{
                            // width: '100px',
                            // height: '50px',
                            // fontSize: '16px',
                            fontWeight: '500',
                        }}
                    >
                        Change
                    </Button>
                    <Button
                        size="large"
                        style={{
                            // width: '100px',
                            // height: '50px',
                            // border: `2px solid ${token.colorPrimary}`,
                            // backgroundColor: '#fff',
                            // color: token.colorPrimary,
                            // boxShadow: `0 0 10px 0px ${token.colorPrimary}`,
                            // fontSize: '16px',
                            fontWeight: '500',
                        }}
                        onClick={() => setIsChangeInfo(false)}
                    >
                        Cancel
                    </Button>
                </Flex>
            </Form>
        </Flex>
    );
};
