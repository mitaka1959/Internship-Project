import React from "react";
import { Card, Row, Col, Typography, Button, Rate, Tag, Progress } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Sidebar from "../sidebar/Sidebar";
import hotelImage from "C:/Users/dimit/source/repos/EasyStays/FrontEnd/easy-stays-frontend/src/assets/hotel.webp";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const hotels = [
  {
    id: 1,
    name: "Victory House Hotel",
    rating: 4,
    status: "Active",
    rooms: "5 / 20",
  },
  {
    id: 2,
    name: "The Strand",
    rating: 5,
    status: "Inactive",
    rooms: "10 / 30",
  },
];

const MyHotels: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div
        style={{
          marginLeft: 220,
          padding: "2rem",
          width: "100%",
          backgroundColor: "#8ECAE6",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <Title level={2} style={{ color: "#023047", margin: 0 }}>
            My Hotels
          </Title>
          <Button
            onClick={() => navigate("/host/create-hotel/basic-info")}
            type="primary"
            style={{
              backgroundColor: "#FB8500",
              borderColor: "#FB8500",
            }}
          >
            + Add New Hotel
          </Button>
        </div>

        <Row gutter={[0, 25]} justify="center">
          {hotels.map((hotel) => (
            <Col xs={24} md={20} key={hotel.id}>
              <Card
                hoverable
                style={{
                  display: "flex",
                  borderRadius: "10px",
                  height: "200px",
                  padding: "0",
                  overflow: "hidden",
                }}
                bodyStyle={{ display: "flex", width: "100%", padding: 0 }}
              >
                <img
                  alt="hotel"
                  src={hotelImage}
                  style={{
                    width: "250px",
                    height: "180px",
                    padding: "10px 0px",
                    margin: "10px 20px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "1rem",
                  }}
                >
                  <div>
                    <Title level={4} style={{ marginBottom: "0.5rem" }}>
                      {hotel.name}
                    </Title>
                    <Rate disabled defaultValue={hotel.rating} />
                    <div style={{ margin: "0.5rem 0" }}>
                      <Tag color={hotel.status === "Active" ? "green" : "red"}>
                        {hotel.status}
                      </Tag>
                    </div>
                    <Text style={{ marginRight: "30px" }}>
                      Available Rooms: {hotel.rooms}
                    </Text>
                    <Progress
                      percent={40}
                      style={{ marginTop: "0.5rem", maxWidth: "300px" }}
                    />
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      style={{ color: "#FB8500", marginRight: "0.5rem" }}
                    />
                    <Button type="text" icon={<DeleteOutlined />} danger />
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default MyHotels;
