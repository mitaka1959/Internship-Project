import React, { useEffect } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Upload,
  message,
  TimePicker,
  Typography,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import api from "../../../../../../../services/axios";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const { Title } = Typography;

const MediaPolicies: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const res = await api.get(`/api/Hotels/${hotelId}`);
        form.setFieldsValue({
          ...res.data,
          checkIn: dayjs(res.data.checkIn, "HH:mm"),
          checkOut: dayjs(res.data.checkOut, "HH:mm"),
        });
      } catch (error) {
        console.error("Failed to load hotel data:", error);
        message.error("Failed to load data.");
      }
    };

    fetchHotelData();
  }, [hotelId, form]);

  const onFinish = async (values: any) => {
    try {
      const dataToSend = {
        ...values,
        checkIn: values.checkIn.format("HH:mm"),
        checkOut: values.checkOut.format("HH:mm"),
      };
      await api.patch(`/api/Hotels/${hotelId}/settings`, dataToSend);
      message.success("Media and policies updated!");
    } catch (error) {
      console.error("Failed to update:", error);
      message.error("Update failed. Please try again.");
    }
  };

  return (
    <div style={{ background: "#fff", padding: "1rem", borderRadius: "8px" }}>
      <Title level={4}>Media & Policies</Title>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="images" label="Upload Images">
          <Upload
            action={`/api/Hotels/${hotelId}/upload-image`}
            listType="picture"
            multiple
            headers={{
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }}
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

export default MediaPolicies;
