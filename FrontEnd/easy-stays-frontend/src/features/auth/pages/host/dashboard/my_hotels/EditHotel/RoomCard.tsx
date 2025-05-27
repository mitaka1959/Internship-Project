import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

interface RoomCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  priceRange: string;
  onClick: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  id,
  name,
  description,
  image,
  priceRange,
  onClick,
}) => {
  return (
    <Card
      hoverable
      cover={
        <img
          alt={name}
          src={image}
          style={{ height: "180px", objectFit: "cover" }}
        />
      }
      onClick={onClick}
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <Title level={4} style={{ margin: "0 0 8px 0" }}>
        {name}
      </Title>
      <Text type="secondary">{description}</Text>
      <div style={{ marginTop: "8px", fontWeight: "bold" }}>{priceRange}</div>
    </Card>
  );
};

export default RoomCard;
