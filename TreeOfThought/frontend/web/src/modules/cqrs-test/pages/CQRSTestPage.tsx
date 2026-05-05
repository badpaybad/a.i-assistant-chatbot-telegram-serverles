import React, { useState } from 'react';
import { Form, Input, Button, Card, List, Tag, Typography, Divider, message, notification } from 'antd';
import { SendOutlined, RocketOutlined, BellOutlined } from '@ant-design/icons';
import { CqrsOnCommandResult } from '../../../utils/firebaseUtils';
import httpClient from '../../../utils/httpClient';
import { authService } from '../../../services/authService';

const { Title, Text } = Typography;

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
      
      // Parse payload string to object to ensure axios sends application/json
      let payloadObj = {};
      try {
        payloadObj = JSON.parse(values.payload || "{}");
      } catch (e) {
        message.error({ content: 'Invalid JSON payload', key: 'cqrs' });
        setLoading(false);
        return;
      }

      // 1. Send command to BE first to get trackingId
      const response = await httpClient.post(`/CqrsTest/sample-command`, payloadObj);

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
    setLoading(true);
    try {
      let dataObj = {};
      try {
        dataObj = JSON.parse(values.data || "{}");
      } catch (e) {
        message.error('Invalid JSON data');
        setLoading(false);
        return;
      }

      await httpClient.post(`/CqrsTest/sample-event`, dataObj);
      message.success('Event published successfully!');
    } catch (error: any) {
      console.error('Publish Event Error:', error);
      message.error(error.response?.data?.message || 'Failed to publish event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>CQRS & Firebase Integration Test</Title>
      <Text>Test the connection between Frontend, Backend CQRS, and Firebase Firestore.</Text>
      
      <Divider />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Card title={<span><SendOutlined /> Enqueue Command</span>}>
            <Form layout="vertical" onFinish={onSendCommand}>
              <Form.Item name="commandName" label="Command Name" initialValue="SampleCommand">
                <Input disabled />
              </Form.Item>
              <Form.Item name="payload" label="Payload (JSON)" initialValue='{"message": "Hello from Frontend"}'>
                <Input.TextArea rows={4} placeholder='{"key": "value"}' />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} icon={<RocketOutlined />} block>
                Send Command
              </Button>
            </Form>
          </Card>

          <Card title={<span><BellOutlined /> Publish Event</span>}>
            <Form layout="vertical" onFinish={onPublishEvent}>
              <Form.Item name="eventName" label="Event Name" initialValue="SampleEvent">
                <Input disabled />
              </Form.Item>
              <Form.Item name="data" label="Event Data (JSON)" initialValue='{"info": "Event triggered"}'>
                <Input.TextArea rows={4} placeholder='{"key": "value"}' />
              </Form.Item>
              <Button type="default" htmlType="submit" loading={loading} icon={<SendOutlined />} block>
                Publish Event
              </Button>
            </Form>
          </Card>
        </div>

        <Card title="Realtime Results (Firestore)" style={{ height: 'fit-content' }}>
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
                      <br />
                      <Text type="secondary" size="small">{new Date(item.timestamp).toLocaleString()}</Text>
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
