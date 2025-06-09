import React, { useEffect, useState } from "react";
import {
  Typography,
  Divider,
  Table,
  Button,
  message,
  Spin,
  Select,
} from "antd";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";
import Sidebar from "../../sidebar/Sidebar";

const { Title } = Typography;

const HostReservationPage: React.FC = () => {
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedHotelId, setSelectedHotelId] = useState<string | undefined>(
    undefined
  );
  const [hotels, setHotels] = useState<any[]>([]);

  useEffect(() => {
    setHotels([
      { id: "h1", name: "Grand Horizon Hotel" },
      { id: "h2", name: "Sea Breeze Resort" },
    ]);
  }, []);

  const handleHotelChange = (hotelId: string) => {
    setSelectedHotelId(hotelId);
    setCalendarEvents([
      {
        title: "Panoramic Suite - John Doe",
        start: "2025-06-10",
        end: "2025-06-15",
      },
    ]);
    setPendingRequests([
      {
        id: "r1",
        guestName: "Michael Johnson",
        hotelName: "Grand Horizon Hotel",
        roomName: "Panoramic View Suite",
        dates: ["2025-06-20", "2025-06-25"],
        totalPrice: 1500,
      },
    ]);
  };

  const handleAccept = (reservationId: string) => {
    message.success(`Accepted reservation ${reservationId}`);
  };

  const handleDecline = (reservationId: string) => {
    message.error(`Declined reservation ${reservationId}`);
  };

  const columns = [
    {
      title: "Guest",
      dataIndex: "guestName",
      key: "guestName",
    },
    {
      title: "Hotel",
      dataIndex: "hotelName",
      key: "hotelName",
    },
    {
      title: "Room",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "Dates",
      dataIndex: "dates",
      key: "dates",
      render: (dates: string[]) =>
        `${dayjs(dates[0]).format("YYYY-MM-DD")} → ${dayjs(dates[1]).format(
          "YYYY-MM-DD"
        )}`,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => `$${price}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: "8px" }}
            onClick={() => handleAccept(record.id)}
          >
            Accept
          </Button>
          <Button danger onClick={() => handleDecline(record.id)}>
            Decline
          </Button>
        </>
      ),
    },
  ];

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
      }}
    >
      <div>
        <Sidebar />
      </div>
      <div
        style={{ marginLeft: "150px", padding: "20px", marginRight: "-70px" }}
      >
        <Title level={2}>Reservations Calendar</Title>
        <Select
          placeholder="Select a Hotel"
          style={{ width: 300, marginBottom: "20px" }}
          onChange={handleHotelChange}
          value={selectedHotelId}
        >
          {hotels.map((hotel) => (
            <Select.Option key={hotel.id} value={hotel.id}>
              {hotel.name}
            </Select.Option>
          ))}
        </Select>
        <Divider />

        {loading ? (
          <Spin size="large" style={{ display: "block", marginTop: 50 }} />
        ) : (
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
            height="auto"
          />
        )}

        <Divider />
        <Title level={3}>Incoming Reservation Requests</Title>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={pendingRequests}
          pagination={false}
          style={{ marginTop: "20px" }}
        />
      </div>
    </div>
  );
};

export default HostReservationPage;
