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

const RoomEditPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [form] = Form.useForm();
  const [roomImages, setRoomImages] = useState<string[]>([]);
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
          displayName: roomData.displayName,
          description: roomData.description,
          price: roomData.pricePerNight,
          Quantity: roomData.roomCount,
          amenities: roomData.amenities?.map((a: any) => a.amenity.name) || [],
          bedConfigurations:
            roomData.bedConfigurations?.map((b: any) => ({
              bedType: b.bedType,
              quantity: b.quantity,
            })) || [],
        });

        setRoomImages(roomData.images?.map((img: any) => img.imageUrl) || []);

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
    const payload = {
      roomId,
      displayName: values.displayName,
      description: values.description,
      capacity: Number(values.capacity),
      pricePerNight: Number(values.price),
      roomCount: Number(values.Quantity),
      amenityIds: values.amenities,
      bedConfigurations: values.bedConfigurations || [],
    };
    console.log(payload);

    try {
      await api.patch(`/api/Hotels/update-room/${roomId}`, payload);
      message.success("Room details updated!");
    } catch (error) {
      console.error("Failed to update room:", error);
      message.error("Failed to update room details. Please try again.");
    }
  };

  const convertBedType = (bedType: string) => {
    switch (bedType) {
      case "King":
        return "kingSizeBed";
      case "Queen":
        return "queenSizeBed";
      case "Twin":
        return "singleBed";
      default:
        return "singleBed";
    }
  };

  const handleAmenityChange = (value: any) => {
    console.log("Selected amenities:", value);
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
          <Select>
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
