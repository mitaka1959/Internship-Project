import React from "react";
import { Button, Collapse, Descriptions, Image, List, Tag } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Panel } = Collapse;

interface ReviewAndSubmitProps {
  formData: { [key: string]: any };
  onPrev: () => void;
  onSubmit: () => void;
  onChange: (data: { [key: string]: any }) => void;
}

const ReviewAndSubmit: React.FC<ReviewAndSubmitProps> = ({
  formData,
  onPrev,
  onSubmit,
  onChange,
}) => {
  const renderDescriptions = (data: { [key: string]: any }) => (
    <Descriptions column={1} bordered>
      {Object.entries(data).map(([key, value]) => (
        <Descriptions.Item label={key} key={key}>
          {Array.isArray(value)
            ? value
                .map((item, idx) =>
                  typeof item === "object" ? JSON.stringify(item) : item
                )
                .join(", ")
            : value?.toString()}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
  const navigate = useNavigate();

  const submitHotel = async () => {
    try {
      const hotelPayload = {
        ownerId: "4b1be523-8d4c-4655-994f-28e751639d27",
        name: formData.hotelName,
        hotelType: formData.hotelType,
        description: formData.description,
        addressLine: formData.addressLine,
        city: formData.city,
        country: formData.country,
        stars: formData.stars,
        contactEmail: formData.email,
        contactPhone: formData.phone,
        checkInTime: formData.checkInTime,
        checkOutTime: formData.checkOutTime,
        cancelationPolicy: formData.cancelationPolicy,
        houseRules: formData.houseRules,
        languages: formData.languagesSpoken,
        roomGroups: formData.roomGroups,
      };

      const res = await axios.post(
        "http://localhost:5067/api/Hotels",
        hotelPayload
      );
      const hotelId = res.data;

      const imageForm = new FormData();
      imageForm.append("HotelId", hotelId);

      for (const file of formData.images) {
        const byteString = atob(file.url.split(",")[1]);
        const mimeString = file.url.split(",")[0].split(":")[1].split(";")[0];

        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([ab], { type: mimeString });
        imageForm.append("Images", blob, file.name);
      }

      await axios.post(
        `http://localhost:5067/api/Hotels/${hotelId}/images`,
        imageForm,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Hotel and images submitted successfully!");
      navigate("/host/my_hotels");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit hotel.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Review & Submit</h1>
      <Collapse
        accordion
        style={{ maxWidth: "600px", margin: "2rem auto", textAlign: "left" }}
      >
        <Panel header="Basic Info" key="1">
          {renderDescriptions({
            hotelName: formData.hotelName,
            stars: formData.stars,
            addressLine: formData.addressLine,
            city: formData.city,
            country: formData.country,
            description: formData.description,
            languagesSpoken: formData.languagesSpoken?.join(", "),
            email: formData.email,
            phone: formData.phone,
          })}
        </Panel>

        <Panel header="Room Configuration" key="2">
          {formData.roomGroups?.map((group: any, index: number) => (
            <div
              key={index}
              style={{
                marginBottom: "1rem",
                border: "1px solid #ddd",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <h4>Room Group {index + 1}</h4>
              <label>Room Type:</label>
              <input
                type="text"
                value={group.roomType}
                onChange={(e) => {
                  const updatedGroups = [...formData.roomGroups];
                  updatedGroups[index].roomType = e.target.value;
                  onChange({ roomGroups: updatedGroups });
                }}
                style={{ width: "100%", marginBottom: "0.5rem" }}
              />

              <label>Display Name:</label>
              <input
                type="text"
                value={group.displayName}
                onChange={(e) => {
                  const updatedGroups = [...formData.roomGroups];
                  updatedGroups[index].displayName = e.target.value;
                  onChange({ roomGroups: updatedGroups });
                }}
                style={{ width: "100%", marginBottom: "0.5rem" }}
              />

              <label>Room Quantity:</label>
              <input
                type="number"
                value={group.roomQuantity}
                onChange={(e) => {
                  const updatedGroups = [...formData.roomGroups];
                  updatedGroups[index].roomQuantity = Number(e.target.value);
                  onChange({ roomGroups: updatedGroups });
                }}
                style={{ width: "100%", marginBottom: "0.5rem" }}
              />

              <label>Max Guests:</label>
              <input
                type="number"
                value={group.maxGuests}
                onChange={(e) => {
                  const updatedGroups = [...formData.roomGroups];
                  updatedGroups[index].maxGuests = Number(e.target.value);
                  onChange({ roomGroups: updatedGroups });
                }}
                style={{ width: "100%", marginBottom: "0.5rem" }}
              />

              <label>Room Size:</label>
              <input
                type="number"
                value={group.roomSize}
                onChange={(e) => {
                  const updatedGroups = [...formData.roomGroups];
                  updatedGroups[index].roomSize = Number(e.target.value);
                  onChange({ roomGroups: updatedGroups });
                }}
                style={{ width: "100%", marginBottom: "0.5rem" }}
              />

              <label>Price Per Night:</label>
              <input
                type="number"
                value={group.pricePerNight}
                onChange={(e) => {
                  const updatedGroups = [...formData.roomGroups];
                  updatedGroups[index].pricePerNight = Number(e.target.value);
                  onChange({ roomGroups: updatedGroups });
                }}
                style={{ width: "100%", marginBottom: "0.5rem" }}
              />

              <label>Description:</label>
              <textarea
                value={group.description}
                onChange={(e) => {
                  const updatedGroups = [...formData.roomGroups];
                  updatedGroups[index].description = e.target.value;
                  onChange({ roomGroups: updatedGroups });
                }}
                style={{ width: "100%", marginBottom: "1rem" }}
              />
            </div>
          ))}
        </Panel>

        <Panel header="Photos & Media" key="3">
          {formData.images && formData.images.length > 0 ? (
            <Image.PreviewGroup>
              <List
                itemLayout="horizontal"
                dataSource={formData.images}
                renderItem={(image: any) => (
                  <List.Item>
                    <List.Item.Meta
                      title={image.name}
                      description={
                        <Image
                          src={image.url || "/placeholder-image.png"}
                          alt={image.name}
                          width={100}
                          style={{ borderRadius: "8px", cursor: "pointer" }}
                        />
                      }
                    />
                  </List.Item>
                )}
              />
            </Image.PreviewGroup>
          ) : (
            <p>No images uploaded.</p>
          )}
        </Panel>

        <Panel header="Policies" key="4">
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Check-In Time">
              {formData.checkInTime || "Not specified"}
            </Descriptions.Item>
            <Descriptions.Item label="Check-Out Time">
              {formData.checkOutTime || "Not specified"}
            </Descriptions.Item>
            <Descriptions.Item label="Cancellation Policy">
              {formData.cancelationPolicy || "Not specified"}
            </Descriptions.Item>
            <Descriptions.Item label="House Rules">
              {formData.houseRules && formData.houseRules.length > 0
                ? formData.houseRules.map((rule: string, index: number) => (
                    <Tag
                      closable
                      color="blue"
                      key={index}
                      onClose={() => {
                        const updatedRules = formData.houseRules.filter(
                          (_: string, i: number) => i !== index
                        );
                        onChange({ houseRules: updatedRules });
                      }}
                    >
                      {rule}
                    </Tag>
                  ))
                : "No house rules specified"}
            </Descriptions.Item>
          </Descriptions>
        </Panel>
      </Collapse>

      <div style={{ marginTop: "1.5rem" }}>
        <Button onClick={onPrev} style={{ marginRight: "1rem" }}>
          Back
        </Button>
        <Button type="primary" onClick={submitHotel}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ReviewAndSubmit;
