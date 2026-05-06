import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const BookingPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>Quản lý Booking Bất Động Sản</Title>
        <p>Chào mừng bạn đến với module quản lý booking. Vui lòng cập nhật yêu cầu trong yeucau.md để bắt đầu phát triển.</p>
      </Card>
    </div>
  );
};

export default BookingPage;
