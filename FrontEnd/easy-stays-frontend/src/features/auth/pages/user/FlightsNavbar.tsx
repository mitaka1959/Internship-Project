import React from "react";
import { Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import logo from "../../../../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

const FlightsNavbar: React.FC = () => {
  const navigate = useNavigate();
  const route = useLocation();

  const isHotels = route.pathname === "/search";
  const isFlights = route.pathname === "/user/flights";

  return (
    <header
      style={{
        width: "100%",
        background: "#023047",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px 24px",
        position: "relative",
        top: 0,
        left: 0,
        zIndex: 1000,
        height: "130px",
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          height: "120px",
          width: "120px",
          objectFit: "contain",
          marginRight: "auto",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Button
          type="default"
          style={{
            color: "#fff",
            backgroundColor: "#023047",
            border: isHotels ? "2px solid #fff" : "none",
            fontSize: "30px",
            fontWeight: "bold",
            borderRadius: "12px",
            padding: "5px 20px",
            height: "60px",
          }}
          onClick={() => navigate("/search")}
        >
          Hotels
        </Button>

        <Button
          type="default"
          style={{
            color: "#fff",
            backgroundColor: "#023047",
            border: isFlights ? "2px solid #fff" : "none",
            fontSize: "30px",
            fontWeight: "bold",
            borderRadius: "12px",
            padding: "5px 20px",
            height: "60px",
          }}
          onClick={() => navigate("/user/flights")}
        >
          Flights
        </Button>
      </div>

      <Avatar
        size={64}
        icon={<UserOutlined />}
        style={{
          backgroundColor: "#FFB703",
          color: "#000",
          cursor: "pointer",
        }}
        onClick={() => navigate("/user/profile")}
      />
    </header>
  );
};

export default FlightsNavbar;
