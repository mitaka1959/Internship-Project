import React from "react";
import { Table, Tag, Typography, Card } from "antd";

const { Title } = Typography;

const data = [
  {
    key: "1",
    name: "James Gorden",
    status: "Booked",
    venue: "Avana 3",
    date: "13 March 2023",
    time: "09.00-12.00",
  },
  {
    key: "2",
    name: "John Dae",
    status: "Canceled",
    venue: "Avana 2",
    date: "13 March 2023",
    time: "09.00-12.00",
  },
  {
    key: "3",
    name: "Avery Bradly",
    status: "Booked",
    venue: "Avana 1",
    date: "13 March 2023",
    time: "09.00-12.00",
  },
];

const columns = [
  {
    title: "Booking Name",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <strong>{text}</strong>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag
        color={status === "Booked" ? "#D3F9D8" : "#FFD6D9"}
        style={{
          color: status === "Booked" ? "#4CAF50" : "#FF4D4F",
          fontWeight: "bold",
          borderRadius: "20px",
          padding: "0.2rem 0.8rem",
        }}
      >
        {status}
      </Tag>
    ),
  },
  {
    title: "Venue",
    dataIndex: "venue",
    key: "venue",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
];

const RecentBookingsTable: React.FC = () => {
  return (
    <Card style={{ marginTop: "2rem", backgroundColor: "#ffffff" }}>
      <Title level={4} style={{ color: "#023047", marginBottom: 16 }}>
        Recent Bookings
      </Title>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        bordered={false}
      />
    </Card>
  );
};

export default RecentBookingsTable;
