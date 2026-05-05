import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Form, Typography, Divider, message, Tag, Space } from 'antd';
import { MobileOutlined, SendOutlined, CopyOutlined, ReloadOutlined } from '@ant-design/icons';
import { setupFCM } from '../../../utils/firebaseUtils';
import axios from 'axios';
import { authService } from '../../../services/authService';

const { Title, Text, Paragraph } = Typography;
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:5000/api';

const FcmTestPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string>('');
  const [tokenLoading, setTokenLoading] = useState(false);

  const fetchToken = async () => {
    setTokenLoading(true);
    try {
      const fcmToken = await setupFCM();
      if (fcmToken) {
        setToken(fcmToken);
        message.success('FCM Token retrieved!');
      } else {
        message.warning('Could not get FCM token. Check notification permissions.');
      }
    } catch (error) {
      message.error('Error fetching FCM token.');
    } finally {
      setTokenLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  const onSendPush = async (values: any) => {
    if (!token) {
      message.error('No device token available!');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/FirebaseTest/push?token=${token}&title=${encodeURIComponent(values.title)}&body=${encodeURIComponent(values.body)}`, {}, {
        headers: { Authorization: `Bearer ${authService.getToken()}` }
      });
      message.success('Push request sent to backend!');
    } catch (error: any) {
      message.error('Failed to send push: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token);
    message.success('Token copied to clipboard!');
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
      <Title level={2}><MobileOutlined /> FCM Push Notification Test</Title>
      <Paragraph>
        This module tests **Cloud Messaging**: 
        1. Get Device Token → 2. Send to Backend → 3. Backend Push Notification → 4. Frontend Receive (via Service Worker).
      </Paragraph>
      
      <Divider />

      <Card title="Device Information" extra={<Button icon={<ReloadOutlined />} onClick={fetchToken} loading={tokenLoading}>Refresh Token</Button>}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text strong>Your FCM Device Token:</Text>
          <Input.Group compact>
            <Input 
              style={{ width: 'calc(100% - 80px)' }} 
              value={token || 'No token found'} 
              readOnly 
              placeholder="Retrieving token..."
            />
            <Button icon={<CopyOutlined />} onClick={copyToClipboard} disabled={!token} />
          </Input.Group>
          {!token && <Tag color="warning">Please allow notification permissions in your browser.</Tag>}
          {token && <Tag color="green">Token Active</Tag>}
        </Space>
      </Card>

      <Card title="Trigger Push Notification" style={{ marginTop: 24 }}>
        <Form layout="vertical" onFinish={onSendPush} initialValues={{ title: 'Test Notification', body: 'This is a sample push notification from backend!' }}>
          <Form.Item name="title" label="Notification Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="body" label="Notification Body" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            icon={<SendOutlined />} 
            loading={loading}
            disabled={!token}
            block
            size="large"
          >
            Send Push via Backend
          </Button>
        </Form>
      </Card>

      <div style={{ marginTop: 40 }}>
        <Title level={4}>FCM Requirement Checklist:</Title>
        <ul>
          <li><Tag color="green">Done</Tag> Retrieve FCM Device Token</li>
          <li><Tag color="green">Done</Tag> Send Token to BE</li>
          <li><Tag color="green">Done</Tag> BE calls Firebase Admin SDK to push</li>
          <li><Tag color="green">Done</Tag> Receive push in foreground (Manual close, Top-Right)</li>
          <li><Tag color="blue">Note</Tag> Background push requires service worker (firebase-messaging-sw.js)</li>
        </ul>
      </div>
    </div>
  );
};

export default FcmTestPage;
