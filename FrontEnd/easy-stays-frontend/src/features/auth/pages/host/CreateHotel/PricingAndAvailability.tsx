import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PricingAndAvailability: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Pricing and Availability</h1>
    </div>
  );
};

export default PricingAndAvailability;
