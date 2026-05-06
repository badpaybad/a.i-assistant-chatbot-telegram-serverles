import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Button, Space, Typography, message, Skeleton } from 'antd';
import { ReloadOutlined, DatabaseOutlined, BugOutlined, CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { dashboardService } from '../services/dashboardService';
import type { QueueInfo, CqrsStats } from '../services/dashboardService';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const DashboardPage: React.FC = () => {
  const [queues, setQueues] = useState<QueueInfo[]>([]);
  const [stats, setStats] = useState<CqrsStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [queuesData, statsData] = await Promise.all([
        dashboardService.getQueues(),
        dashboardService.getStats(),
      ]);
      setQueues(queuesData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
      message.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const queueColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Link to={`/modules/cqrs-dashboard/queue/${text}`}>{text}</Link>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        let color = 'blue';
        if (type === 'Subscription') color = 'purple';
        if (type === 'Internal') color = 'gray';
        return <Tag color={color}>{type}</Tag>;
      },
    },
    {
      title: 'Length',
      dataIndex: 'length',
      key: 'length',
      render: (len: number, record: QueueInfo) => (
        <Tag color={len > 100 ? 'red' : len > 0 ? 'orange' : 'green'}>
          {len}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: QueueInfo) => (
        <Space>
          <Link to={`/modules/cqrs-dashboard/queue/${record.name}`}>
            <Button size="small">Details</Button>
          </Link>
        </Space>
      ),
    },
  ];

  const totalErrors = stats ? Object.entries(stats.stats)
    .filter(([key]) => key.startsWith('error:'))
    .reduce((acc, [_, val]) => acc + val, 0) : 0;

  const totalCommands = stats ? Object.entries(stats.stats)
    .filter(([key]) => key.startsWith('command:'))
    .reduce((acc, [_, val]) => acc + val, 0) : 0;

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 24 }}>
        <Col flex="auto">
          <Title level={2}>CQRS Dashboard</Title>
        </Col>
        <Col>
          <Button icon={<ReloadOutlined />} onClick={fetchData} loading={loading}>
            Refresh
          </Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Commands"
              value={totalCommands}
              prefix={<DatabaseOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Workers"
              value={stats ? Object.values(stats.workerStatus).filter(s => s === 'Running').length : 0}
              suffix={`/ ${stats ? Object.keys(stats.workerStatus).length : 0}`}
              prefix={<SyncOutlined spin={loading} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Errors"
              value={totalErrors}
              prefix={<BugOutlined />}
              valueStyle={{ color: totalErrors > 0 ? '#cf1322' : '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Queues"
              value={queues.length}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card title="Queue Status">
            <Table
              dataSource={queues}
              columns={queueColumns}
              rowKey="name"
              loading={loading}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Worker Status" bodyStyle={{ maxHeight: 400, overflowY: 'auto' }}>
            {stats ? (
              Object.entries(stats.workerStatus).map(([name, status]) => (
                <div key={name} style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography.Text style={{ fontSize: 12 }} ellipsis title={name}>
                    {name}
                  </Typography.Text>
                  <Tag color={status === 'Running' ? 'green' : 'red'}>{status}</Tag>
                </div>
              ))
            ) : (
              <Skeleton active />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
