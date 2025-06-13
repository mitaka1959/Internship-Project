import React, { useState } from "react";
import { Modal, Button, Image } from "antd";

interface HotelGalleryModalProps {
  isModalVisible: boolean;
  onClose: () => void;
  hotelImages: string[];
  roomGroups: {
    roomName: string;
    images: string[];
  }[];
}

const HotelGalleryModal: React.FC<HotelGalleryModalProps> = ({
  isModalVisible,
  onClose,
  hotelImages,
  roomGroups,
}) => {
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number | null>(
    null
  );

  const imagesToShow =
    selectedRoomIndex === null
      ? hotelImages
      : roomGroups[selectedRoomIndex].images;

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
          flexWrap: "wrap",
          gap: "10px",
          padding: "12px",
          marginBottom: "16px",
          borderBottom: "1px solid #eee",
          background: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 10,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Button
          type={selectedRoomIndex === null ? "primary" : "default"}
          style={{
            fontWeight: selectedRoomIndex === null ? "bold" : "normal",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedRoomIndex(null);
          }}
        >
          Hotel
        </Button>
        {roomGroups.map((room, index) => (
          <Button
            key={index}
            type={selectedRoomIndex === index ? "primary" : "default"}
            style={{
              fontWeight: selectedRoomIndex === index ? "bold" : "normal",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedRoomIndex(index);
            }}
          >
            {room.roomName}
          </Button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "12px",
        }}
      >
        {imagesToShow.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`Gallery image ${index + 1}`}
            width="100%"
            height="180px"
            style={{
              objectFit: "cover",
              borderRadius: "8px",
              transition: "transform 0.3s, filter 0.3s",
              cursor: "pointer",
            }}
            preview={true}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(0.85)";
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
