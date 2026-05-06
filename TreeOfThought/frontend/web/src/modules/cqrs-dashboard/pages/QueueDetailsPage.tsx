import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Table, Tag, Button, Space, Typography, message, Breadcrumb, Modal, Divider, List, Row, Col } from 'antd';
import { ArrowLeftOutlined, ReloadOutlined, RollbackOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { dashboardService } from '../services/dashboardService';

const { Title, Text } = Typography;

const QueueDetailsPage: React.FC = () => {
  const { queueName } = useParams<{ queueName: string }>();
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [retryLoading, setRetryLoading] = useState<string | null>(null);

  const fetchMessages = async () => {
    if (!queueName) return;
    setLoading(true);
    try {
      const data = await dashboardService.getMessages(queueName);
      setMessages(data);
    } catch (error) {
      message.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [queueName]);

  const handleRetry = async (msgJson: string) => {
    if (!queueName) return;
    setRetryLoading(msgJson);
    try {
      // If it's a dead letter queue, we retry by moving back to main queue
      const mainQueue = queueName.endsWith(':dead') ? queueName.replace(':dead', '') : queueName;
      await dashboardService.retryCommand(mainQueue, msgJson);
      message.success('Message requeued successfully');
      fetchMessages();
    } catch (error) {
      message.error('Failed to retry message');
    } finally {
      setRetryLoading(null);
    }
  };

  const handleDelete = async (msgJson: string) => {
    if (!queueName) return;
    Modal.confirm({
      title: 'Are you sure you want to delete this message?',
      content: 'This action cannot be undone.',
      onOk: async () => {
        try {
          if (queueName.endsWith(':dead')) {
             await dashboardService.removeFromDeadLetter(queueName.replace(':dead', ''), msgJson);
          } else {
             // For main queues we don't have a direct delete API yet, 
             // but we can add it or just ignore for now as it's risky
             message.warning('Delete only supported for Dead Letter Queues');
             return;
          }
          message.success('Message deleted');
          fetchMessages();
        } catch (error) {
          message.error('Failed to delete message');
        }
      }
    });
  };

  const columns = [
    {
      title: 'Message Payload',
      dataIndex: 'payload',
      key: 'payload',
      ellipsis: true,
      render: (text: string) => {
        try {
          const obj = JSON.parse(text);
          return (
            <Space direction="vertical" style={{ width: '100%' }}>
              <pre style={{ fontSize: '10px', background: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
                {JSON.stringify(obj, null, 2)}
              </pre>
              {obj.TrackingId && (
                <Link to={`/modules/cqrs-dashboard/tracing/${obj.TrackingId}`}>
                  <Button size="small" icon={<SearchOutlined />}>Trace Flow</Button>
                </Link>
              )}
            </Space>
          );
        } catch {
          return <Text type="secondary">{text}</Text>;
        }
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_: any, record: any) => (
        <Space direction="vertical">
          <Button 
            size="small" 
            type="primary" 
            icon={<RollbackOutlined />} 
            onClick={() => handleRetry(record.raw)}
            loading={retryLoading === record.raw}
          >
            Retry
          </Button>
          {queueName?.endsWith(':dead') && (
            <Button 
              size="small" 
              danger 
              icon={<DeleteOutlined />} 
              onClick={() => handleDelete(record.raw)}
            >
              Delete
            </Button>
          )}
        </Space>
      )
    }
  ];

  const dataSource = messages.map((m, i) => ({ key: i, raw: m, payload: m }));

  return (
    <div style={{ padding: '24px' }}>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item><Link to="/modules/cqrs-dashboard">Dashboard</Link></Breadcrumb.Item>
        <Breadcrumb.Item>{queueName}</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 24 }}>
        <Col flex="auto">
          <Space>
            <Link to="/modules/cqrs-dashboard">
              <Button icon={<ArrowLeftOutlined />} shape="circle" />
            </Link>
            <Title level={3} style={{ margin: 0 }}>Queue: {queueName}</Title>
            {queueName?.endsWith(':dead') && <Tag color="red">Dead Letter Queue</Tag>}
          </Space>
        </Col>
        <Col>
          <Button icon={<ReloadOutlined />} onClick={fetchMessages} loading={loading}>
            Refresh
          </Button>
        </Col>
      </Row>

      <Card>
        <Table 
          columns={columns} 
          dataSource={dataSource} 
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default QueueDetailsPage;
