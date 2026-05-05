import React from 'react';
import { Form, Input, Button, Card, Divider, Space, Typography } from 'antd';
import { GoogleOutlined, FacebookOutlined, WindowsOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../../utils/firebaseUtils';
import { authService } from '../../../services/authService';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      console.log('Google login success:', result.user);
      // Here you would typically send the Google ID token to your BE to get a JWT
      // const response = await authService.loginWithSSO('google', result.user);
      navigate('/');
    } catch (error) {
      console.error('Google login error:', error);
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
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }, { type: 'email', message: 'Invalid email format' }]}
          >
            <Input placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} size="large">
              Log in
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          Or <Link to="/auth/signup">register now!</Link>
        </div>

        <Divider plain>Or login with</Divider>

        <Space direction="vertical" style={{ width: '100%' }}>
          <Button icon={<GoogleOutlined />} style={{ width: '100%' }} size="large" onClick={handleGoogleLogin}>
            Google
          </Button>
          <Button icon={<WindowsOutlined />} style={{ width: '100%' }} size="large">
            Microsoft
          </Button>
          <Button icon={<FacebookOutlined />} style={{ width: '100%' }} size="large">
            Facebook
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default LoginPage;
