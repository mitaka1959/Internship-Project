import React from "react";
import { Layout, Typography } from "antd";

const { Content } = Layout;

type Props = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#8ECAE6" }}>
      <div
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#8ECAE6",
          borderBottom: "1px solid #8ECAE6",
        }}
      >
        <img
          src="/src/assets/logo.png"
          alt="EasyStays Logo"
          style={{
            height: "240px",
            objectFit: "contain",
            marginTop: "120px",
          }}
        />
      </div>

      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            backgroundColor: "#ffffff",
            padding: "2.5rem",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
