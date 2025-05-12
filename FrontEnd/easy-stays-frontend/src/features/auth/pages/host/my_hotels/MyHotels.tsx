import React, { useState } from "react";
import { Table, Button, Input, Select, Typography, Space } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const MyHotels: React.FC = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );

  const data = [
    {
      key: "1",
      name: "Hotel Sunrise",
      status: "Active",
      rooms: "5 / 20",
      occupancy: "75%",
      revenue: "$12,000",
    },
    {
      key: "2",
      name: "Ocean View",
      status: "Inactive",
      rooms: "10 / 30",
      occupancy: "60%",
      revenue: "$8,500",
    },
  ];

  const filteredData = data.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(search.toLowerCase()) &&
      (!statusFilter || hotel.status === statusFilter)
  );

  const columns = [
    { title: "Hotel Name", dataIndex: "name", key: "name" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Rooms", dataIndex: "rooms", key: "rooms" },
    { title: "Occupancy", dataIndex: "occupancy", key: "occupancy" },
    { title: "Revenue", dataIndex: "revenue", key: "revenue" },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button icon={<EditOutlined />} />
          <Button icon={<EyeOutlined />} />
          <Button danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <Title level={3} style={{ color: "#023047" }}>
          My Hotels
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ backgroundColor: "#FB8500", borderColor: "#FB8500" }}
        >
          Add New Hotel
        </Button>
      </Space>

      <Space style={{ marginBottom: "1rem" }}>
        <Input
          placeholder="Search by hotel name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          placeholder="Filter by Status"
          style={{ width: 200 }}
          allowClear
          onChange={(value) => setStatusFilter(value)}
        >
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
          <Option value="Draft">Draft</Option>
        </Select>
      </Space>

      <Table dataSource={filteredData} columns={columns} />
    </div>
  );
};

export default MyHotels;
