import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography, Skeleton, Button, message } from 'antd';
import BookingService from '../services/BookingService';
import type { Booking } from '../types';
import { BookingStatus } from '../types';

const { Title } = Typography;

const CartPage: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        try {
            setLoading(true);
            const data = await BookingService.getMyBookings();
            setBookings(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async (booking: Booking) => {
        try {
            message.loading({ content: 'Đang xử lý thanh toán...', key: 'payment' });
            // Mock transaction ID
            const transactionId = `TXN-${Math.random().toString(36).substring(7).toUpperCase()}`;
            await BookingService.confirmPayment(booking.id, transactionId, booking.depositAmount);
            message.success({ content: 'Thanh toán thành công! Hệ thống đang cập nhật trạng thái.', key: 'payment' });
            loadBookings();
        } catch (err) {
            message.error({ content: 'Thanh toán thất bại.', key: 'payment' });
        }
    };

    const columns = [
        {
            title: 'Mã Booking',
            dataIndex: 'id',
            key: 'id',
            render: (text: string) => text.substring(0, 8).toUpperCase()
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => new Date(date).toLocaleString()
        },
        {
            title: 'Số tiền cọc',
            dataIndex: 'depositAmount',
            key: 'depositAmount',
            render: (amount: number) => `${amount.toLocaleString()} VNĐ`
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: BookingStatus) => {
                let color = 'blue';
                if (status === BookingStatus.Paid) color = 'green';
                if (status === BookingStatus.Cancelled) color = 'red';
                if (status === BookingStatus.Completed) color = 'gold';
                return <Tag color={color}>{status}</Tag>;
            }
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_: any, record: Booking) => (
                record.status === BookingStatus.Pending && (
                    <Button type="primary" size="small" onClick={() => handlePayment(record)}>
                        Thanh toán ngay
                    </Button>
                )
            )
        }
    ];

    if (loading) return <Skeleton active />;

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Giỏ hàng của tôi</Title>
            <Table 
                dataSource={bookings} 
                columns={columns} 
                rowKey="id" 
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default CartPage;
