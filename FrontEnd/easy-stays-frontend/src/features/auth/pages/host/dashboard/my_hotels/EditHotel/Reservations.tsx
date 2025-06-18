import React, { useEffect, useState } from "react";
import {
  Typography,
  Divider,
  Table,
  Button,
  message,
  Spin,
  Select,
  Form,
} from "antd";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";
import Sidebar from "../../sidebar/Sidebar";
import api from "../../../../../../../services/axios";

const { Title } = Typography;

const HostReservationPage: React.FC = () => {
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedHotelId, setSelectedHotelId] = useState<string | undefined>(
    undefined
  );
  const [hotels, setHotels] = useState<any[]>([]);
  const [loadingReservationId, setLoadingReservationId] = useState<
    string | null
  >(null);
  const [loadingButtonType, setLoadingButtonType] = useState<
    "accept" | "decline" | null
  >(null);
  const [reservationStatus, setReservationStatus] = useState<string>("Pending");

  const fetchReservations = async (
    hotelId?: string,
    status: string = "Pending"
  ) => {
    setLoading(true);
    try {
      const response = await api.get(
        `/api/Reservation/${status.toLowerCase()}`,
        {
          params: hotelId ? { hotelId } : {},
        }
      );

      const reservations = response.data;

      setPendingRequests(
        reservations.map((r: any) => ({
          id: r.id,
          guestName: r.guestName,
          hotelName: r.hotelName,
          roomName: r.roomName,
          dates: [r.checkInDate, r.checkOutDate],
          totalPrice: r.totalPrice,
        }))
      );

      setCalendarEvents(
        reservations.map((r: any) => ({
          title: `${r.roomName} - ${r.guestName}`,
          start: r.checkInDate,
          end: dayjs(r.checkOutDate).add(1, "day").format("YYYY-MM-DD"),
        }))
      );
    } catch (error) {
      message.error("Failed to load reservations.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHotels = async () => {
    try {
      const response = await api.get("/api/Hotels/my-hotels-dropdown");
      setHotels(response.data);
    } catch (error) {
      message.error("Failed to load hotels.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHotels();
    fetchReservations(undefined, reservationStatus);
  }, []);

  const handleHotelChange = (hotelId: string) => {
    setSelectedHotelId(hotelId);
    fetchReservations(hotelId, reservationStatus);
  };

  const handleStatusChange = (status: string) => {
    setReservationStatus(status);
    fetchReservations(selectedHotelId, status);
  };

  const handleAccept = async (reservationId: string) => {
    try {
      setLoadingReservationId(reservationId);
      setLoadingButtonType("accept");
      await api.post(`/api/Reservation/${reservationId}/accept`);
      setPendingRequests((prev) => prev.filter((r) => r.id !== reservationId));
      message.success("Reservation accepted!");
    } catch (error) {
      console.error(error);
      message.error("Failed to accept reservation.");
    } finally {
      setLoadingReservationId(null);
      setLoadingButtonType(null);
    }
  };

  const handleDecline = async (reservationId: string) => {
    try {
      setLoadingReservationId(reservationId);
      setLoadingButtonType("decline");
      await api.post(`/api/Reservation/${reservationId}/decline`);
      setPendingRequests((prev) => prev.filter((r) => r.id !== reservationId));
      message.success("Reservation declined!");
    } catch (error) {
      console.error(error);
      message.error("Failed to decline reservation.");
    } finally {
      setLoadingReservationId(null);
      setLoadingButtonType(null);
    }
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
      render: (_: any, record: any) =>
        reservationStatus === "Pending" ? (
          <>
            <Button
              type="primary"
              style={{ marginRight: "8px" }}
              onClick={() => handleAccept(record.id)}
              loading={
                loadingReservationId === record.id &&
                loadingButtonType === "accept"
              }
            >
              Accept
            </Button>

            <Button
              danger
              onClick={() => handleDecline(record.id)}
              loading={
                loadingReservationId === record.id &&
                loadingButtonType === "decline"
              }
            >
              Decline
            </Button>
          </>
        ) : (
          <span>{reservationStatus}</span>
        ),
    },
  ];

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
      }}
    >
      <Sidebar />

      <div
        style={{ marginLeft: "150px", padding: "20px", marginRight: "-70px" }}
      >
        <Title level={2}>Reservations Calendar</Title>

        <Select
          placeholder="Select a Hotel"
          style={{ width: 300, marginBottom: "20px" }}
          onChange={handleHotelChange}
          value={selectedHotelId}
          options={hotels.map((hotel) => ({
            key: hotel.id,
            label: hotel.name,
            value: hotel.id,
          }))}
        />

        <Divider />

        <Form>
          <Select
            value={reservationStatus}
            style={{ width: 200, marginBottom: "20px", marginLeft: "1rem" }}
            onChange={handleStatusChange}
            options={[
              { value: "Pending", label: "Pending" },
              { value: "Confirmed", label: "Confirmed" },
              { value: "Declined", label: "Declined" },
            ]}
          />

          {loading ? (
            <Spin
              size="large"
              style={{
                display: "block",
                marginTop: 50,
                backgroundColor: "#fff",
              }}
            />
          ) : (
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={calendarEvents}
              height="auto"
            />
          )}
        </Form>

        <Divider />

        <Title level={3}>
          {reservationStatus === "Pending"
            ? "Incoming Reservation Requests"
            : reservationStatus === "Confirmed"
            ? "Confirmed Reservation Requests"
            : "Declined Reservation Requests"}
        </Title>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={pendingRequests}
          pagination={{ pageSize: 4 }}
          style={{ marginTop: "20px" }}
        />
      </div>
    </div>
  );
};

export default HostReservationPage;
