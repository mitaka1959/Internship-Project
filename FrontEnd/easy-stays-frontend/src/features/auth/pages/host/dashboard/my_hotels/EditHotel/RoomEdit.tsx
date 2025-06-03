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
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import api from "../../../../../../../services/axios";
import { useParams } from "react-router-dom";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const amenityOptions = [
  { id: "1", name: "WiFi", emoji: "📶" },
  { id: "2", name: "Air Conditioning", emoji: "❄️" },
  { id: "3", name: "Heating", emoji: "🔥" },
  { id: "4", name: "TV", emoji: "📺" },
  { id: "5", name: "Mini Bar", emoji: "🍸" },
  { id: "6", name: "Coffee/Tea Maker", emoji: "☕" },
  { id: "7", name: "Hair Dryer", emoji: "💇‍♀️" },
  { id: "8", name: "Safe Box", emoji: "🔒" },
  { id: "9", name: "Room Service", emoji: "🛎️" },
  { id: "10", name: "Iron", emoji: "🧺" },
  { id: "11", name: "Balcony", emoji: "🏞️" },
  { id: "12", name: "Terrace", emoji: "🏡" },
  { id: "13", name: "Soundproofing", emoji: "🔇" },
  { id: "14", name: "Private Bathroom", emoji: "🚿" },
  { id: "15", name: "Desk", emoji: "📝" },
  { id: "16", name: "Closet/Wardrobe", emoji: "👗" },
  { id: "17", name: "Towels", emoji: "🛁" },
  { id: "18", name: "Slippers", emoji: "🥿" },
  { id: "19", name: "Bathrobe", emoji: "🛀" },
];

const RoomEditPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [form] = Form.useForm();
  const [roomImages, setRoomImages] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const res = await api.get(`/api/Hotels/${roomId}/edit-room`);
        const roomData = res.data;

        form.setFieldsValue({
          roomId: roomData.id,
          displayName: roomData.displayName,
          description: roomData.description,
          price: roomData.pricePerNight,
          Quantity: roomData.roomCount,
          capacity: roomData.capacity,
          amenities: roomData.roomAmenities?.map((a: any) => a.name) || [],
          bedConfigurations:
            roomData.bedConfigurations?.map((b: any) => ({
              bedType: b.bedType,
              quantity: b.quantity,
            })) || [],
        });

        setRoomImages(roomData.images?.map((img: any) => img.imageUrl) || []);
        setSelectedAmenities(
          roomData.amenities?.map((a: any) => {
            const found = amenityOptions.find((opt) => opt.name === a.name);
            return found?.id || "";
          }) || []
        );
      } catch (error) {
        console.error("Failed to load room details:", error);
        message.error("Failed to load room data.");
      }
    };

    fetchRoomDetails();
  }, [roomId, form]);

  const onFinish = async (values: any) => {
    const amenitiesPayload = selectedAmenities.map((id) => {
      const amenity = amenityOptions.find((a) => a.id === id);
      return { name: amenity?.name || "", emoji: amenity?.emoji || "" };
    });

    const payload = {
      roomId: roomId,
      displayName: values.displayName,
      description: values.description,
      capacity: Number(values.capacity),
      pricePerNight: Number(values.price),
      roomCount: Number(values.Quantity),
      roomSize: 100,
      amenities: amenitiesPayload,
      bedConfigurations:
        values.bedConfigurations?.map((b: any) => ({
          bedType: Number(b.bedType),
          quantity: Number(b.quantity),
        })) || [],
    };

    console.log("Payload to Backend:", payload);

    try {
      await api.patch(`/api/Hotels/update-room/${roomId}`, payload);
      message.success("Room details updated!");
    } catch (error) {
      console.error("Failed to update room:", error);
      message.error("Failed to update room details. Please try again.");
    }
  };

  const handleAmenityChange = (values: string[]) => {
    setSelectedAmenities(values);
  };

  const handleUpload = async (file: any) => {
    const formData = new FormData();
    formData.append("images", file);

    try {
      const res = await api.post(
        `/api/Hotels/Rooms/${roomId}/images`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      message.success("Image uploaded successfully!");
      setRoomImages((prev) => [...prev, ...res.data]);
    } catch (error) {
      console.error("Failed to upload image:", error);
      message.error("Failed to upload image. Please try again.");
    }
  };

  return (
    <div style={{ background: "#fff", padding: "1rem", borderRadius: "8px" }}>
      <Title level={4}>Edit Room</Title>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="roomId" label="Room ID">
          <Select disabled>
            <Option value={roomId}>{roomId}</Option>
          </Select>
        </Form.Item>
        <Form.Item name="displayName" label="Name of the Room">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description of the Room">
          <TextArea rows={4} />
        </Form.Item>

        <div style={{ marginBottom: "1rem" }}>
          <Title level={5}>Room Pictures</Title>
          <div style={{ marginBottom: "0.5rem" }}>
            {roomImages.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`Room ${index}`}
                style={{ width: "80px", marginRight: "8px" }}
              />
            ))}
          </div>
          <Upload
            customRequest={({ file, onSuccess }) => {
              handleUpload(file).then(() => onSuccess!("ok"));
            }}
            showUploadList={false}
          >
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

        <Form.List name="bedConfigurations">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  style={{ display: "flex", marginBottom: 8, gap: "8px" }}
                >
                  <Form.Item
                    {...restField}
                    name={[name, "bedType"]}
                    rules={[{ required: true, message: "Select bed type" }]}
                  >
                    <Select placeholder="Bed Type">
                      <Option value={0}>Single Bed</Option>
                      <Option value={1}>Queen Size</Option>
                      <Option value={2}>King Size</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "quantity"]}
                    rules={[{ required: true, message: "Enter quantity" }]}
                    style={{ width: "100px" }}
                  >
                    <Input placeholder="Qty" type="number" />
                  </Form.Item>

                  <Button
                    type="link"
                    danger
                    onClick={() => remove(name)}
                    style={{ alignSelf: "center", marginBottom: "24px" }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Bed Type
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item name="amenities" label="Amenities">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Select amenities"
            value={selectedAmenities}
            onChange={handleAmenityChange}
          >
            {amenityOptions.map((a) => (
              <Option key={a.id} value={a.id}>
                <span role="img" aria-label={a.name}>
                  {a.emoji}
                </span>{" "}
                {a.name}
              </Option>
            ))}
          </Select>
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
