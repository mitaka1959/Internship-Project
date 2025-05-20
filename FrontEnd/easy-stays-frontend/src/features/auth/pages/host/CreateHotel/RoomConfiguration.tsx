import React, { useState } from "react";
import type { ChangeEvent } from "react";
import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Typography,
  Row,
  Col,
  Divider,
} from "antd";

const { Title, Text } = Typography;

const roomTypes = [
  { label: "Standard", value: "standard" },
  { label: "Suite", value: "suite" },
  { label: "Custom", value: "custom" },
];

const roomAmenities = [
  { name: "Wi-Fi", value: "wifi", emoji: "📶" },
  { name: "TV", value: "tv", emoji: "📺" },
  { name: "Air Conditioning", value: "air_conditioning", emoji: "❄️" },
  { name: "Heating", value: "heating", emoji: "🔥" },
  { name: "Private Bathroom", value: "private_bathroom", emoji: "🛁" },
  { name: "Mini Bar", value: "mini_bar", emoji: "🍾" },
  { name: "Coffee Maker", value: "coffee_maker", emoji: "☕" },
  { name: "Room Service", value: "room_service", emoji: "🛎️" },
  { name: "Safe", value: "safe", emoji: "🔒" },
  { name: "Iron", value: "iron", emoji: "🧺" },
  { name: "Desk", value: "desk", emoji: "📝" },
  { name: "Balcony", value: "balcony", emoji: "🏞️" },
  { name: "Sea View", value: "sea_view", emoji: "🌊" },
  { name: "Accessible Room", value: "accessible_room", emoji: "♿" },
];

interface Step2Props {
  onNext: () => void;
  onPrev: () => void;
  onChange: (data: { [key: string]: any }) => void;
  formData: { [key: string]: any };
}
interface RoomGroup {
  roomType: string;
  displayName: string;
  roomQuantity: number;
  maxGuests: number;
  roomSize: number;
  bedConfiguration: { single: number; queen: number; king: number };
  amenities: string[];
  pricePerNight: number;
  description: string;
}

const RoomConfiguration: React.FC<Step2Props> = ({
  onNext,
  onPrev,
  onChange,
  formData,
}) => {
  const [roomGroups, setRoomGroups] = useState<RoomGroup[]>(
    formData.roomGroups || [
      {
        roomType: "standard",
        displayName: "",
        roomQuantity: 1,
        maxGuests: 1,
        roomSize: 20,
        bedConfiguration: { single: 0, queen: 0, king: 0 },
        amenities: [],
        pricePerNight: 100,
        description: "",
      },
    ]
  );

  const handleChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedGroups = [...roomGroups];
    updatedGroups[index] = { ...updatedGroups[index], [name]: value };
    setRoomGroups(updatedGroups);
  };

  const handleSelectChange = (index: number, name: string, value: any) => {
    const updatedGroups = [...roomGroups];
    updatedGroups[index] = { ...updatedGroups[index], [name]: value };
    setRoomGroups(updatedGroups);
  };

  const handleBedConfigChange = (
    index: number,
    bedType: string,
    value: number | null
  ) => {
    const updatedGroups = [...roomGroups];
    updatedGroups[index].bedConfiguration = {
      ...updatedGroups[index].bedConfiguration,
      [bedType]: value,
    };
    setRoomGroups(updatedGroups);
  };

  const addRoomGroup = () => {
    setRoomGroups([
      ...roomGroups,
      {
        roomType: "standard",
        displayName: "",
        roomQuantity: 1,
        maxGuests: 1,
        roomSize: 20,
        bedConfiguration: { single: 0, queen: 0, king: 0 },
        amenities: [],
        pricePerNight: 100,
        description: "",
      },
    ]);
  };

  const removeRoomGroup = (index: number) => {
    const updatedGroups = roomGroups.filter((_, i) => i !== index);
    setRoomGroups(updatedGroups);
  };

  const handleNext = () => {
    onChange({ roomGroups });
    onNext();
  };

  const handlePrev = () => {
    onChange({ roomGroups });
    onPrev();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Title level={3}>Room Configuration</Title>
      {roomGroups.map((group, index) => {
        const totalBeds =
          group.bedConfiguration.single +
          group.bedConfiguration.queen * 2 +
          group.bedConfiguration.king * 2;

        return (
          <Form key={index} layout="vertical" style={{ marginBottom: "2rem" }}>
            <Divider>Room Group {index + 1}</Divider>

            <Form.Item label="Room Base Type">
              <Select
                value={group.roomType}
                onChange={(value) =>
                  handleSelectChange(index, "roomType", value)
                }
                options={roomTypes}
              />
            </Form.Item>

            <Form.Item label="Display Name">
              <Input
                name="displayName"
                value={group.displayName}
                onChange={(e) => handleChange(index, e)}
              />
            </Form.Item>

            <Form.Item label="Number of Identical Rooms">
              <InputNumber
                min={1}
                value={group.roomQuantity}
                onChange={(value) =>
                  handleSelectChange(index, "roomQuantity", value)
                }
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item label="Max Guests">
              <InputNumber
                min={1}
                value={group.maxGuests}
                onChange={(value) =>
                  handleSelectChange(index, "maxGuests", value)
                }
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item label="Room Size (m²)">
              <InputNumber
                min={1}
                value={group.roomSize}
                onChange={(value) =>
                  handleSelectChange(index, "roomSize", value)
                }
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item label="Bed Configuration">
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Text>Single Beds</Text>
                  <InputNumber
                    min={0}
                    value={group.bedConfiguration.single}
                    onChange={(value) =>
                      handleBedConfigChange(index, "single", value)
                    }
                  />
                </Col>
                <Col span={8}>
                  <Text>Queen Beds</Text>
                  <InputNumber
                    min={0}
                    value={group.bedConfiguration.queen}
                    onChange={(value) =>
                      handleBedConfigChange(index, "queen", value)
                    }
                  />
                </Col>
                <Col span={8}>
                  <Text>King Beds</Text>
                  <InputNumber
                    min={0}
                    value={group.bedConfiguration.king}
                    onChange={(value) =>
                      handleBedConfigChange(index, "king", value)
                    }
                  />
                </Col>
              </Row>
              <Text strong>Total sleeping room for people: {totalBeds}</Text>
            </Form.Item>

            <Form.Item label="Amenities">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Select amenities"
                value={group.amenities}
                onChange={(value) =>
                  handleSelectChange(index, "amenities", value)
                }
                options={roomAmenities}
              />
            </Form.Item>

            <Form.Item label="Price Per Night">
              <InputNumber
                min={0}
                value={group.pricePerNight}
                onChange={(value) =>
                  handleSelectChange(index, "pricePerNight", value)
                }
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item label="Description">
              <Input.TextArea
                name="description"
                value={group.description}
                onChange={(e) => handleChange(index, e)}
              />
            </Form.Item>

            {roomGroups.length > 1 && (
              <Button
                type="primary"
                danger
                onClick={() => removeRoomGroup(index)}
              >
                Remove This Room Group
              </Button>
            )}
          </Form>
        );
      })}

      <Button
        type="dashed"
        onClick={addRoomGroup}
        style={{ width: "100%", marginBottom: "2rem" }}
      >
        Add Another Room Group
      </Button>

      <Form.Item>
        <Button
          type="primary"
          onClick={handlePrev}
          style={{ marginRight: "1rem" }}
        >
          Previous Step
        </Button>
        <Button type="primary" onClick={handleNext}>
          Next Step
        </Button>
      </Form.Item>
    </div>
  );
};

export default RoomConfiguration;
