import { Input, Form, Select, Button, Rate } from "antd";
import React, { useState } from "react";
import type { ChangeEvent } from "react";

const languageOptions = [
  { label: "English", value: "English" },
  { label: "Bulgarian", value: "Bulgarian" },
  { label: "Spanish", value: "Spanish" },
  { label: "French", value: "French" },
  { label: "German", value: "German" },
  { label: "Chinese", value: "Chinese" },
  { label: "Japanese", value: "Japanese" },
  { label: "Russian", value: "Russian" },
  { label: "Arabic", value: "Arabic" },
  { label: "Portuguese", value: "Portuguese" },
  { label: "Italian", value: "Italian" },
  { label: "Dutch", value: "Dutch" },
  { label: "Greek", value: "Greek" },
  { label: "Turkish", value: "Turkish" },
  { label: "Korean", value: "Korean" },
  { label: "Hindi", value: "Hindi" },
  { label: "Polish", value: "Polish" },
  { label: "Swedish", value: "Swedish" },
  { label: "Norwegian", value: "Norwegian" },
  { label: "Danish", value: "Danish" },
  { label: "Finnish", value: "Finnish" },
];

interface Step1Props {
  onNext: () => void;
  onChange: (data: { [key: string]: any }) => void;
  formData: { [key: string]: any };
}

const BasicInfo: React.FC<Step1Props> = ({ onNext, onChange, formData }) => {
  const [localData, setLocalData] = useState({
    hotelName: formData.hotelName || "",
    hotelType: formData.hotelType || "",
    stars: formData.stars || 0,
    addressLine: formData.addressLine || "",
    city: formData.city || "",
    country: formData.country || "",
    description: formData.description || "",
    languagesSpoken: formData.languagesSpoken || [],
    email: formData.email || "",
    phone: formData.phone || "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLocalData({ ...localData, [name]: value });
  };

  const handleSelectChange = (name: string, value: any) => {
    setLocalData({ ...localData, [name]: value });
  };

  const handleNext = () => {
    onChange(localData);
    onNext();
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
      <h1>Basic Info</h1>
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
            value={localData.hotelName}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Hotel Type">
          <Select
            value={localData.hotelType}
            onChange={(value) => handleSelectChange("hotelType", value)}
            options={[
              { value: "hotel", label: "Hotel" },
              { value: "apartament", label: "Apartament" },
              { value: "B&B", label: "B&B" },
            ]}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Stars">
          <Rate
            value={localData.stars}
            onChange={(value) => handleSelectChange("stars", value)}
          />
        </Form.Item>

        <Form.Item label="Address Line">
          <Input
            name="addressLine"
            placeholder="Address Line"
            value={localData.addressLine}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="City">
          <Input
            name="city"
            placeholder="City"
            value={localData.city}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Country">
          <Input
            name="country"
            placeholder="Country"
            value={localData.country}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Description">
          <Input.TextArea
            name="description"
            rows={4}
            placeholder="Description"
            value={localData.description}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Languages Spoken">
          <Select
            mode="multiple"
            allowClear
            placeholder="Please select"
            value={localData.languagesSpoken}
            onChange={(value) => handleSelectChange("languagesSpoken", value)}
            options={languageOptions}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Email">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={localData.email}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Phone">
          <Input
            name="phone"
            placeholder="Phone"
            value={localData.phone}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            onClick={handleNext}
            style={{ float: "right" }}
          >
            Next Step
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BasicInfo;
