// import React, { useState } from 'react';
// import {
//     HomeOutlined,
//     NotificationOutlined,
//     UserOutlined,
//     LogoutOutlined,
//     UsergroupAddOutlined,
//     ReconciliationOutlined,
//     ShoppingCartOutlined,
//     EditOutlined,
//     CalendarOutlined,
//     SettingOutlined,
//     ToTopOutlined,
//     BarChartOutlined,
//     FileTextOutlined,
//     BarsOutlined,
//     EyeOutlined,
//     BuildOutlined,
//     InboxOutlined,
//     AreaChartOutlined,
// } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
// import { Badge, Breadcrumb, Button, ConfigProvider, Flex, Layout, Menu, theme } from 'antd';
// import { assets } from 'src/assets';
// import { Outlet, useNavigate } from 'react-router';
// import { signOut } from 'src/redux/api/authSlice';
// import { useDispatch } from 'react-redux';
// import { IAppDispatch } from 'src/redux/store';
// import { Link } from 'react-router-dom';
// const { Footer, Header, Content, Sider } = Layout;

// type MenuItem = Required<MenuProps>['items'][number];

// const items: MenuItem[] = [
//     {
//         key: 'sub1',
//         label: 'Main',
//         icon: <BarsOutlined />,
//         children: [
//             { key: '1', label: 'Home Page', icon: <HomeOutlined /> },
//             { key: '2', label: 'Profile', icon: <UserOutlined /> },
//         ],
//     },
//     { type: 'divider' },
//     {
//         key: 'sub2',
//         label: 'List',
//         icon: <EyeOutlined />,
//         children: [
//             { key: '3', label: 'Users', icon: <UsergroupAddOutlined /> },
//             { key: '4', label: 'Orders', icon: <ReconciliationOutlined /> },
//             { key: '5', label: 'Products', icon: <ShoppingCartOutlined /> },
//         ],
//     },
//     {
//         type: 'divider',
//     },
//     {
//         key: 'sub3',
//         label: 'General',
//         icon: <BuildOutlined />,
//         children: [
//             { key: '8', label: 'Notes', icon: <EditOutlined /> },
//             { key: '9', label: 'Calendar', icon: <CalendarOutlined /> },
//         ],
//     },
//     { type: 'divider' },
//     {
//         key: 'sub4',
//         label: 'Maintenance',
//         icon: <InboxOutlined />,
//         children: [
//             { key: '10', label: 'Setting', icon: <SettingOutlined /> },
//             { key: '11', label: 'Backups', icon: <ToTopOutlined /> },
//         ],
//     },
//     { type: 'divider' },
//     {
//         key: 'sub5',
//         label: 'Analytics',
//         icon: <AreaChartOutlined />,
//         children: [
//             { key: '11', label: 'Charts', icon: <BarChartOutlined /> },
//             { key: '12', label: 'Logs', icon: <FileTextOutlined /> },
//         ],
//     },
// ];

// export const LayoutAdmin = () => {
//     const {
//         token: { colorBgContainer, borderRadiusLG },
//     } = theme.useToken();
//     const navigate = useNavigate();
//     const [collapsed, setCollapsed] = useState(false);
//     const dispatch = useDispatch<IAppDispatch>();

//     const handleNavigate: MenuProps['onClick'] = (e) => {
//         switch (e.key) {
//             case '1':
//                 navigate('/admin');
//                 break;
//             case '2':
//                 navigate('profile');
//                 break;
//             case '3':
//                 navigate('users');
//                 break;
//             case '4':
//                 navigate('orders');
//                 break;
//             case '5':
//                 navigate('products');
//                 break;
//         }
//     };

