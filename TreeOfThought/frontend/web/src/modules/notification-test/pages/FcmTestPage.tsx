import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Input,
  Form,
  Typography,
  Divider,
  message,
  Tag,
  Space,
  Upload,
} from "antd";
import {
  MobileOutlined,
  SendOutlined,
  CopyOutlined,
  ReloadOutlined,
  CloudUploadOutlined,
  FileDoneOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { setupFCM } from "../../../utils/firebaseUtils";
import httpClient from "../../../utils/httpClient";

const { Title, Text, Paragraph } = Typography;

const FcmTestPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string>("");
  const [tokenLoading, setTokenLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>("");

  const fetchToken = async () => {
    setTokenLoading(true);
    try {
      const fcmToken = await setupFCM();
      if (fcmToken) {
        setToken(fcmToken);
        message.success("FCM Token retrieved!");
      } else {
        message.warning(
          "Could not get FCM token. Check notification permissions.",
        );
      }
    } catch (error) {
      message.error("Error fetching FCM token.");
    } finally {
      setTokenLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  const onSendPush = async (values: any) => {
    if (!token) {
      message.error("No device token available!");
      return;
    }

    setLoading(true);
    try {
      await httpClient.post(
        `/FirebaseTest/push?token=${token}&title=${encodeURIComponent(values.title)}&body=${encodeURIComponent(values.body)}`,
        {},
      );
      message.success("Push request sent to backend!");
    } catch (error: any) {
      message.error(
        "Failed to send push: " +
          (error.response?.data?.message || error.message),
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success("Copied to clipboard!");
  };

  const handleUpload = async (options: any) => {
    const { file } = options;
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const response = await httpClient.post("/FirebaseTest/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadedUrl(response.data.url);
      message.success("File uploaded successfully!");
    } catch (error: any) {
      message.error(
        "Upload failed: " + (error.response?.data?.message || error.message),
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px" }}>
      <Title level={2}>
        <MobileOutlined /> FCM Push Notification Test
      </Title>
      <Paragraph>
        This module tests **Cloud Messaging**: 1. Get Device Token → 2. Send to
        Backend → 3. Backend Push Notification → 4. Frontend Receive (via
        Service Worker).
      </Paragraph>

      <Divider />

      <Card
        title="Device Information"
        extra={
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchToken}
            loading={tokenLoading}
          >
            Refresh Token
          </Button>
        }
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Text strong>Your FCM Device Token:</Text>
          <Input.Group compact>
            <Input
              style={{ width: "calc(100% - 80px)" }}
              value={token || "No token found"}
              readOnly
              placeholder="Retrieving token..."
            />
            <Button
              icon={<CopyOutlined />}
              onClick={() => copyToClipboard(token)}
              disabled={!token}
            />
          </Input.Group>
          {!token && (
            <Tag color="warning">
              Please allow notification permissions in your browser.
            </Tag>
          )}
          {token && <Tag color="green">Token Active</Tag>}
        </Space>
      </Card>

      <Card title="Trigger Push Notification" style={{ marginTop: 24 }}>
        <Form
          layout="vertical"
          onFinish={onSendPush}
          initialValues={{
            title: "Test Notification",
            body: "This is a sample push notification from backend!",
          }}
        >
          <Form.Item
            name="title"
            label="Notification Title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="body"
            label="Notification Body"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SendOutlined />}
            loading={loading}
            disabled={!token}
            block
            size="large"
          >
            Send Push via Backend
          </Button>
        </Form>
      </Card>

      <Card
        title={
          <span>
            <CloudUploadOutlined /> Google Cloud Storage Test
          </span>
        }
        style={{ marginTop: 24 }}
      >
        <Space direction="vertical" style={{ width: "100%" }} size="middle">
          <Paragraph>
            Upload a file to Google Cloud Storage and get a public URL.
          </Paragraph>

          <Upload.Dragger
            name="file"
            multiple={false}
            customRequest={handleUpload}
            showUploadList={false}
            disabled={uploading}
          >
            <p className="ant-upload-drag-icon">
              <CloudUploadOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single upload. The file will be stored in GCS.
            </p>
          </Upload.Dragger>

          {uploadedUrl && (
            <Card
              size="small"
              type="inner"
              title={
                <span>
                  <FileDoneOutlined /> Upload Success
                </span>
              }
              style={{ backgroundColor: "#f6ffed", borderColor: "#b7eb8f" }}
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text strong>Public URL:</Text>
                <Input.Group compact>
                  <Input
                    style={{ width: "calc(100% - 80px)" }}
                    value={uploadedUrl}
                    readOnly
                    prefix={<LinkOutlined />}
                  />
                  <Button
                    icon={<CopyOutlined />}
                    onClick={() => copyToClipboard(uploadedUrl)}
                  />
                </Input.Group>
                <a
                  href={uploadedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "12px" }}
                >
                  Open in new tab
                </a>
              </Space>
            </Card>
          )}
        </Space>
      </Card>

      <div style={{ marginTop: 40 }}>
        <Title level={4}>FCM Requirement Checklist:</Title>
        <ul>
          <li>
            <Tag color="green">Done</Tag> Retrieve FCM Device Token
          </li>
          <li>
            <Tag color="green">Done</Tag> Send Token to BE
          </li>
          <li>
            <Tag color="green">Done</Tag> BE calls Firebase Admin SDK to push
          </li>
          <li>
            <Tag color="green">Done</Tag> Receive push in foreground (Manual
            close, Top-Right)
          </li>
          <li>
            <Tag color="blue">Note</Tag> Background push requires service worker
            (firebase-messaging-sw.js)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FcmTestPage;
