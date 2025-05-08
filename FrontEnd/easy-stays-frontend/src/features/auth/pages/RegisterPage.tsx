import React from "react";
import { Form, Input, Button, Typography, Radio } from "antd";
import AuthLayout from "../../../layouts/AuthLayout";
import { registerUser } from "../../../services/authService";
import { message } from "antd";

const { Title, Paragraph } = Typography;

const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const { userName, email, password, role } = values;
      await registerUser({ userName, email, password, role });
      message.success("Registration successful!");
    } catch (error: any) {
      message.error(error.message || "Something went wrong");
    }
  };

  return (
    <AuthLayout>
      <Title level={3} style={{ textAlign: "center", color: "#023047" }}>
        Create an Account
      </Title>

      <Form
        form={form}
        name="register"
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item
          name="userName"
          label="Username"
          rules={[{ required: true, message: "Please enter a username" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password" }]}
          hasFeedback
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>

        <Form.Item
          name="role"
          rules={[{ required: true, message: "Please select a role" }]}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ width: "40px" }}>Role:</span>
            <Radio.Group>
              <Radio value="Guest">Guest</Radio>
              <Radio value="Host">Host</Radio>
            </Radio.Group>
          </div>
        </Form.Item>

        <Form.Item style={{ marginBottom: 20 }}>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ backgroundColor: "#FB8500", borderColor: "#FB8500" }}
          >
            Create an Account
          </Button>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Paragraph
            style={{ marginTop: 8, marginBottom: 0, textAlign: "center" }}
          >
            Already have an account?{" "}
            <a href="/login" style={{ color: "#219EBC", fontWeight: "bold" }}>
              Log In into your account
            </a>
          </Paragraph>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default RegisterPage;
