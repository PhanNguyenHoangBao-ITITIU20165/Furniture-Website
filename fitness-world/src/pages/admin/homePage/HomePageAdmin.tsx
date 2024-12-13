import { Card, Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TopDeals } from 'src/components/adminComponents/topDeals/topDeals';
import { getAllOrdersOfAllUsers } from 'src/redux/order/orderSlice';
import { IRootState, IAppDispatch } from 'src/redux/store';

type Props = {};

export const HomePageAdmin = () => {
    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Card title="Top Deals">
                                <TopDeals />
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card title="Profit Earn"></Card>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Card title="Total Users">123</Card>
                        </Col>

                        <Col span={12}>
                            <Card title="Total Products">123</Card>
                        </Col>

                        <Col span={12}>
                            <Card title="Total Revenue">123</Card>
                        </Col>

                        <Col span={12}>
                            <Card title="Total Ratio">123</Card>
                        </Col>

                        <Col span={24}>
                            <Card title="Revenue Analytics"></Card>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Card title="Lead by Source"></Card>
                        </Col>
                        <Col span={24}>
                            <Card title="Profit Earn"></Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};
