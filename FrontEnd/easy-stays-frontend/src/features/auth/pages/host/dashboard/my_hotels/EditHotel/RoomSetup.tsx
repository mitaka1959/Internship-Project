import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form, message } from "antd";
import RoomCard from "./RoomCard";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../../../../services/axios";

const RoomSetup: React.FC = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams<{ hotelId: string }>();
  const [form] = Form.useForm();

  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const res = await api.get(`/api/Hotels/${hotelId}/rooms`);
        console.log("Room details fetched:", res.data);

        setRooms(res.data);
      } catch (error) {
        console.error("Failed to fetch room details:", error);
        message.error("Failed to load room data.");
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  return (
    <div>
      <Row gutter={[16, 16]}>
        {rooms.map((room) => (
          <Col xs={24} sm={12} md={8} lg={6} key={room.id}>
            <RoomCard
              id={room.id}
              name={room.displayName}
              description={room.description}
              image={room.roomImages?.[0]?.imageUrl || "/placeholder.jpg"}
              priceRange={room.priceRange}
              onClick={() => navigate(`/host/edit-room/${room.id}`)}
            />
          </Col>
        ))}

        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            hoverable
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "240px",
              border: "1px dashed #ccc",
              borderRadius: "12px",
              color: "#aaa",
            }}
            onClick={() => navigate("/host/add-room")}
          >
            <div style={{ fontSize: "18px" }}>+ Add New Room</div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RoomSetup;
