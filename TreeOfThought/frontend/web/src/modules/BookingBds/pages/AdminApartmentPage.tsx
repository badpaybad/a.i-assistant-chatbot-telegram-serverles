import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Button, Modal, Form, Input, InputNumber, message, Tag } from 'antd';
import BookingService from '../services/BookingService';
import type { Apartment } from '../types';
import { ApartmentStatus } from '../types';

const AdminApartmentPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (projectId) loadApartments();
    }, [projectId]);

    const loadApartments = async () => {
        try {
            setLoading(true);
            const data = await BookingService.getApartments(projectId!);
            setApartments(data);
        } catch (err) {
            message.error('Không thể tải danh sách căn hộ');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (values: any) => {
        try {
            await BookingService.createApartment({ ...values, projectId: projectId! });
            message.success('Thêm căn hộ thành công');
            setIsModalVisible(false);
            form.resetFields();
            loadApartments();
        } catch (err) {
            message.error('Lỗi khi thêm căn hộ');
        }
    };

    const columns = [
        { title: 'Số căn', dataIndex: 'unitNumber', key: 'unitNumber' },
        { title: 'Tầng', dataIndex: 'floor', key: 'floor' },
        { title: 'Giá (VNĐ)', dataIndex: 'price', key: 'price', render: (val: number) => val.toLocaleString() },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: ApartmentStatus) => {
                let color = 'green';
                if (status === ApartmentStatus.Pending) color = 'orange';
                if (status === ApartmentStatus.Deposited) color = 'blue';
                if (status === ApartmentStatus.Sold) color = 'red';
                return <Tag color={color}>{status}</Tag>;
            }
        }
    ];

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <Space>
                    <Button onClick={() => navigate('/modules/booking-bds/admin/projects')}>Quay lại</Button>
                    <h2>Quản lý căn hộ</h2>
                </Space>
                <Button type="primary" onClick={() => setIsModalVisible(true)}>Thêm căn hộ</Button>
            </div>
            <Table dataSource={apartments} columns={columns} rowKey="id" loading={loading} />

            <Modal title="Thêm căn hộ mới" open={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={() => form.submit()}>
                <Form form={form} layout="vertical" onFinish={handleAdd}>
                    <Form.Item name="unitNumber" label="Số căn (ví dụ: A-101)" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="floor" label="Tầng" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} min={1} />
                    </Form.Item>
                    <Form.Item name="price" label="Giá bán" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

// Need to import Space
import { Space } from 'antd';

export default AdminApartmentPage;
