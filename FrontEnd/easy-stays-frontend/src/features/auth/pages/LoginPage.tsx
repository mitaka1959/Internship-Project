import React from "react";
import { Button, Form, Input, Typography, Divider } from "antd";
import { loginUser } from "../../../services/authService";
import AuthLayout from "../../../layouts/AuthLayout";
import { GoogleOutlined, FacebookFilled } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();

  const handleLogin = async (values: any) => {
    try {
      await loginUser(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthLayout>
      <Title level={4} style={{ color: "#023047", marginBottom: 24 }}>
        Login
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleLogin}
        requiredMark={false}
      >
        <Form.Item
          name="userName"
          label="Username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              backgroundColor: "#FB8500",
              borderColor: "#FB8500",
              fontWeight: "bold",
            }}
          >
            Log In
          </Button>
        </Form.Item>
      </Form>

      <Divider plain>or</Divider>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        <Button
          shape="circle"
          icon={
            <FacebookFilled style={{ color: "#1877F2", fontSize: "35px" }} />
          }
          size="large"
        />

        <Button
          shape="circle"
          icon={
            <GoogleOutlined style={{ color: "#DB4437", fontSize: "18px" }} />
          }
          size="large"
        />
      </div>

      <Paragraph style={{ marginTop: 24 }}>
        Don’t have an account?{" "}
        <a href="/register" style={{ color: "#219EBC", fontWeight: "bold" }}>
          Create your account
        </a>
      </Paragraph>
    </AuthLayout>
  );
};

export default LoginPage;
