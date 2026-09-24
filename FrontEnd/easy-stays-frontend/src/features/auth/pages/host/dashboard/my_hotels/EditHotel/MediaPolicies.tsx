import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Upload,
  message,
  TimePicker,
  Typography,
  Popconfirm,
} from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import api from "../../../../../../../services/axios";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const { Title } = Typography;

interface HotelImage {
  id: string;
  imageUrl: string;
}

const MediaPolicies: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [form] = Form.useForm();
  const [hotelImages, setHotelImages] = useState<HotelImage[]>([]);

  const fetchHotelData = async () => {
    try {
      const res = await api.get(`/api/Hotels/get-hotel-info/${hotelId}`);
      const data = res.data;

      setHotelImages(
        data.images?.map((img: any) => ({
          id: img.id,
          imageUrl: img.imageUrl,
        })) || []
      );

      form.setFieldsValue({
        checkIn: data.checkInTime
          ? dayjs(data.checkInTime, "HH:mm:ss")
          : undefined,
        checkOut: data.checkOutTime
          ? dayjs(data.checkOutTime, "HH:mm:ss")
          : undefined,
      });
    } catch (error) {
      console.error("Failed to load hotel data:", error);
      message.error("Failed to load data.");
    }
  };

  useEffect(() => {
    fetchHotelData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelId, form]);

  const handleUpload = async (file: any) => {
    const formData = new FormData();
    formData.append("images", file);

    try {
      await api.post(`/api/Hotels/${hotelId}/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success("Image uploaded successfully!");
      // Re-fetch so the new image carries its DB id (needed for deletion).
      await fetchHotelData();
    } catch (error) {
      console.error("Failed to upload image:", error);
      message.error("Failed to upload image. Please try again.");
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    try {
      await api.delete(`/api/Hotels/images/${imageId}`);
      message.success("Image deleted.");
      setHotelImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (error) {
      console.error("Failed to delete image:", error);
      message.error("Failed to delete image. Please try again.");
    }
  };

  return (
    <div style={{ background: "#fff", padding: "1rem", borderRadius: "8px" }}>
      <Title level={4}>Media & Policies</Title>

      <Form form={form} layout="vertical">
        <Form.Item label="Hotel Images">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "0.5rem",
            }}
          >
            {hotelImages.map((img, index) => (
              <div
                key={img.id}
                style={{ position: "relative", display: "inline-block" }}
              >
                <img
                  src={img.imageUrl}
                  alt={`Hotel ${index}`}
                  style={{
                    width: "100px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    border: "1px solid #f0f0f0",
                  }}
                />
                <Popconfirm
                  title="Delete this image?"
                  okText="Delete"
                  okButtonProps={{ danger: true }}
                  cancelText="Cancel"
                  onConfirm={() => handleDeleteImage(img.id)}
                >
                  <Button
                    type="primary"
                    danger
                    size="small"
                    shape="circle"
                    icon={<DeleteOutlined />}
                    style={{ position: "absolute", top: "-8px", right: "-8px" }}
                  />
                </Popconfirm>
              </div>
            ))}
          </div>
          <Upload
            customRequest={({ file, onSuccess }) => {
              handleUpload(file).then(() => onSuccess!("ok"));
            }}
            showUploadList={false}
            multiple
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="checkIn" label="Check-in Time">
          <TimePicker format="HH:mm" />
        </Form.Item>

        <Form.Item name="checkOut" label="Check-out Time">
          <TimePicker format="HH:mm" />
        </Form.Item>

        <Form.Item name="policies" label="Policies">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default MediaPolicies;
