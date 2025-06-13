import React from "react";

const FlightsNavbar: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        background: "#003580",
        display: "flex",
        alignItems: "center",
        padding: "8px 24px",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "16px",
      }}
    >
      <div
        style={{
          marginRight: "24px",
          cursor: "pointer",
          marginLeft: "420px",
          marginTop: "40px",
        }}
      >
        Flights
      </div>
      <div
        style={{ marginRight: "24px", cursor: "pointer", marginTop: "40px" }}
      >
        Hotels
      </div>
      <div
        style={{ marginRight: "24px", cursor: "pointer", marginTop: "40px" }}
      >
        Flight + Hotel
      </div>
      <div
        style={{ marginRight: "24px", cursor: "pointer", marginTop: "40px" }}
      >
        Car Rentals
      </div>
      <div
        style={{ marginRight: "24px", cursor: "pointer", marginTop: "40px" }}
      >
        Attractions
      </div>
      <div
        style={{ marginRight: "24px", cursor: "pointer", marginTop: "40px" }}
      >
        Airport Taxis
      </div>
    </div>
  );
};

export default FlightsNavbar;