//     const handleUserSignOut = () => {
//         dispatch(signOut());
//         navigate('/');
//     };
//     return (
//         <Layout style={{ minHeight: '100vh' }}>
//             <Header
//                 style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     backgroundColor: 'transparent',
//                     padding: '0 14px',
//                     borderBottom: '1px solid',
//                 }}
//             >
//                 <Link to="/admin">
//                     <img src={assets.logo} alt="logo" width={180} style={{ padding: '26px 0 0 0 ' }} />
//                 </Link>
//                 {/* <Menu
//                     theme="dark"
//                     mode="horizontal"
//                     defaultSelectedKeys={['2']}
//                     items={items1}
//                     style={{ flex: 1, minWidth: 0 }}
//                 /> */}
//                 <Flex gap="large" wrap="wrap" style={{ paddingTop: '4px' }}>
//                     <ConfigProvider theme={{ components: { Button: { textHoverBg: '#ffffff' } } }}>
//                         <Badge>
//                             <Button
//                                 icon={<UserOutlined style={{ fontSize: '18px' }} />}
//                                 style={{ background: 'transparent', border: 0, boxShadow: 'none' }}
//                                 size="large"
//                                 onClick={() => navigate('/admin/profile')}
//                             />
//                         </Badge>

//                         <Badge>
//                             <Button
//                                 icon={<LogoutOutlined style={{ fontSize: '18px' }} />}
//                                 style={{ background: 'transparent', border: 0, boxShadow: 'none' }}
//                                 size="large"
//                                 onClick={handleUserSignOut}
//                             />
//                         </Badge>
//                     </ConfigProvider>
//                 </Flex>
//             </Header>
//             <Layout style={{}}>
//                 <Sider
//                     width={200}
//                     style={{ borderRight: '1px solid' }}
//                     theme="dark"
//                     collapsible
//                     collapsed={collapsed}
//                     onCollapse={(value) => setCollapsed(value)}
//                 >
//                     <Menu
//                         mode="inline"
//                         defaultSelectedKeys={['1']}
//                         defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4', 'sub5']}
//                         style={{ height: '100%', borderRight: 0 }}
//                         items={items}
//                         onClick={handleNavigate}
//                     />
//                 </Sider>
//                 <Layout style={{ padding: '0 24px 24px' }}>
//                     <Breadcrumb style={{ margin: '16px 0' }}>
//                         {/* <Breadcrumb.Item>Admin Page</Breadcrumb.Item> */}
//                         <Breadcrumb.Item>List</Breadcrumb.Item>
//                         <Breadcrumb.Item>App</Breadcrumb.Item>
//                     </Breadcrumb>
//                     <Content
//                         style={{
//                             padding: 24,
//                             margin: 0,
//                             minHeight: 280,
//                             background: colorBgContainer,
//                             borderRadius: borderRadiusLG,
//                         }}
//                     >
//                         <Outlet />
//                     </Content>
//                     <Footer style={{ textAlign: 'center' }}>
//                         Design ©{new Date().getFullYear()} Created by Gia Bao
//                     </Footer>
//                 </Layout>
//             </Layout>
//         </Layout>
//     );
// };

import React, { useState } from 'react';
import {
    HomeOutlined,
    NotificationOutlined,
    UserOutlined,
    LogoutOutlined,
    UsergroupAddOutlined,
    ReconciliationOutlined,
    ShoppingCartOutlined,
    EditOutlined,
    CalendarOutlined,
    SettingOutlined,
    ToTopOutlined,
    BarChartOutlined,
    FileTextOutlined,
    BarsOutlined,
    EyeOutlined,
    BuildOutlined,
    InboxOutlined,
    AreaChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Badge, Breadcrumb, Button, ConfigProvider, Flex, Layout, Menu, theme } from 'antd';
