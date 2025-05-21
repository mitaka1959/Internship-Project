import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Button, Rate, Tag, Progress } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Sidebar from "../sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import api from "../../../../../../services/axios";

const { Title, Text } = Typography;

interface Hotel {
  id: string;
  name: string;
  rating: number;
  status: string;
  roomsAvailable: number;
  totalRooms: number;
}

const MyHotels: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await api.get("/api/Hotels/my-hotels");
        setHotels(res.data);
      } catch (err) {
        console.error("Failed to fetch hotels", err);
      }
    };

    fetchHotels();
  }, []);

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
            onClick={() => navigate("/host/create-hotel/create-hotel")}
            type="primary"
            style={{ backgroundColor: "#FB8500", borderColor: "#FB8500" }}
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
                  src="/placeholder.jpg"
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
                    <Text>
                      Available Rooms: {hotel.roomsAvailable} /{" "}
                      {hotel.totalRooms}
                    </Text>
                    <Progress
                      percent={(hotel.roomsAvailable / hotel.totalRooms) * 100}
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
