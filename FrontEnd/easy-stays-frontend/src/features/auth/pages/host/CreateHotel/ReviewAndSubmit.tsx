import React from "react";

import { useNavigate, useLocation } from "react-router-dom";

const ReviewAndSubmit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Review and Submit</h1>
    </div>
  );
};

export default ReviewAndSubmit;
