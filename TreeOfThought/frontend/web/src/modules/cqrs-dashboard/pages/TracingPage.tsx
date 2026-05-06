import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Input, Button, Timeline, Typography, Space, message, Row, Col, Tag, Empty } from 'antd';
import { SearchOutlined, ArrowLeftOutlined, ReloadOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { dashboardService } from '../services/dashboardService';

const { Title, Text, Paragraph } = Typography;

const TracingPage: React.FC = () => {
  const { trackingId: urlTrackingId } = useParams<{ trackingId: string }>();
  const [trackingId, setTrackingId] = useState(urlTrackingId || '');
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async (id: string) => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await dashboardService.getTracking(id);
      setHistory(data);
      if (data.length === 0) {
        message.info('No tracking history found for this ID');
      }
    } catch (error) {
      message.error('Failed to fetch tracking history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (urlTrackingId) {
      fetchHistory(urlTrackingId);
    }
  }, [urlTrackingId]);

  const handleSearch = () => {
    fetchHistory(trackingId);
  };

  const parseLog = (log: string) => {
    const parts = log.split(' | ');
    if (parts.length < 3) return { time: '', step: 'Log', details: log };
    return {
      time: parts[0],
      step: parts[1],
      details: parts.slice(2).join(' | ')
    };
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 24 }}>
        <Col flex="auto">
          <Space>
            <Link to="/modules/cqrs-dashboard">
              <Button icon={<ArrowLeftOutlined />} shape="circle" />
            </Link>
            <Title level={3} style={{ margin: 0 }}>Message Tracing</Title>
          </Space>
        </Col>
      </Row>

      <Card style={{ marginBottom: 24 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text strong>Tracking ID (Guid)</Text>
          <Space>
            <Input 
              placeholder="Enter Tracking ID..." 
              style={{ width: 400 }} 
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              onPressEnter={handleSearch}
            />
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch} loading={loading}>
              Trace Flow
            </Button>
            <Button icon={<ReloadOutlined />} onClick={() => fetchHistory(trackingId)} disabled={!trackingId} loading={loading} />
          </Space>
        </Space>
      </Card>

      <Row gutter={24}>
        <Col span={24}>
          <Card title="Process Flow Visualization">
            {history.length > 0 ? (
              <Timeline mode="left" style={{ marginTop: 20 }}>
                {history.map((log, index) => {
                  const { time, step, details } = parseLog(log);
                  const isError = details.toLowerCase().includes('error');
                  
                  return (
                    <Timeline.Item 
                      key={index} 
                      label={<Text type="secondary" style={{ fontSize: 12 }}>{new Date(time).toLocaleString()}</Text>}
                      color={isError ? 'red' : index === history.length - 1 ? 'green' : 'blue'}
                      dot={isError ? <ClockCircleOutlined style={{ fontSize: '16px' }} /> : undefined}
                    >
                      <Card size="small" style={{ borderLeft: `4px solid ${isError ? '#ff4d4f' : '#1890ff'}` }}>
                        <Typography.Title level={5} style={{ margin: 0 }}>{step}</Typography.Title>
                        <Paragraph style={{ margin: '8px 0 0 0', whiteSpace: 'pre-wrap' }}>
                          {details}
                        </Paragraph>
                      </Card>
                    </Timeline.Item>
                  );
                })}
              </Timeline>
            ) : (
              <Empty description="Enter a Tracking ID to see the message flow history" />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TracingPage;
