import React from "react";
import { Card, Typography, Rate, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import "./HotelCard.css";
import placeholderImage from "../../../../assets/hotel_card_image.webp";
import dayjs, { Dayjs } from "dayjs";

const { Title } = Typography;

export type BedTypeQuantity = {
  bedType: string;
  quantity: number;
};

export type HotelCardProps = {
  hotel: {
    hotelId: string;
    name: string;
    location: string;
    imageUrl: string | null;
    roomId: string;
    roomName: string;
    bedTypes: BedTypeQuantity[];
    quantity: number;
    price: number;
    stars: number;
  };
  selectedDates: [Dayjs, Dayjs] | null;
};

export const formatBedType = (bedType: string) => {
  return bedType
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (str) => str.toUpperCase());
};

const HotelCard: React.FC<HotelCardProps> = ({ hotel, selectedDates }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/hotel-page/${hotel.hotelId}`, {
      state: {
        matchedRoomId: hotel.roomId,
        matchedRoomQuantity: hotel.quantity,
        dates: selectedDates
          ? [
              selectedDates[0].format("YYYY-MM-DD"),
              selectedDates[1].format("YYYY-MM-DD"),
            ]
          : null,
      },
    });
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
          style={{
            backgroundImage: `url(${
              hotel.imageUrl ? hotel.imageUrl : placeholderImage
            })`,
          }}
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
              {hotel.name}
            </Title>
            <Rate style={{ marginTop: "25px" }} value={hotel.stars} disabled />
          </div>
          <div style={{ marginRight: "330px" }}>
            <h3>{hotel.location}</h3>
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
              {hotel.quantity}x
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
                <h3>{hotel.roomName}</h3>
                <p>
                  {hotel.bedTypes
                    .map(
                      (bt) => `${bt.quantity} x ${formatBedType(bt.bedType)}`
                    )
                    .join(", ")}
                </p>
              </div>
              <div style={{ marginLeft: "300px", paddingTop: "40px" }}>
                <h2>USD ${hotel.price}</h2>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </button>
  );
};

export default HotelCard;
