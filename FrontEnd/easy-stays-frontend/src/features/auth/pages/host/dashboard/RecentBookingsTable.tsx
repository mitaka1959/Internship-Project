import React from "react";
import { Table, Tag, Typography, Card } from "antd";

const { Title } = Typography;

type Booking = {
  key?: string;
  name: string;
  status: string;
  venue: string;
  date: string;
  time: string;
};

type RecentBookingsTableProps = {
  bookings: Booking[];
};

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
    render: (status: string) => {
      const isConfirmed = status.toLowerCase() === "confirmed";
      return (
        <Tag
          style={{
            backgroundColor: isConfirmed ? "#D3F9D8" : "#FFD6D9",
            color: isConfirmed ? "#4CAF50" : "#FF4D4F",
            fontWeight: "bold",
            borderRadius: "20px",
            padding: "0.2rem 0.8rem",
          }}
        >
          {status}
        </Tag>
      );
    },
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

const RecentBookingsTable: React.FC<RecentBookingsTableProps> = ({
  bookings,
}) => {
  const top3 = bookings.slice(0, 3).map((item, index) => ({
    ...item,
    key: item.key || `${item.name}-${index}`,
  }));

  return (
    <Card style={{ marginTop: "0.2rem", backgroundColor: "#ffffff" }}>
      <Title level={4} style={{ color: "#023047", marginBottom: 16 }}>
        Recent Bookings
      </Title>
      <Table
        dataSource={top3}
        columns={columns}
        pagination={false}
        bordered={false}
      />
    </Card>
  );
};

export default RecentBookingsTable;
