import React from "react";
import { useState } from "react";
import { TimePicker, Form, Select, Button } from "antd";
import type { TimePickerProps } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { ChangeEvent } from "react";

dayjs.extend(customParseFormat);

interface Step4Props {
  onPrev: () => void;
  onNext: () => void;
  onChange: (data: Partial<PoliciesFormData>) => void;
  formData: { [key: string]: any };
}

interface PoliciesFormData {
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  policies: string[];
}
const houseRules = [
  "No smoking inside the property.",
  "No parties or events allowed.",
  "Quiet hours from 10:00 PM to 7:00 AM.",
  "Only registered guests are allowed on the premises.",
  "Keep doors and windows locked when leaving the property.",
  "Dispose of garbage properly.",
  "Report any damages immediately.",
  "Do not tamper with smoke detectors or fire safety equipment.",
  "No pets allowed.",
  "Late check-out may incur additional charges.",
  "Use appliances and facilities responsibly.",
  "Swimming pool hours: 8:00 AM – 8:00 PM.",
  "Gym usage is at your own risk.",
];

const Polisies: React.FC<Step4Props> = ({
  onPrev,
  onNext,
  onChange,
  formData,
}) => {
  const [localData, setLocalData] = useState<PoliciesFormData>({
    checkInTime: formData.checkInTime || "",
    checkOutTime: formData.checkOutTime || "",
    cancellationPolicy: formData.cancelationPolicy || "",
    policies: formData.houseRules || [],
  });

  const combinedHandleChangeTime = (
    name: "checkInTime" | "checkOutTime",
    time: dayjs.Dayjs | null,
    timeString: string | string[]
  ) => {
    const safeTime = Array.isArray(timeString) ? timeString[0] : timeString;
    setLocalData({ ...localData, [name]: safeTime });
  };
  const handleSelectChange = (name: keyof PoliciesFormData, value: any) => {
    setLocalData({ ...localData, [name]: value });
  };

  const handleNext = () => {
    onChange(localData);
    onNext();
  };

  const handlePrev = () => {
    onChange(localData);
    onPrev();
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
      <h1>Policies</h1>
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
        <Form.Item label="Check-in Time">
          <TimePicker
            style={{ width: "100%" }}
            onChange={(time, timeString) =>
              combinedHandleChangeTime("checkInTime", time, timeString)
            }
            value={
              localData.checkInTime
                ? dayjs(localData.checkInTime, "HH:mm:ss")
                : undefined
            }
            format="HH:mm:ss"
          />
        </Form.Item>

        <Form.Item label="Check-out Time">
          <TimePicker
            style={{ width: "100%" }}
            onChange={(time, timeString) =>
              combinedHandleChangeTime("checkOutTime", time, timeString)
            }
            value={
              localData.checkOutTime
                ? dayjs(localData.checkOutTime, "HH:mm:ss")
                : undefined
            }
            format="HH:mm:ss"
          />
        </Form.Item>

        <Form.Item label="Cancelation Policy">
          <Select
            placeholder="Select Cancelation Policy"
            style={{ width: "100%" }}
            value={localData.cancellationPolicy}
            onChange={(value) =>
              handleSelectChange("cancellationPolicy", value)
            }
            options={[
              {
                value: "Flexible",
                label: "Full refund up to 1 day before check-in.",
              },
              {
                value: "Moderate",
                label: "Full refund up to 5 days before check-in.",
              },
              { value: "Strict", label: "Non-refundable or minimal refund." },
            ]}
          />
        </Form.Item>

        <Form.Item label="Policies">
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Policies"
            value={localData.policies}
            onChange={(value) => handleSelectChange("policies", value)}
            options={houseRules.map((rule) => ({ label: rule, value: rule }))}
          />
        </Form.Item>

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
      </Form>
    </div>
  );
};

export default Polisies;
