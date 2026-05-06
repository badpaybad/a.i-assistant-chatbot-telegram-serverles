import React, { useEffect, useState } from 'react';
import { Card, List, Button, Typography, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
import BookingService from '../services/BookingService';
import type { Project } from '../types';

const { Title, Paragraph } = Typography;

const ProjectListPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        BookingService.getProjects()
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <Skeleton active />;

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Danh sách dự án Bất động sản</Title>
            <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
                dataSource={projects}
                renderItem={(project) => (
                    <List.Item>
                        <Card
                            hoverable
                            title={project.name}
                            cover={<img alt={project.name} src={`https://placehold.co/600x400?text=${encodeURIComponent(project.name)}`} />}
                        >
                            <Paragraph ellipsis={{ rows: 2 }}>{project.description}</Paragraph>
                            <Paragraph type="secondary">{project.location}</Paragraph>
                            <Button type="primary" block onClick={() => navigate(`/modules/booking-bds/projects/${project.id}`)}>
                                Xem sơ đồ căn hộ
                            </Button>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default ProjectListPage;
