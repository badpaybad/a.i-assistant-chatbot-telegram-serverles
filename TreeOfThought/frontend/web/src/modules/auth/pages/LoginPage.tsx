import React, { useState } from 'react';
import { Form, Input, Button, Card, Divider, Space, Typography, message } from 'antd';
import { GoogleOutlined, FacebookOutlined, WindowsOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithGoogle, signInWithFacebook, signInWithMicrosoft, loginWithCustomToken } from '../../../utils/firebaseUtils';
import { authService } from '../../../services/authService';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await authService.login(values);
      await loginWithCustomToken(response.firebaseToken);
      message.success('Login successful!');
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      message.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSSOLogin = async (provider: string) => {
    setLoading(true);
    try {
      let result;
      switch (provider) {
        case 'google': result = await signInWithGoogle(); break;
        case 'facebook': result = await signInWithFacebook(); break;
        case 'microsoft': result = await signInWithMicrosoft(); break;
        default: throw new Error('Unsupported provider');
      }

      const idToken = await (result.user as any).getIdToken();
      const response = await authService.loginWithSSO(provider, idToken);
      await loginWithCustomToken(response.firebaseToken);
      
      message.success(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login success!`);
      navigate('/');
    } catch (error: any) {
      console.error(`${provider} login error:`, error);
      message.error(`${provider} login failed.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 0' }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2}>Welcome Back</Title>
          <Text type="secondary">Login to your Tree of Thought account</Text>
        </div>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input placeholder="Username" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} size="large" loading={loading}>
              Log in
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          Or <Link to="/auth/signup">register now!</Link>
        </div>

        <Divider plain>Or login with</Divider>

        <Space direction="vertical" style={{ width: '100%' }}>
          <Button icon={<GoogleOutlined />} style={{ width: '100%' }} size="large" onClick={() => handleSSOLogin('google')} loading={loading}>
            Google
          </Button>
          <Button icon={<WindowsOutlined />} style={{ width: '100%' }} size="large" onClick={() => handleSSOLogin('microsoft')} loading={loading}>
            Microsoft
          </Button>
          <Button icon={<FacebookOutlined />} style={{ width: '100%' }} size="large" onClick={() => handleSSOLogin('facebook')} loading={loading}>
            Facebook
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default LoginPage;
