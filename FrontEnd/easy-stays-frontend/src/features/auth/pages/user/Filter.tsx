import React from "react";
import { Checkbox, Divider } from "antd";

const FilterComponent = () => {
  return (
    <div
      style={{
        position: "fixed",
        marginLeft: "30px",
        top: "200px",
        left: 0,
        width: "250px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: "16px",
        zIndex: 900,
      }}
    >
      <h3>Your Budget (per night)</h3>
      <div style={{ marginBottom: "12px" }}>
        <input
          type="range"
          min="50"
          max="500"
          step="10"
          style={{ width: "100%" }}
        />
      </div>

      <Divider />

      <h4>Offers</h4>
      <Checkbox>All offers</Checkbox>

      <Divider />

      <h4>Popular Filters</h4>
      <Checkbox>Parking</Checkbox>
      <Checkbox>Excellent: 9+</Checkbox>
      <Checkbox>Hotels</Checkbox>
      <Checkbox>Free cancellation</Checkbox>
      <Checkbox>With breakfast</Checkbox>
      <Checkbox>5 stars</Checkbox>

      <Divider />

      <h4>Amenities</h4>
      <Checkbox>Free WiFi</Checkbox>
      <Checkbox>Non-smoking rooms</Checkbox>
      <Checkbox>Parking</Checkbox>
    </div>
  );
};

export default FilterComponent;
