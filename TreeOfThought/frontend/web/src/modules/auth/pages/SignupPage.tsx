import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';

const { Title, Text } = Typography;

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await authService.signup(values);
      Modal.success({
        title: 'Registration Successful',
        content: 'Please check your email to verify your account before logging in.',
        onOk: () => navigate('/auth/login')
      });
    } catch (error: any) {
      console.error('Signup error:', error);
      message.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 0' }}>
      <Card style={{ width: 450, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2}>Create Account</Title>
          <Text type="secondary">Join the Tree of Thought community</Text>
        </div>

        <Form
          name="signup"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input placeholder="Username" size="large" />
          </Form.Item>

          <Form.Item
            name="displayName"
            label="Display Name"
            rules={[{ required: true, message: 'Please input your Display Name!' }]}
          >
            <Input placeholder="Display Name" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input your Email!' }, { type: 'email', message: 'Invalid email format' }]}
          >
            <Input placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} size="large" loading={loading}>
              Register
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          Already have an account? <Link to="/auth/login">Login here</Link>
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;
