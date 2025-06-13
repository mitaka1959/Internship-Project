import React from "react";
import { Card, Tag, Divider } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

interface FlightOffer {
  departureAirport: string;
  departureCity: string;
  arrivalAirport: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  isDirect: boolean;
  price: string;
  cabinClass: string;
  airline: string;
  duration: string;
  stopoverAirports: string[];
}

interface FlightCardProps {
  outboundFlight: FlightOffer;
  returnFlight?: FlightOffer;
}

const FlightCard: React.FC<FlightCardProps> = ({
  outboundFlight,
  returnFlight,
}) => {
  const formatFlightRow = (flight: FlightOffer) => {
    const getTime = (dateStr: string) => {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const getDate = (dateStr: string) => {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    };

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#f0f0f0",
              borderRadius: "8px",
              marginRight: "12px",
            }}
          ></div>

          <div
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              marginRight: "16px",
            }}
          >
            {getTime(flight.departureTime)} ({flight.departureAirport}) ·{" "}
            {getDate(flight.departureTime)}
          </div>

          <Divider type="vertical" style={{ height: "32px" }} />

          <Tag
            color={flight.isDirect ? "green" : "orange"}
            style={{ marginLeft: "12px", fontSize: "14px" }}
          >
            {flight.isDirect
              ? "Direct"
              : `${flight.stopoverAirports.length} stop${
                  flight.stopoverAirports.length > 1 ? "s" : ""
                }`}
          </Tag>

          <Divider type="vertical" style={{ height: "32px" }} />

          <div
            style={{ fontWeight: "bold", fontSize: "18px", marginLeft: "16px" }}
          >
            {getTime(flight.arrivalTime)} ({flight.arrivalAirport}) ·{" "}
            {getDate(flight.arrivalTime)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: 12,
        marginBottom: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
      bodyStyle={{ padding: "20px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1 }}>
          {formatFlightRow(outboundFlight)}

          {returnFlight && (
            <>
              <Divider />
              {formatFlightRow(returnFlight)}
            </>
          )}

          <div style={{ marginTop: "12px", fontSize: "14px", color: "#555" }}>
            Airline: {outboundFlight.airline} &nbsp;|&nbsp; Cabin:{" "}
            {outboundFlight.cabinClass}
          </div>
        </div>

        <div
          style={{
            textAlign: "right",
            minWidth: "180px",
            paddingLeft: "16px",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              fontSize: "26px",
              fontWeight: "bold",
              color: "#222",
              marginBottom: "8px",
            }}
          >
            {outboundFlight.price}
          </div>

          <button
            style={{
              padding: "10px 16px",
              backgroundColor: "#006ce4",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </Card>
  );
};

export default FlightCard;
