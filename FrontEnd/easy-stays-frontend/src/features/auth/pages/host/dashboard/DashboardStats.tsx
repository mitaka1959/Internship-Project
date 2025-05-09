import React from "react";
import { Card, Col, Row, Typography, Button } from "antd";

const { Title, Text } = Typography;

const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: "New Bookings",
      value: 24,
      change: "+20%",
      badgeColor: "#FFB703",
    },
    {
      title: "Total Revenue",
      value: "$13,450",
      change: "-20%",
      badgeColor: "#FFB703",
    },
    {
      title: "Total Reserved",
      value: "90 / 100",
      change: "+20%",
      badgeColor: "#FFB703",
    },
  ];

  return (
    <Row gutter={16} style={{ marginBottom: "2rem" }}>
      {stats.map((stat, index) => (
        <Col xs={24} sm={8} key={index}>
          <Card
            bordered={false}
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #219EBC",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              position: "relative",
              paddingBottom: "3rem",
              height: "130px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                backgroundColor: stat.badgeColor,
                color: "#fff",
                borderRadius: "999px",
                padding: "0.2rem 0.75rem",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            >
              {stat.change}
            </div>

            <Text style={{ color: "#023047", fontSize: "14px" }}>
              {stat.title}
            </Text>

            <Title
              level={1}
              style={{
                margin: 0,
                marginTop: "0.2rem",
                color: "#023047",
                fontSize: "2.5rem",
              }}
            >
              {stat.value}
            </Title>

            <Button
              type="link"
              style={{
                position: "absolute",
                bottom: "1rem",
                right: "1rem",
                color: "#FB8500",
                fontWeight: 600,
              }}
            >
              Details &gt;
            </Button>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DashboardStats;
