import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Rate,
  Button,
  Select,
  message,
  Typography,
  Spin,
} from "antd";
import api from "../../../../../../../services/axios";
import { useParams } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const amenityOptions = [
  "WiFi",
  "Parking",
  "Pool",
  "Restaurant",
  "Gym",
  "Spa",
  "Bar",
  "Air Conditioning",
  "Pet Friendly",
  "Laundry",
  "Room Service",
  "24-hour Front Desk",
  "Breakfast Included",
  "Balcony",
  "Kitchenette",
  "Elevator",
  "Non-smoking Rooms",
  "Conference Facilities",
  "Children’s Play Area",
  "Garden",
  "BBQ Facilities",
  "Terrace",
  "Shuttle Service",
  "Family Rooms",
  "Concierge Service",
  "Free Toiletries",
  "Private Bathroom",
  "Hair Dryer",
  "Tea/Coffee Maker",
  "Minibar",
  "Safe Box",
  "TV",
  "Soundproof Rooms",
  "Bicycle Rental",
  "Airport Transfer",
];

const PropertyDetails: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const res = await api.get(`/api/Hotels/get-hotel-info/${hotelId}`);
        const hotelData = {
          ...res.data,
          address: res.data.addressLine,
          amenities: res.data.hotelAmenities.map((ha: any) => ha.amenity.name),
        };
        form.setFieldsValue(hotelData);
      } catch (error) {
        message.error("Failed to load hotel data.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [hotelId, form]);

  const onFinish = async (values: any) => {
    try {
      setSaving(true);
      const updatedAmenities = (values.amenities || []).map((a: any) =>
        typeof a === "string" ? a : a?.value
      );

      const updatedValues = {
        ...values,
        hotelId: hotelId,
        addressLine: values.address,
        amenities: updatedAmenities,
      };

      await api.patch(`/api/Hotels/update/${hotelId}`, updatedValues);
      message.success("Property details updated successfully!");
    } catch (error) {
      message.error("Failed to update hotel details. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Spin
        size="large"
        style={{ display: "block", marginTop: 200, textAlign: "center" }}
      />
    );
  }

  return (
    <div style={{ background: "#fff", padding: "1rem", borderRadius: "8px" }}>
      <Title level={4}>Property Details</Title>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Hotel Name"
          rules={[{ required: true, message: "Please enter the hotel name." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="stars" label="Stars">
          <Rate />
        </Form.Item>

        <Form.Item name="address" label="Address">
          <Input />
        </Form.Item>

        <Form.Item name="city" label="City">
          <Input />
        </Form.Item>

        <Form.Item name="country" label="Country">
          <Input />
        </Form.Item>

        <Form.Item name="hotelType" label="Hotel Type">
          <Select>
            <Option value="Hotel">Hotel</Option>
            <Option value="Hostel">Hostel</Option>
            <Option value="Resort">Resort</Option>
          </Select>
        </Form.Item>

        <Form.Item name="amenities" label="Amenities">
          <Select mode="multiple" placeholder="Select amenities">
            {amenityOptions.map((amenity) => (
              <Select.Option key={amenity} value={amenity}>
                {amenity}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#FB8500", borderColor: "#FB8500" }}
            loading={saving}
            disabled={saving}
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PropertyDetails;
