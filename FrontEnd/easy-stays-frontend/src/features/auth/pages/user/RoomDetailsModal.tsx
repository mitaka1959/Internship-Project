import React, { useState, useEffect } from "react";
import {
  Modal,
  Image,
  Typography,
  Tag,
  Button,
  Divider,
  DatePicker,
  InputNumber,
} from "antd";
import dayjs, { Dayjs } from "dayjs";

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const RoomDetailsModal = ({
  visible,
  room,
  onClose,
  dates,
  matchedRoomQuantity,
  onReserve,
}: any) => {
  if (!room) return null;

  const [localDates, setLocalDates] = useState<[Dayjs, Dayjs] | null>(null);
  const [roomQuantity, setRoomQuantity] = useState<number>(1);

  useEffect(() => {
    if (dates && dates.length === 2) {
      setLocalDates([dayjs(dates[0]), dayjs(dates[1])]);
    }
    setRoomQuantity(matchedRoomQuantity || 1);
  }, [dates, matchedRoomQuantity, visible]);

  const numberOfNights =
    localDates && localDates.length === 2
      ? dayjs(localDates[1]).diff(dayjs(localDates[0]), "day")
      : 1;

  const totalAmount = room.pricePerNight * roomQuantity * numberOfNights;

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width="80%"
      style={{ top: 20 }}
    >
      <Title level={3}>{room.displayName}</Title>

      <div
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
            src={room.images?.[0]}
            alt="Main Room Image"
            width="100%"
            height="100%"
            style={{
              objectFit: "cover",
              borderRadius: "8px",
              transition: "filter 0.3s ease, transform 0.3s ease",
            }}
            preview={true}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(85%)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "brightness(100%)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        </div>

        {room.images?.slice(1, 5).map((img: string, index: number) => (
          <div key={index} style={{ overflow: "hidden", borderRadius: "8px" }}>
            <Image
              src={img}
              alt={`Room image ${index + 1}`}
              width="100%"
              height="100%"
              style={{
                objectFit: "cover",
                borderRadius: "8px",
                transition: "filter 0.3s ease, transform 0.3s ease",
              }}
              preview={true}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(85%)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "brightness(100%)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </div>
        ))}
      </div>

      <Paragraph>
        <strong>Capacity:</strong> {room.capacity} persons
      </Paragraph>

      <Paragraph>
        <strong>Room Size:</strong> {room.roomSize} m²
      </Paragraph>

      <Paragraph>
        <strong>Description:</strong> {room.description}
      </Paragraph>

      <Title level={5}>Amenities</Title>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {room.amenities?.map((amenity: string, idx: number) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "4px 10px",
              background: "#f5f5f5",
              borderRadius: "999px",
              fontSize: "14px",
            }}
          >
            <span style={{ color: "green", marginRight: "6px" }}>✓</span>
            {amenity}
          </div>
        ))}
      </div>

      <Divider />

      <Title level={5}>Select Dates</Title>
      <RangePicker
        value={localDates}
        onChange={(values) => setLocalDates(values as [Dayjs, Dayjs])}
        style={{ marginBottom: "16px" }}
      />

      <Title level={5}>Select Number of Rooms</Title>
      <InputNumber
        min={1}
        max={10}
        value={roomQuantity}
        onChange={(value) => setRoomQuantity(value || 1)}
        style={{ marginBottom: "16px" }}
      />

      <Divider />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
        }}
      >
        <Paragraph
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: 0 }}
        >
          Total Amount: ${totalAmount}
        </Paragraph>

        <Button
          type="primary"
          size="large"
          onClick={() => {
            onReserve({
              dates: [
                localDates?.[0].format("YYYY-MM-DD"),
                localDates?.[1].format("YYYY-MM-DD"),
              ],
              roomQuantity: roomQuantity,
            });
          }}
        >
          Reserve
        </Button>
      </div>
    </Modal>
  );
};

export default RoomDetailsModal;
