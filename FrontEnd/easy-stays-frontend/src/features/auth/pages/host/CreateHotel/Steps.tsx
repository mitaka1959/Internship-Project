import React from "react";
import { Steps as AntSteps } from "antd";

const items = [
  { title: "Basic Info" },
  { title: "Room Configuration" },
  { title: "Photos & Media" },
  { title: "Pricing & Availability" },
  { title: "Policies" },
  { title: "Review & Submit" },
];

interface StepsProps {
  currentStep: number;
}

const StepsComponent: React.FC<StepsProps> = ({ currentStep }) => {
  return (
    <div
      style={{
        padding: "1rem",
        width: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AntSteps
        current={currentStep - 1}
        labelPlacement="vertical"
        items={items}
      />
    </div>
  );
};

export default StepsComponent;
