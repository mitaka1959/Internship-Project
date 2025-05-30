import React, { useState } from "react";
import { Modal, Button, Image } from "antd";
import hotelImage from "../../../../assets/hotel_card_image.webp";
import roomImage from "../../../../assets/room-image.jpg";

interface HotelGalleryModalProps {
  isModalVisible: boolean;
  onClose: () => void;
}

const HotelGalleryModal: React.FC<HotelGalleryModalProps> = ({
  isModalVisible,
  onClose,
}) => {
  const hotelImages = Array(8).fill(hotelImage);
  const roomImages = Array(8).fill(roomImage);

  const [showHotelImages, setShowHotelImages] = useState(true);

  const imagesToShow = showHotelImages ? hotelImages : roomImages;

  return (
    <Modal
      open={isModalVisible}
      footer={null}
      onCancel={onClose}
      width="80%"
      style={{ top: 20 }}
      bodyStyle={{
        padding: "24px",
        background: "#fff",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "16px" }}>
        Hotel Gallery
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <Button
          type={showHotelImages ? "primary" : "default"}
          onClick={(e) => {
            e.stopPropagation();
            setShowHotelImages(true);
          }}
          style={{ marginRight: "8px" }}
        >
          Hotel
        </Button>
        <Button
          type={!showHotelImages ? "primary" : "default"}
          onClick={(e) => {
            e.stopPropagation();
            setShowHotelImages(false);
          }}
        >
          Room
        </Button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "8px",
        }}
      >
        {imagesToShow.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`Gallery image ${index + 1}`}
            width="100%"
            height="150px"
            style={{
              objectFit: "cover",
              borderRadius: "8px",
              transition: "transform 0.3s, filter 0.3s",
              cursor: "pointer",
            }}
            preview={false}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(0.8)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "brightness(1)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        ))}
      </div>
    </Modal>
  );
};

export default HotelGalleryModal;
