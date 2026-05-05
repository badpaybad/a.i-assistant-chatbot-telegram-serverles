import React, { useState } from 'react';
import { Form, Input, Button, Card, List, Tag, Typography, Divider, message, notification } from 'antd';
import { SendOutlined, RocketOutlined, BellOutlined } from '@ant-design/icons';
import { CqrsOnCommandResult } from '../../../utils/firebaseUtils';
import axios from 'axios';
import { authService } from '../../../services/authService';

const { Title, Text } = Typography;
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:5000/api';

interface RequestResult {
  id: string;
  status: string;
  message: string;
  timestamp: any;
}

const CQRSTestPage: React.FC = () => {
  const [results, setResults] = useState<RequestResult[]>([]);
  const [loading, setLoading] = useState(false);

  const onSendCommand = async (values: any) => {
    setLoading(true);
    
    try {
      message.loading({ content: 'Sending command...', key: 'cqrs' });
      
      // 1. Send command to BE first to get trackingId
      const response = await axios.post(`${API_BASE_URL}/CqrsTest/sample-command`, values.payload || "{}", {
        headers: { 
          Authorization: `Bearer ${authService.getToken()}`,
          'Content-Type': 'application/json'
        }
      });

      const { trackingId } = response.data;
      console.log('Command sent. Tracking ID:', trackingId);

      // 2. Subscribe to results for this trackingId (Firestore)
      CqrsOnCommandResult(trackingId, (data) => {
        setResults(prev => [{ id: trackingId, ...data } as RequestResult, ...prev]);
        
        notification.info({
          message: 'Command Processed',
          description: `Request ${trackingId} has been completed by backend.`,
          duration: 0,
          placement: 'topRight',
          icon: <BellOutlined style={{ color: '#1890ff' }} />,
          key: trackingId
        });
        
        message.success({ content: 'Result received!', key: 'cqrs' });
      });

    } catch (error: any) {
      console.error('CQRS Error:', error);
      message.error({ content: error.response?.data?.message || 'Failed to send command', key: 'cqrs' });
    } finally {
      setLoading(false);
    }
  };

  const onPublishEvent = async (values: any) => {
    try {
      await axios.post(`${API_BASE_URL}/cqrs/publish`, values, {
        headers: { Authorization: `Bearer ${authService.getToken()}` }
      });
      message.success('Event published!');
    } catch (error: any) {
      message.error('Failed to publish event');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>CQRS & Firebase Integration Test</Title>
      <Text>Test the connection between Frontend, Backend CQRS, and Firebase Firestore.</Text>
      
      <Divider />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Card title={<span><SendOutlined /> Enqueue Command</span>}>
          <Form layout="vertical" onFinish={onSendCommand}>
            <Form.Item name="commandName" label="Command Name" initialValue="SampleCommand">
              <Input />
            </Form.Item>
            <Form.Item name="payload" label="Payload (JSON)">
              <Input.TextArea rows={4} placeholder='{"key": "value"}' />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} icon={<RocketOutlined />}>
              Send Command
            </Button>
          </Form>
        </Card>

        <Card title="Realtime Results (Firestore)">
          <List
            dataSource={results}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<span>Request ID: <Text code>{item.id}</Text></span>}
                  description={
                    <div>
                      <Tag color={item.status === 'success' ? 'green' : 'blue'}>{item.status || 'Processing'}</Tag>
                      <Text>{item.message || 'Waiting for response...'}</Text>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
          {results.length === 0 && <Text type="secondary">No results yet. Send a command to see it here.</Text>}
        </Card>
      </div>
    </div>
  );
};

export default CQRSTestPage;
