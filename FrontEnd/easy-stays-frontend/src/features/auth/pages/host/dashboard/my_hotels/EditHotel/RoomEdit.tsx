import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Typography,
  message,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import api from "../../../../../../../services/axios";
import { useParams } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const RoomEditPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [form] = Form.useForm();
  const [roomImages, setRoomImages] = useState<any[]>([]);
  const [amenityOptions, setAmenityOptions] = useState<
    { value: string; label: string; emoji: string }[]
  >([]);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const res = await api.get(`/api/Hotels/${roomId}/edit-room`);
        const roomData = res.data;
        console.log(roomData);
        form.setFieldsValue({
          ...roomData,
          roomId: roomData.id,
          price: roomData.pricePerNight,
          Quantity: roomData.roomCount,
          amenities: roomData.amenities?.map((a: any) => a.amenity.name) || [],
        });

        setRoomImages(roomData.images || []);

        if (roomData.allAmenities) {
          const options = roomData.allAmenities.map((a: any) => ({
            value: a.id,
            label: a.name,
            emoji: a.emoji || "🏨",
          }));
          setAmenityOptions(options);
        } else {
          setAmenityOptions([]);
        }
      } catch (error) {
        console.error("Failed to load room details:", error);
        message.error("Failed to load room data.");
      }
    };

    fetchRoomDetails();
  }, [roomId, form]);

  const onFinish = async (values: any) => {
    try {
      await api.patch(`/api/Rooms/update/${roomId}`, values);
      message.success("Room details updated!");
    } catch (error) {
      console.error("Failed to update room:", error);
      message.error("Failed to update room details. Please try again.");
    }
  };

  const handleAmenityChange = (value: any) => {
    console.log("Selected amenities:", value);
  };

  return (
    <div style={{ background: "#fff", padding: "1rem", borderRadius: "8px" }}>
      <Title level={4}>Edit Room</Title>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="roomId" label="Room ID">
          <Select>
            <Option value={roomId}>{roomId}</Option>
          </Select>
        </Form.Item>

        <div style={{ marginBottom: "1rem" }}>
          <Title level={5}>Room Pictures</Title>
          {roomImages.map((img, index) => (
            <img
              key={index}
              src={img.imageUrl}
              alt={`Room ${index}`}
              style={{ width: "80px", marginRight: "8px" }}
            />
          ))}
          <Upload>
            <Button icon={<UploadOutlined />}>Add Image</Button>
          </Upload>
        </div>

        <Form.Item name="price" label="Room Price ($/night)">
          <Input type="number" />
        </Form.Item>

        <Form.Item name="Quantity" label="Quantity of that type rooms">
          <Input type="number" />
        </Form.Item>

        <Form.Item name="capacity" label="Capacity">
          <Input placeholder="E.g., 2-4 Guests" />
        </Form.Item>

        <Form.Item name="bedType" label="Bed Type">
          <Select>
            <Option value="King">King Size</Option>
            <Option value="Queen">Queen Size</Option>
            <Option value="Twin">Twin Beds</Option>
          </Select>
        </Form.Item>

        <Form.Item name="amenities" label="Amenities">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Select amenities"
            onChange={handleAmenityChange}
            options={amenityOptions}
            optionRender={(option) => (
              <Space>
                <span role="img" aria-label={option.data.label}>
                  {option.data.emoji}
                </span>
                {option.data.label}
              </Space>
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#FB8500", borderColor: "#FB8500" }}
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RoomEditPage;
