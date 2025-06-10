import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Divider,
  Input,
  DatePicker,
  InputNumber,
  Modal,
  message,
} from "antd";
import dayjs from "dayjs";
import api from "../../../../services/axios";

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const ReservationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    hotelId,
    hotelName,
    roomId,
    roomName,
    roomQuantity: initialRoomQuantity,
    dates: initialDates,
    pricePerNight,
    country,
    city,
    address,
  } = location.state || {};

  if (!initialDates) {
    throw new Error("ReservationPage requires initialDates to be provided.");
  }

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [roomQuantity, setRoomQuantity] = useState<number>(initialRoomQuantity);
  const [dates, setDates] = useState<[string, string]>(
    initialDates as [string, string]
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pendingChange, setPendingChange] = useState<{
    field: string;
    value: any;
  } | null>(null);

  const numberOfNights =
    dates && dates.length === 2
      ? dayjs(dates[1]).diff(dayjs(dates[0]), "day")
      : 1;

  const totalPrice = pricePerNight * roomQuantity * numberOfNights;

  const token = localStorage.getItem("access_token");

  const showConfirmation = (field: string, value: any) => {
    setPendingChange({ field, value });
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (pendingChange) {
      if (pendingChange.field === "roomQuantity") {
        setRoomQuantity(pendingChange.value);
      } else if (pendingChange.field === "dates") {
        setDates(pendingChange.value);
      }
    }
    setIsModalVisible(false);
    setPendingChange(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setPendingChange(null);
  };

  const handleConfirmReservation = async () => {
    if (!token) {
      message.info("Please log in to make a reservation.");
      navigate("/login", {
        state: {
          redirectTo: "/reservation",
          reservationData: {
            hotelId,
            hotelName,
            roomId,
            roomName,
            roomQuantity,
            dates,
            pricePerNight,
            country,
            city,
            address,
            totalPrice,
            firstName,
            lastName,
            phoneNumber,
            email,
          },
        },
      });
      return;
    }

    try {
      const reservationPayload = {
        hotelId,
        hotelName,
        country,
        city,
        address,
        roomGroupId: roomId,
        roomName,
        firstName,
        lastName,
        phoneNumber,
        email,
        roomQuantity,
        checkInDate: dates[0],
        checkOutDate: dates[1],
        pricePerNight,
        totalNights: numberOfNights,
        totalPrice,
      };
      console.log("Reservation Payload:", reservationPayload);

      await api.post("/api/Reservation", reservationPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Reservation confirmed!");
      navigate("/profile");
    } catch (error: any) {
      message.error("Failed to confirm reservation.");
      console.error(error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "100px auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
      }}
    >
      <Title level={2}>Confirm your Reservation</Title>
      <Divider />

      <Paragraph>
        <strong>Hotel:</strong> {hotelName}
      </Paragraph>
      <Paragraph>
        <strong>Country:</strong> {country}
      </Paragraph>
      <Paragraph>
        <strong>City:</strong> {city}
      </Paragraph>
      <Paragraph>
        <strong>Address:</strong> {address}
      </Paragraph>
      <Paragraph>
        <strong>Room:</strong> {roomName}
      </Paragraph>

      <Divider />

      <Title level={4}>Guest Information</Title>
      <Input
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Input
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Input
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Divider />

      <Title level={4}>Reservation Details</Title>

      <Paragraph>
        <strong>Room Quantity:</strong>{" "}
        <InputNumber
          min={1}
          value={roomQuantity}
          onChange={(value) =>
            showConfirmation("roomQuantity", value ?? initialRoomQuantity)
          }
        />
      </Paragraph>

      <Paragraph>
        <strong>Dates:</strong>{" "}
        <RangePicker
          value={[dayjs(dates[0]), dayjs(dates[1])]}
          onChange={(values) => {
            if (values && values.length === 2 && values[0] && values[1]) {
              showConfirmation("dates", [
                values[0].format("YYYY-MM-DD"),
                values[1].format("YYYY-MM-DD"),
              ]);
            }
          }}
        />
      </Paragraph>

      <Paragraph>
        <strong>Price per Night:</strong> ${pricePerNight}
      </Paragraph>
      <Paragraph>
        <strong>Total Nights:</strong> {numberOfNights}
      </Paragraph>
      <Paragraph>
        <strong>Total Price:</strong> ${totalPrice}
      </Paragraph>

      <Button type="primary" onClick={handleConfirmReservation}>
        Confirm Reservation
      </Button>

      <Modal
        title="Confirm Change"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Yes, change it"
        cancelText="Cancel"
      >
        Are you sure you want to change the{" "}
        <strong>{pendingChange?.field}</strong>?
      </Modal>
    </div>
  );
};

export default ReservationPage;
