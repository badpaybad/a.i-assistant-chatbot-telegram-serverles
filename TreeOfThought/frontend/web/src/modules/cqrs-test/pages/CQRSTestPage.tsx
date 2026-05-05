import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, List, Tag, Typography, Divider, message } from 'antd';
import { SendOutlined, RocketOutlined } from '@ant-design/icons';
import { CqrsOnCommandResult } from '../../../utils/firebaseUtils';
import axios from 'axios';

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
    const requestId = crypto.randomUUID();
    
    try {
      // Mock sending command to BE
      // In real scenario: await axios.post('/api/cqrs/command', { ...values, requestId });
      message.loading({ content: 'Sending command...', key: 'cqrs' });
      
      console.log('Sending command with Request ID:', requestId);

      // Subscribe to results for this requestId (Firestore)
      const unsubscribe = CqrsOnCommandResult(requestId, (data) => {
        setResults(prev => [{ id: requestId, ...data } as RequestResult, ...prev]);
        message.success({ content: 'Result received!', key: 'cqrs' });
        unsubscribe(); // Stop listening after first result
      });

      // Simulation of BE process (ONLY FOR DEMO)
      setTimeout(() => {
        console.log('Simulating BE result for:', requestId);
        // This would normally be done by the BE publishing to Firestore
      }, 2000);

    } catch (error) {
      message.error({ content: 'Failed to send command', key: 'cqrs' });
    } finally {
      setLoading(false);
    }
  };

  const onPublishEvent = async (values: any) => {
    message.info('Publishing event... (Demo)');
  };

  return (
    <div>
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
