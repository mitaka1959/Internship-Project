import { Input, Form, Radio, Select, Button, Space } from "antd";
import AntSteps from "./Steps";
import React, { useState } from "react";
import type { ChangeEvent } from "react";
import type { SelectProps } from "antd";

const languageOptions = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Chinese", value: "zh" },
  { label: "Japanese", value: "ja" },
  { label: "Russian", value: "ru" },
  { label: "Arabic", value: "ar" },
  { label: "Portuguese", value: "pt" },
  { label: "Italian", value: "it" },
];

interface Step1Props {
  onNext: () => void;
  onChange: (data: { [key: string]: string }) => void;
}

const BasicInfo: React.FC<Step1Props> = ({ onNext, onChange }) => {
  const [formData, setFormData] = useState({
    hotelName: "",
    hotelType: "",
    addressLine: "",
    city: "",
    country: "",
    description: "",
    languagesSpoken: [],
    email: "",
    phone: "",
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    onChange({ [name]: value });
  };
  const handleChangeLanguage = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  const handleChangeType = (value: string) => {
    console.log(`selected ${value}`);
  };
  const combinedHandleChange = (value: any) => {
    handleChange(value);
    handleChangeLanguage(value);
  };
  const combinedHadnleChangeType = (value: any) => {
    handleChange(value);
    handleChangeType(value);
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      <div>
        <h1>Basic Info</h1>
      </div>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        style={{
          width: "400px",
          backgroundColor: "#FFFFFF",
          padding: "1rem",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form.Item label="Hotel Name">
          <Input
            name="hotelName"
            placeholder="Hotel Name"
            value={formData.hotelName}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Hotel Type">
          <Select
            style={{ width: 120 }}
            onChange={combinedHadnleChangeType}
            options={[
              { value: "hotel", label: "Hotel" },
              { value: "apartament", label: "Apartament" },
              { value: "B&B", label: "B&B" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Address Line">
          <Input
            name="addressLine"
            placeholder="Address Line"
            value={formData.addressLine}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="City">
          <Input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Country">
          <Input
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Description">
          <Input.TextArea
            name="description"
            rows={4}
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Languages Spoken">
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            defaultValue={["English"]}
            onChange={combinedHandleChange}
            options={languageOptions}
          />
        </Form.Item>

        <Form.Item label="Email">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Phone">
          <Input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onNext} style={{ float: "right" }}>
            Next Step
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BasicInfo;
