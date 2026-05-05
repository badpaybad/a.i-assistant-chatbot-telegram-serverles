import React, { useState } from 'react';
import { Layout, Menu, theme, Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  ApiOutlined,
  UserOutlined,
  BellOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { authService } from '../services/authService';
import { LogoutOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const isLoggedIn = authService.isAuthenticated();
  const userInfo = authService.getUserInfo();

  const handleLogout = () => {
    authService.logout();
    navigate('/auth/login');
  };

  // Determine active key from path
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/about')) return 'about';
    if (path.startsWith('/contact')) return 'contact';
    if (path.startsWith('/modules/cqrs-test')) return 'cqrs-test';
    if (path.startsWith('/modules/notification-test')) return 'notification-test';
    if (path.startsWith('/modules/fcm-test')) return 'fcm-test';
    if (path.startsWith('/auth/login')) return 'login';
    if (path.startsWith('/auth/signup')) return 'signup';
    return 'home';
  };

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: 'about',
      icon: <InfoCircleOutlined />,
      label: <Link to="/about">About</Link>,
    },
    {
      key: 'contact',
      icon: <PhoneOutlined />,
      label: <Link to="/contact">Contact</Link>,
    },
    {
      key: 'cqrs-test',
      icon: <ApiOutlined />,
      label: <Link to="/modules/cqrs-test">CQRS Test</Link>,
    },
    {
      key: 'notification-test',
      icon: <BellOutlined />,
      label: <Link to="/modules/notification-test">Notification Test</Link>,
    },
    {
      key: 'fcm-test',
      icon: <MobileOutlined />,
      label: <Link to="/modules/fcm-test">FCM Test</Link>,
    },
    {
      key: 'login',
      icon: <UserOutlined />,
      label: <Link to="/auth/login">Login</Link>,
    },
    {
      key: 'signup',
      icon: <UserOutlined />,
      label: <Link to="/auth/signup">Signup</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
          {collapsed ? 'T' : 'Tree of Thought'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 24 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {isLoggedIn ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: '1.2' }}>
                  <span style={{ fontWeight: 'bold' }}>{userInfo.username || 'User'}</span>
                  <span style={{ fontSize: '12px', color: '#888' }}>{userInfo.email || ''}</span>
                </div>
                <Button 
                  danger 
                  icon={<LogoutOutlined />} 
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                type="primary" 
                icon={<UserOutlined />} 
                onClick={() => navigate('/auth/login')}
              >
                Login
              </Button>
            )}
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
