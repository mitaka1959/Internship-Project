import React, { useState } from "react";
import { Typography, Divider, Button, Image, Rate, Tag, Row, Col } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import hotelImage from "../../../../assets/hotel_card_image.webp";
import roomImage from "../../../../assets/room-image.jpg";
import HotelGalleryModal from "../user/ImageGallery";

const { Title, Paragraph } = Typography;

const HotelPage: React.FC = () => {
  const hotel = {
    name: "Royal Plovdiv",
    location: "Plovdiv, Bulgaria",
    images: Array(8).fill(hotelImage),
    roomImages: Array(8).fill(roomImage),
    description:
      "Fantastic One-Bedroom Suite with city views. Balcony included.",
    price: 3301,
    oldPrice: 3883,
    specialNote: "Only 5 rooms left at this price!",
    rating: 8.5,
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={2}>{hotel.name}</Title>
          <Paragraph style={{ color: "#555" }}>{hotel.location}</Paragraph>
        </Col>
        <Col>
          <Button icon={<HeartOutlined />} type="default">
            Save
          </Button>
        </Col>
      </Row>

      <Divider />

      <div
        onClick={() => setIsModalVisible(true)}
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            gridRow: "1 / span 2",
            overflow: "hidden",
            borderRadius: "8px",
          }}
        >
          <Image
            src={hotel.images[0]}
            alt="Main Hotel"
            width="100%"
            height="100%"
            style={{
              objectFit: "cover",
              borderRadius: "8px",
              transition: "filter 0.3s ease",
            }}
            preview={false}
            onMouseEnter={(e) =>
              ((e.target as HTMLImageElement).style.filter = "brightness(85%)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLImageElement).style.filter = "brightness(100%)")
            }
          />
        </div>

        {hotel.images.slice(1, 5).map((img, index) => (
          <div key={index} style={{ overflow: "hidden", borderRadius: "8px" }}>
            <Image
              src={img}
              alt={`Hotel ${index + 1}`}
              width="100%"
              height="100%"
              style={{
                objectFit: "cover",
                borderRadius: "8px",
                transition: "filter 0.3s ease",
              }}
              preview={false}
              onMouseEnter={(e) =>
                ((e.target as HTMLImageElement).style.filter =
                  "brightness(85%)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLImageElement).style.filter =
                  "brightness(100%)")
              }
            />
          </div>
        ))}
      </div>

      {isModalVisible && (
        <HotelGalleryModal
          isModalVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      )}

      <Row
        justify="space-between"
        gutter={[16, 16]}
        style={{ marginBottom: "20px" }}
      >
        <Col xs={24} md={14}>
          <Title level={4}>About this hotel</Title>
          <Paragraph style={{ color: "#555" }}>{hotel.description}</Paragraph>
          <Tag color="red">{hotel.specialNote}</Tag>
        </Col>
        <Col xs={24} md={8} style={{ textAlign: "right" }}>
          <Title level={4} style={{ margin: 0 }}>
            USD ${hotel.price}
          </Title>
          <Paragraph delete>USD ${hotel.oldPrice}</Paragraph>
          <Rate disabled value={4} />
          <div style={{ marginTop: "10px" }}>
            <Button type="primary" size="large">
              Reserve
            </Button>
          </div>
        </Col>
      </Row>

      <Divider />
      <Title level={4}>Facilities</Title>
      <Row gutter={[16, 16]}>
        <Col>
          <Tag>Free WiFi</Tag>
        </Col>
        <Col>
          <Tag>Parking</Tag>
        </Col>
        <Col>
          <Tag>24-hour front desk</Tag>
        </Col>
      </Row>

      <Divider />
      <Title level={4}>Check-in & Check-out</Title>
      <Paragraph style={{ color: "#555" }}>
        Check-in: From 15:00
        <br />
        Check-out: Until 11:00
      </Paragraph>
    </div>
  );
};

export default HotelPage;