import { assets } from 'src/assets';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { signOut } from 'src/redux/api/authSlice';
import { useDispatch } from 'react-redux';
import { IAppDispatch } from 'src/redux/store';
const { Footer, Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'sub1',
        label: 'Main',
        icon: <BarsOutlined />,
        children: [
            { key: '1', label: 'Home Page', icon: <HomeOutlined /> },
            { key: '2', label: 'Profile', icon: <UserOutlined /> },
        ],
    },
    { type: 'divider' },
    {
        key: 'sub2',
        label: 'List',
        icon: <EyeOutlined />,
        children: [
            { key: '3', label: 'Users', icon: <UsergroupAddOutlined /> },
            { key: '4', label: 'Orders', icon: <ReconciliationOutlined /> },
            { key: '5', label: 'Products', icon: <ShoppingCartOutlined /> },
        ],
    },
    {
        type: 'divider',
    },
    {
        key: 'sub3',
        label: 'General',
        icon: <BuildOutlined />,
        children: [
            { key: '8', label: 'Notes', icon: <EditOutlined /> },
            { key: '9', label: 'Calendar', icon: <CalendarOutlined /> },
        ],
    },
    { type: 'divider' },
    {
        key: 'sub4',
        label: 'Maintenance',
        icon: <InboxOutlined />,
        children: [
            { key: '10', label: 'Setting', icon: <SettingOutlined /> },
            { key: '11', label: 'Backups', icon: <ToTopOutlined /> },
        ],
    },
    { type: 'divider' },
    {
        key: 'sub5',
        label: 'Analytics',
        icon: <AreaChartOutlined />,
        children: [
            { key: '11', label: 'Charts', icon: <BarChartOutlined /> },
            { key: '12', label: 'Logs', icon: <FileTextOutlined /> },
        ],
    },
];

export const LayoutAdmin = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch<IAppDispatch>();
    const [breadcrumbItems, setBreadcrumbItems] = useState([{ label: 'Home', path: '/admin' }]);

    const handleNavigate: MenuProps['onClick'] = (e) => {
        let breadcrumbPath = [{ label: 'Home', path: '/admin' }];
        switch (e.key) {
            case '1':
                navigate('/admin');
                breadcrumbPath.push({ label: 'Main', path: '/admin' });
                breadcrumbPath.push({ label: 'Home Page', path: '/admin' });
                break;
            case '2':
                navigate('profile');
                breadcrumbPath.push({ label: 'Main', path: '/admin' });
                breadcrumbPath.push({ label: 'Profile', path: 'profile' });
                break;
            case '3':
                navigate('users');
                breadcrumbPath.push({ label: 'List', path: '/admin' });
                breadcrumbPath.push({ label: 'Users', path: 'users' });
                break;
            case '4':
                navigate('orders');
                breadcrumbPath.push({ label: 'List', path: '/admin' });
                breadcrumbPath.push({ label: 'Orders', path: 'orders' });
                break;
            case '5':
                navigate('products');
                breadcrumbPath.push({ label: 'List', path: '/admin' });
                breadcrumbPath.push({ label: 'Products', path: 'products' });
                break;
            // Add more cases as needed for other menu items
            default:
                break;
        }
        setBreadcrumbItems(breadcrumbPath);
    };

    const handleUserSignOut = () => {
        dispatch(signOut());
        navigate('/');
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'transparent',
                    padding: '0 14px',
                    borderBottom: '1px solid',
                }}
            >
                <Link to="/admin">
                    <img src={assets.logo} alt="logo" width={180} style={{ padding: '26px 0 0 0 ' }} />
                </Link>
                <Flex gap="large" wrap="wrap" style={{ paddingTop: '4px' }}>
                    <ConfigProvider theme={{ components: { Button: { textHoverBg: '#ffffff' } } }}>
                        <Badge>
                            <Button
                                icon={<UserOutlined style={{ fontSize: '18px' }} />}
                                style={{ background: 'transparent', border: 0, boxShadow: 'none' }}
                                size="large"
                                onClick={() => navigate('/admin/profile')}
                            />
                        </Badge>

                        <Badge>
                            <Button
                                icon={<LogoutOutlined style={{ fontSize: '18px' }} />}
                                style={{ background: 'transparent', border: 0, boxShadow: 'none' }}
                                size="large"
                                onClick={handleUserSignOut}
                            />
                        </Badge>
                    </ConfigProvider>
                </Flex>
            </Header>
            <Layout style={{}}>
                <Sider
                    width={200}
                    style={{ borderRight: '1px solid' }}
                    theme="dark"
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4', 'sub5']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={items}
                        onClick={handleNavigate}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {breadcrumbItems.map((item, index) => (
                            <Breadcrumb.Item key={index}>
                                <Link to={item.path}>{item.label}</Link>
                            </Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Design ©{new Date().getFullYear()} Created by Hoang Bao
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
};
