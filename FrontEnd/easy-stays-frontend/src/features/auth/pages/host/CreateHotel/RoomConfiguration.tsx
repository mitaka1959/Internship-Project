import {
  Select,
  Button,
  Form,
  Input,
  InputNumber,
  Typography,
  Row,
  Col,
} from "antd";
import React, { useState } from "react";

const { Title, Text } = Typography;

const roomTypes = [
  { value: "Standard Room", label: "Standard Room" },
  { value: "Deluxe Room", label: "Deluxe Room" },
  { value: "Suite", label: "Suite" },
  { value: "Family Room", label: "Family Room" },
];

interface Step2Props {
  onNext: () => void;
  onChange: (data: { [key: string]: any }) => void;
}

const RoomConfiguration: React.FC<Step2Props> = ({ onNext, onChange }) => {
  const [formData, setFormData] = useState({
    roomType: "Standard Room",
    roomName: "",
    roomQuantity: 1,
    roomMaxOccupancy: 2,
    roomSize: 50,
    bedConfiguration: {
      single: 0,
      queen: 0,
      king: 0,
    },
  });

  const handleInputChange = (name: string, value: any) => {
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onChange({ [name]: value });
  };

  const handleBedConfigChange = (bedType: string, value: number | null) => {
    const updatedBedConfig = { ...formData.bedConfiguration, [bedType]: value };
    setFormData({ ...formData, bedConfiguration: updatedBedConfig });
    onChange({ bedConfiguration: updatedBedConfig });
  };

  const totalBeds = Object.values(formData.bedConfiguration).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <div style={{ padding: "2rem" }}>
      <Title level={3}>Room Configuration</Title>
      <Form layout="vertical">
        <Form.Item label="Room Type">
          <Select
            value={formData.roomType}
            style={{ width: "100%" }}
            onChange={(value) => handleInputChange("roomType", value)}
            options={roomTypes}
          />
        </Form.Item>

        <Form.Item label="Room Name">
          <Input
            name="roomName"
            placeholder="Room Name"
            value={formData.roomName}
            onChange={(e) => handleInputChange("roomName", e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Quantity of Identical Rooms">
          <InputNumber
            min={1}
            value={formData.roomQuantity}
            onChange={(value) => handleInputChange("roomQuantity", value)}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Room Max Occupancy">
          <InputNumber
            min={1}
            value={formData.roomMaxOccupancy}
            onChange={(value) => handleInputChange("roomMaxOccupancy", value)}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Room Size (m²)">
          <InputNumber
            min={1}
            value={formData.roomSize}
            onChange={(value) => handleInputChange("roomSize", value)}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Bed Configuration">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Text>Single Beds</Text>
              <InputNumber
                min={0}
                value={formData.bedConfiguration.single}
                onChange={(value) => handleBedConfigChange("single", value)}
              />
            </Col>
            <Col span={8}>
              <Text>Queen Beds</Text>
              <InputNumber
                min={0}
                value={formData.bedConfiguration.queen}
                onChange={(value) => handleBedConfigChange("queen", value)}
              />
            </Col>
            <Col span={8}>
              <Text>King Beds</Text>
              <InputNumber
                min={0}
                value={formData.bedConfiguration.king}
                onChange={(value) => handleBedConfigChange("king", value)}
              />
            </Col>
          </Row>
          <Text strong>Total Beds: {totalBeds}</Text>
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={onNext} block>
            Next Step
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RoomConfiguration;
