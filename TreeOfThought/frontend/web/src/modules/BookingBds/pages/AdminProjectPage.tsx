import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, message, Space } from 'antd';
import BookingService from '../services/BookingService';
import type { Project } from '../types';
import { useNavigate } from 'react-router-dom';

const AdminProjectPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            setLoading(true);
            const data = await BookingService.getProjects();
            setProjects(data);
        } catch (err) {
            message.error('Không thể tải danh sách dự án');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (values: any) => {
        try {
            await BookingService.createProject(values);
            message.success('Thêm dự án thành công');
            setIsModalVisible(false);
            form.resetFields();
            loadProjects();
        } catch (err) {
            message.error('Lỗi khi thêm dự án');
        }
    };

    const columns = [
        { title: 'Tên dự án', dataIndex: 'name', key: 'name' },
        { title: 'Địa điểm', dataIndex: 'location', key: 'location' },
        { title: 'Số căn', dataIndex: 'totalUnits', key: 'totalUnits' },
        {
            title: 'Hành động',
            key: 'action',
            render: (_: any, record: Project) => (
                <Space>
                    <Button type="link" onClick={() => navigate(`/modules/booking-bds/admin/projects/${record.id}/apartments`)}>
                        Quản lý căn hộ
                    </Button>
                </Space>
            )
        }
    ];

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <h2>Quản lý dự án</h2>
                <Button type="primary" onClick={() => setIsModalVisible(true)}>Thêm dự án</Button>
            </div>
            <Table dataSource={projects} columns={columns} rowKey="id" loading={loading} />

            <Modal title="Thêm dự án mới" open={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={() => form.submit()}>
                <Form form={form} layout="vertical" onFinish={handleAdd}>
                    <Form.Item name="name" label="Tên dự án" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="location" label="Địa điểm" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="totalUnits" label="Tổng số căn" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} min={1} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminProjectPage;
