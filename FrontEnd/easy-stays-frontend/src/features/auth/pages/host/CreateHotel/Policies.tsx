import React from "react";

import { useNavigate, useLocation } from "react-router-dom";

const PhotosAndMedia: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Photos and Media</h1>
    </div>
  );
};

export default PhotosAndMedia;
