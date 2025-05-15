import React from "react";
import { Steps as AntSteps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const stepLinks = [
  "/host/create-hotel/basic-info",
  "/host/create-hotel/room-configuration",
  "/host/create-hotel/photos-and-media",
  "/host/create-hotel/pricing-and-availability",
  "/host/create-hotel/policies",
  "/host/create-hotel/review-and-submit",
];

const items = [
  { title: "Basic Info" },
  { title: "Room Configuration" },
  { title: "Photos & Media" },
  { title: "Pricing & Availability" },
  { title: "Policies" },
  { title: "Review & Submit" },
];

const StepsComponent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentStep = stepLinks.findIndex((path) => location.pathname === path);

  const handleStepChange = (targetStep: number) => {
    if (targetStep <= currentStep) {
      navigate(stepLinks[targetStep]);
    }
  };

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
        current={currentStep >= 0 ? currentStep : 0}
        labelPlacement="vertical"
        onChange={handleStepChange}
        items={items}
      />
    </div>
  );
};

export default StepsComponent;
