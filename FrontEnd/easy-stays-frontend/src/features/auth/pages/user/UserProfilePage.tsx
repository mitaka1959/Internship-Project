import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Tag, Spin, Button, message } from "antd";
import api from "../../../../services/axios";
import dayjs from "dayjs";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

interface UserReservation {
  id: string;
  hotelName: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: string;
}

const UserProfilePage: React.FC = () => {
  const [reservations, setReservations] = useState<UserReservation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchUserReservations = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/Reservation/my-reservations");
      setReservations(response.data);
    } catch (error) {
      message.error("Failed to load your reservations.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserReservations();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "green";
      case "Pending":
        return "orange";
      case "Declined":
        return "red";
      default:
        return "default";
    }
  };

  return (
    <div
      style={{
        background: "#D9DDDC",
        minHeight: "110vh",
        position: "relative",
        width: "100%",
        marginTop: "-40px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "20px",
          background: "#D9DDDC",
          borderRadius: "8px",
        }}
      >
        <Breadcrumb style={{ marginBottom: "30px" }}>
          <Breadcrumb.Item onClick={() => navigate("/search")}>
            Home
          </Breadcrumb.Item>

          <Breadcrumb.Item>User Profile</Breadcrumb.Item>
        </Breadcrumb>
        <Button
          type="default"
          onClick={() => navigate("/search")}
          style={{
            marginBottom: "20px",
            borderRadius: "5px",
            backgroundColor: "#ffffff",
            color: "#333",
            border: "1px solid #ccc",
          }}
        >
          ← Back to Search
        </Button>
        <Title level={2} style={{ marginBottom: "1rem" }}>
          My Reservations
        </Title>

        {loading ? (
          <Spin size="large" style={{ display: "block", marginTop: 50 }} />
        ) : reservations.length === 0 ? (
          <Text>You have no reservations yet.</Text>
        ) : (
          <Row gutter={[16, 16]}>
            {reservations.map((reservation) => (
              <Col xs={24} sm={12} md={8} key={reservation.id}>
                <Card
                  hoverable
                  style={{
                    borderRadius: "10px",
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Title level={4}>{reservation.hotelName}</Title>
                    <Text strong>Room:</Text> {reservation.roomName} <br />
                    <Text strong>Check-in:</Text>{" "}
                    {dayjs(reservation.checkInDate).format("YYYY-MM-DD")} <br />
                    <Text strong>Check-out:</Text>{" "}
                    {dayjs(reservation.checkOutDate).format("YYYY-MM-DD")}{" "}
                    <br />
                    <Text strong>Total Price:</Text> ${reservation.totalPrice}{" "}
                  </div>

                  <div style={{ marginTop: "1rem" }}>
                    <Tag color={getStatusColor(reservation.status)}>
                      {reservation.status}
                    </Tag>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
