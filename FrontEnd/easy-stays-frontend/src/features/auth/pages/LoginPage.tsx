import React from "react";
import { Button, Form, Input, Typography, Divider } from "antd";
import { loginUser } from "../../../services/authService";
import { useNavigate, useLocation } from "react-router-dom";
import { message } from "antd";
import AuthLayout from "../../../layouts/AuthLayout";
import FacebookLogo from "../../../assets/Facebook-logo.png";
import GoogleLogo from "../../../assets/Google.webp";

const { Title, Paragraph } = Typography;

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo;
  const reservationData = location.state?.reservationData;

  const onFinish = async (values: any) => {
    try {
      const response = await loginUser(values);
      console.log("Login response:", response);

      const role = response.role;
      localStorage.setItem("access_token", response.token);
      localStorage.setItem("refresh_token", response.refreshToken);
      localStorage.setItem("user_role", role);

      if (role === "Host" || role === "Admin") {
        navigate("/dashboard");
      } else {
        if (redirectTo) {
          navigate(redirectTo, { state: reservationData });
        } else {
          navigate("/search");
        }
      }
    } catch (error: any) {
      message.error(error.message || "Login failed");
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
        onFinish={onFinish}
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

      <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}>
        <Button
          shape="circle"
          style={{ transform: "scale(1.3)" }}
          icon={
            <img
              src={FacebookLogo}
              alt="Facebook"
              style={{ width: 40, height: 25, borderRadius: "50%" }}
            />
          }
        />

        <Button
          shape="circle"
          style={{ transform: "scale(1.3)" }}
          icon={
            <img
              src={GoogleLogo}
              alt="Google"
              style={{
                width: 25,
                height: 25,
                borderRadius: "50%",
                backgroundColor: "white",
                objectFit: "cover",
              }}
            />
          }
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
