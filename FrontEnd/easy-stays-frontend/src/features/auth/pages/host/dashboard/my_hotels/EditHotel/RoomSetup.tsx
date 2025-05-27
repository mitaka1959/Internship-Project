import React from "react";
import { Row, Col, Button, Card } from "antd";
import RoomCard from "./RoomCard";
import { useNavigate } from "react-router-dom";

const rooms = [
  {
    id: "1",
    name: "King Suite",
    description: "Spacious king-size room with balcony.",
    image: "/images/room1.jpg",
    priceRange: "$99.00 - $129.00 / night",
  },
  {
    id: "2",
    name: "Family Room",
    description: "Ideal for families, spacious and comfortable.",
    image: "/images/room2.jpg",
    priceRange: "$80.00 - $110.00 / night",
  },
  // Add more rooms...
];

const RoomSetup: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Row gutter={[16, 16]}>
        {rooms.map((room) => (
          <Col xs={24} sm={12} md={8} lg={6} key={room.id}>
            <RoomCard
              id={room.id}
              name={room.name}
              description={room.description}
              image={room.image}
              priceRange={room.priceRange}
              onClick={() => navigate(`/host/edit-room/${room.id}`)}
            />
          </Col>
        ))}
        {/* Add "Add Room" card */}
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
