import React, { useState } from 'react';
import { Card, Button, Input, Form, Typography, Space, Divider, message, notification, Tag } from 'antd';
import { BellOutlined, SendOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { subscribeToRequest } from '../../../utils/firebaseUtils';
import axios from 'axios';
import { authService } from '../../../services/authService';

const { Title, Text, Paragraph } = Typography;
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:5000/api';

const NotificationTestPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState(crypto.randomUUID());
  const [receivedData, setReceivedData] = useState<any>(null);

  const onTriggerNotification = async (values: any) => {
    setLoading(true);
    try {
      // 1. Subscribe to Firestore first
      console.log('Subscribing to Firestore path:', requestId);
      const unsubscribe = subscribeToRequest(requestId, (data) => {
        console.log('Notification received from Firestore:', data);
        setReceivedData(data);
        
        // 2. Show Manual Close Notification
        notification.success({
          message: 'Firestore Notification Received',
          description: (
            <div>
              <Paragraph>Backend has sent data to path: <Tag color="blue">{requestId}</Tag></Paragraph>
              <pre style={{ background: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          ),
          duration: 0, // MUST be 0 for manual close
          placement: 'topRight',
          icon: <BellOutlined style={{ color: '#52c41a' }} />,
          key: requestId,
        });
        
        unsubscribe(); // Stop listening after first received data for this test
      });

      // 3. Trigger Backend to send notification
      await axios.post(`${API_BASE_URL}/FirebaseTest/notify?path=requests/${requestId}`, {
        ...values,
        timestamp: new Date().toISOString(),
        triggeredBy: 'Frontend Test Page'
      }, {
        headers: { Authorization: `Bearer ${authService.getToken()}` }
      });

      message.loading({ content: 'Waiting for backend to process...', key: 'noti' });
      setTimeout(() => message.success({ content: 'Request sent successfully!', key: 'noti' }), 1000);

    } catch (error: any) {
      console.error('Notification Trigger Error:', error);
      message.error('Failed to trigger notification: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
      <Title level={2}><BellOutlined /> Firestore Notification Test</Title>
      <Paragraph>
        This module tests the real-time notification flow: 
        <strong> Frontend Subscribe</strong> → <strong>Backend Publish</strong> → <strong>Frontend Receive</strong>.
      </Paragraph>
      
      <Divider />

      <Card 
        title="Test Configuration" 
        extra={<Button onClick={() => setRequestId(crypto.randomUUID())}>Regenerate ID</Button>}
      >
        <Form layout="vertical" onFinish={onTriggerNotification}>
          <Form.Item label="Target Request ID (Firestore Path)">
            <Input value={requestId} readOnly prefix={<InfoCircleOutlined />} />
            <Text type="secondary" size="small">This ID is used as the Firestore document path for subscription.</Text>
          </Form.Item>

          <Form.Item name="message" label="Custom Message to Send" initialValue="Hello from Frontend!">
            <Input.TextArea rows={2} placeholder="Enter message to be sent back via Firestore" />
          </Form.Item>

          <Button 
            type="primary" 
            htmlType="submit" 
            icon={<SendOutlined />} 
            loading={loading}
            block
            size="large"
          >
            Trigger Backend Notification
          </Button>
        </Form>
      </Card>

      {receivedData && (
        <Card title="Last Received Data" style={{ marginTop: 24, border: '1px solid #52c41a' }}>
          <pre>{JSON.stringify(receivedData, null, 2)}</pre>
          <Tag color="green">Received Realtime</Tag>
        </Card>
      )}

      <div style={{ marginTop: 40 }}>
        <Title level={4}>Requirement Checklist:</Title>
        <ul>
          <li><Tag color="green">Done</Tag> Subscribe to Request ID (Firestore Document)</li>
          <li><Tag color="green">Done</Tag> Call BE to process/notify</li>
          <li><Tag color="green">Done</Tag> Receive data via <code>onSnapshot</code></li>
          <li><Tag color="green">Done</Tag> Show manual-close notification (<code>duration: 0</code>)</li>
        </ul>
      </div>
    </div>
  );
};

export default NotificationTestPage;
