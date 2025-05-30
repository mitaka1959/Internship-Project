import React from "react";
import { Card, Typography, Tag, Rate, Divider } from "antd";
import { StarFilled, HeartOutlined } from "@ant-design/icons";
import hotelImage from "../../../../assets/hotel_card_image.webp";
import "./HotelCard.css";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const HotelCard: React.FC = () => {
  const navigate = useNavigate();

  const data = {
    title: "W South Beach",
    location: "South Beach, Miami, Florida",
    description: "Fantastic One-Bedroom Suite, Ocean View, Balcony",
    specialNote: "Only 5 rooms left at this price",
    oldPrice: 3883,
    newPrice: 3301,
    rating: 8.5,
    reviewCount: 435,
  };

  const handleClick = () => {
    navigate("/hotel-page");
  };

  return (
    <button
      onClick={handleClick}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        width: "100%",
        cursor: "pointer",
      }}
    >
      <Card
        className="hotel-card"
        bodyStyle={{ display: "flex", padding: 0, flexDirection: "row" }}
        style={{
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)";
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 8px 16px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        <div
          className="hotel-card-image"
          style={{ backgroundImage: `url(${hotelImage})` }}
        ></div>

        <div className="hotel-card-content">
          <div
            className="hotel-card-header"
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "40px",
            }}
          >
            <Title style={{ marginRight: "10px", marginTop: "20px" }} level={3}>
              {data.title}
            </Title>
            <Rate style={{ marginTop: "25px" }} value={5} disabled />
          </div>
          <div style={{ marginRight: "330px" }}>
            <h3>
              South Beach, Miami<br></br> Florida
            </h3>
          </div>
          <div>
            <p
              style={{
                marginLeft: "40px",
                backgroundColor: "#d3d3d3",
                width: "20px",
                borderRadius: "5px",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                paddingRight: "2px",
                paddingBottom: "1px",
                marginBottom: 0,
              }}
            >
              1x
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Divider
                type="vertical"
                style={{
                  borderColor: "#d3d3d3",
                  marginLeft: "49px",
                  height: "60px",
                }}
              >
                Solid
              </Divider>
              <div style={{ display: "grid", marginBottom: "0" }}>
                <h3>Standard Room</h3>

                <p>1 Queen Size Bed</p>
              </div>
              <div style={{ marginLeft: "300px", paddingTop: "40px" }}>
                <h2>USD ${data.oldPrice}</h2>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </button>
  );
};

export default HotelCard;
