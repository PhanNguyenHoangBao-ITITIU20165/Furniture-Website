import { Flex, Row, Typography, Image } from 'antd';
import { customColors } from '../../../theme';
import { assets } from '../../../assets';

const { Text } = Typography;

export const Description = () => {
    return (
        <Flex
            style={{
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                marginTop: '30px',
            }}
        >
            <Text
                style={{
                    fontSize: '18px',
                    fontWeight: '400',
                    color: customColors.colorQuaternaryText,
                    textAlign: 'justify',
                }}
            >
                Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the
                unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.
                <br /> Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering.
                Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted
                hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is
                both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal
                preferences while the guitar-influenced leather strap enables easy and stylish travel.
            </Text>
            <Row style={{ width: '100%', marginTop: '50px', justifyContent: 'space-between' }}>
                <Row
                    style={{
                        width: '48%',
                        backgroundColor: customColors.colorBgSecondary,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '15px',
                    }}
                >
                    <Image src={assets.asgaardSofa7} preview={{ mask: null }} style={{ width: '600px' }} />
                </Row>
                <Row
                    style={{
                        width: '48%',
                        backgroundColor: customColors.colorBgSecondary,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '15px',
                    }}
                >
                    <Image src={assets.asgaardSofa6} preview={{ mask: null }} style={{ width: '600px' }} />
                </Row>
            </Row>
        </Flex>
    );
};
