import React from "react";
import { Card, Tag, Divider } from "antd";
import type FlightCard from "./FlightCard";

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

interface RoundTripCardProps {
  outboundFlight: FlightOffer;
  returnFlight: FlightOffer;
}

const FlightCardRoundTrip: React.FC<RoundTripCardProps> = ({
  outboundFlight,
  returnFlight,
}) => {
  const formatTime = (datetime: string) =>
    new Date(datetime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  function formatDuration(duration: string): string {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);

    if (!match) return duration;

    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;

    if (hours && minutes) return `${hours}h ${minutes}m`;
    if (hours) return `${hours}h`;
    if (minutes) return `${minutes}m`;

    return "0m";
  }

  const formatDate = (datetime: string) =>
    new Date(datetime).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const renderFlightInfo = (
    flight: FlightOffer,
    directionLabel: string,
    showPrice: boolean = false
  ) => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        marginBottom: "16px",
      }}
    >
      <div>
        <div
          style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "4px" }}
        >
          {directionLabel}
        </div>
        <div style={{ fontSize: "16px" }}>
          {formatDate(flight.departureTime)} |{" "}
          {formatTime(flight.departureTime)} → {formatTime(flight.arrivalTime)}
        </div>
        <div style={{ fontSize: "14px", color: "#555" }}>
          {flight.airline.toUpperCase()}, {flight.cabinClass.toUpperCase()},
          {"     "}
          <span>{formatDuration(flight.duration)}</span>
        </div>
        <Tag
          color={flight.isDirect ? "green" : "orange"}
          style={{ marginTop: 4 }}
        >
          {flight.isDirect
            ? "Direct"
            : `${flight.stopoverAirports.length} stop${
                flight.stopoverAirports.length > 1 ? "s" : ""
              }`}
        </Tag>
        {!flight.isDirect && flight.stopoverAirports.length > 0 && (
          <div style={{ fontSize: "14px", color: "#888", marginTop: "4px" }}>
            Stopover(s): {flight.stopoverAirports.join(", ")}
          </div>
        )}
      </div>

      {showPrice && (
        <div
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#222",
            marginTop: "80px",
            marginRight: "20px",
          }}
        >
          Total Price: {outboundFlight.price}
        </div>
      )}
    </div>
  );

  return (
    <Card
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: 12,
        marginBottom: "40px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        width: "90%",
        marginLeft: "5%",
      }}
      bodyStyle={{ padding: "20px" }}
    >
      {renderFlightInfo(
        outboundFlight,
        `${outboundFlight.departureCity} → ${outboundFlight.arrivalCity}`
      )}
      <Divider />
      {renderFlightInfo(
        returnFlight,
        `${returnFlight.departureCity} → ${returnFlight.arrivalCity}`,
        true
      )}
    </Card>
  );
};

export default FlightCardRoundTrip;
