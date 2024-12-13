import { useState, Dispatch, SetStateAction } from 'react';
import { Flex, Col, Form, Typography, Rate, Input, Button, theme } from 'antd';

const { Text } = Typography;
const { TextArea } = Input;

interface RatingProps {
    setIsRating: Dispatch<SetStateAction<boolean>>;
}

export const RatingForm = ({ setIsRating }: RatingProps) => {
    const { token } = theme.useToken();

    const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];
    const [value, setValue] = useState(0);
    return (
        <Flex
            style={{
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                marginTop: '30px',
                backgroundColor: '#fff',
                padding: '20px 50px 30px 50px',
                borderRadius: '20px',
            }}
        >
            <h1>Rating Form</h1>
            <Form>
                <Col>
                    <Text style={{ fontSize: '18px' }}>How would you rate the overall experience ?</Text>
                    <Flex gap="middle" vertical style={{ marginTop: '5px' }}>
                        <Rate tooltips={desc} onChange={setValue} value={value} style={{ fontSize: '25px' }} />
                        {value ? <span>{desc[value - 1]}</span> : null}
                    </Flex>
                </Col>
                <Col style={{ marginTop: '20px' }}>
                    <Text style={{ fontSize: '18px' }}>Share your feedback or suggestion</Text>
                    <TextArea
                        rows={5}
                        placeholder="Write your feedback or suggestion here"
                        style={{ backgroundColor: 'transparent', padding: '15px', marginTop: '5px', fontSize: '16px' }}
                    ></TextArea>
                </Col>
            </Form>
            <Flex style={{ justifyContent: 'center', gap: '100px', marginTop: '30px' }}>
                <Button
                    type="primary"
                    style={{
                        width: '80px',
                        height: '40px',
                        border: `2px solid ${token.colorPrimary}`,
                        backgroundColor: '#fff',
                        color: token.colorPrimary,
                        boxShadow: `0 0 10px 0px ${token.colorPrimary}`,
                        fontSize: '16px',
                        fontWeight: '500',
                        textAlign: 'center',
                    }}
                    onClick={() => setIsRating(false)}
                >
                    Cancel
                </Button>
                <Button
                    type="primary"
                    style={{
                        width: '80px',
                        height: '40px',
                        fontSize: '16px',
                        textAlign: 'center',
                        fontWeight: '500',
                    }}
                >
                    Submit
                </Button>
            </Flex>
        </Flex>
    );
};
