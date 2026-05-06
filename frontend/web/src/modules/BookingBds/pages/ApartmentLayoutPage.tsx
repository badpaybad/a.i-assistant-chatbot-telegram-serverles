import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Tag, Button, Typography, message, Modal } from 'antd';
import BookingService from '../services/BookingService';
import { Apartment, ApartmentStatus } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { CqrsOnCommandResult } from '../../../utils/firebaseUtils';

const { Title } = Typography;

const ApartmentLayoutPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (projectId) {
            BookingService.getApartments(projectId)
                .then(data => {
                    setApartments(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [projectId]);

    const handleBooking = async (apartment: Apartment) => {
        const requestId = uuidv4();
        Modal.confirm({
            title: `Xác nhận giữ chỗ căn ${apartment.UnitNumber}`,
            content: `Giá: ${apartment.price.toLocaleString()} VNĐ. Bạn có 15 phút để hoàn tất thanh toán sau khi giữ chỗ.`,
            onOk: async () => {
                try {
                    message.loading({ content: 'Đang gửi yêu cầu giữ chỗ...', key: 'booking' });
                    
                    // Listen for real-time result
                    const unsubscribe = CqrsOnCommandResult(requestId, (data) => {
                        if (data.Status === 'SUCCESS') {
                            message.success({ content: data.Message, key: 'booking', duration: 5 });
                            // Refresh list or update local state
                            setApartments(prev => prev.map(a => a.id === apartment.id ? { ...a, status: ApartmentStatus.Pending } : a));
                        } else {
                            message.error({ content: data.Message, key: 'booking', duration: 5 });
                        }
                        unsubscribe();
                    });

                    await BookingService.createBooking(apartment.id, 50000000, requestId); // 50M deposit
                } catch (err) {
                    message.error({ content: 'Lỗi khi gửi yêu cầu.', key: 'booking' });
                }
            }
        });
    };

    const getStatusTag = (status: ApartmentStatus) => {
        switch (status) {
            case ApartmentStatus.Available: return <Tag color="green">Còn trống</Tag>;
            case ApartmentStatus.Pending: return <Tag color="orange">Đang giữ chỗ</Tag>;
            case ApartmentStatus.Deposited: return <Tag color="blue">Đã cọc</Tag>;
            case ApartmentStatus.Sold: return <Tag color="red">Đã bán</Tag>;
            default: return <Tag>{status}</Tag>;
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            <Button onClick={() => navigate('/modules/booking-bds')}>Quay lại danh sách dự án</Button>
            <Title level={2} style={{ marginTop: '16px' }}>Sơ đồ căn hộ</Title>
            <Row gutter={[16, 16]}>
                {apartments.map(apt => (
                    <Col key={apt.id} xs={12} sm={8} md={6} lg={4}>
                        <Card 
                            title={`Căn ${apt.UnitNumber}`} 
                            size="small"
                            extra={getStatusTag(apt.status)}
                            style={{ textAlign: 'center' }}
                        >
                            <Paragraph>Tầng: {apt.floor}</Paragraph>
                            <Paragraph strong>{apt.price.toLocaleString()} VNĐ</Paragraph>
                            <Button 
                                type="primary" 
                                disabled={apt.status !== ApartmentStatus.Available}
                                onClick={() => handleBooking(apt)}
                            >
                                Giữ chỗ
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

const Paragraph = Typography.Paragraph;

export default ApartmentLayoutPage;
