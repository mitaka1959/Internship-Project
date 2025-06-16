import React, { useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import api from "../../../../services/axios";
import FlightCard from "./FlightCard";
import FlightCardRoundTrip from "./FlightCardRoundTrip";

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

interface FlightsWidgetProps {
  origin: string;
  destination: string;
  departureDate: string;
  adults: number;
  type?: string;
  searchTriggered: boolean;
  cabinClass: string;
  directOnly: boolean;
  returnDate?: string;
}

const FlightsWidget: React.FC<FlightsWidgetProps> = ({
  origin,
  destination,
  departureDate,
  adults,
  type,
  searchTriggered,
  cabinClass,
  directOnly,
  returnDate,
}) => {
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [returnFlights, setReturnFlights] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFlights = async (
    originCode: string,
    destinationCode: string,
    date: string,
    setter: React.Dispatch<React.SetStateAction<FlightOffer[]>>
  ) => {
    try {
      const response = await api.get("/api/Flights", {
        params: {
          origin: originCode,
          destination: destinationCode,
          departureDate: date,
          adults,
        },
      });

      const flightOffers = Array.isArray(response.data)
        ? response.data
        : response.data?.data ?? [];

      const filtered = flightOffers.filter((flight: FlightOffer) => {
        const directMatch = directOnly ? flight.isDirect : true;
        const cabinMatch = cabinClass
          ? flight.cabinClass.toLowerCase() === cabinClass.toLowerCase()
          : true;
        return directMatch && cabinMatch;
      });

      setter(filtered);
    } catch (err) {
      setError("Failed to fetch flights.");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      await fetchFlights(origin, destination, departureDate, setFlights);

      if (type === "round-trip-return" && returnDate) {
        await fetchFlights(destination, origin, returnDate, setReturnFlights);
      } else {
        setReturnFlights([]);
      }

      setLoading(false);
    };

    if (searchTriggered && origin && destination && departureDate) {
      loadData();
    } else {
      setFlights([]);
      setReturnFlights([]);
    }
  }, [
    origin,
    destination,
    departureDate,
    adults,
    searchTriggered,
    type,
    returnDate,
    cabinClass,
    directOnly,
  ]);

  return (
    <div className="p-4 bg-white shadow rounded mb-6">
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px 0",
          }}
        >
          <Spin size="large" />
        </div>
      )}

      {error && <Alert message={error} type="error" showIcon />}
      {!loading && !error && flights.length === 0 && searchTriggered && (
        <p style={{ textAlign: "center" }}>
          No flights found. Please adjust your search and try again.
        </p>
      )}

      {!loading && !error && flights.length > 0 && (
        <div>
          {type?.startsWith("round-trip") && returnFlights.length > 0
            ? flights.map((outboundFlight, index) => {
                const returnFlight = returnFlights[index];
                return returnFlight ? (
                  <FlightCardRoundTrip
                    key={index}
                    outboundFlight={outboundFlight}
                    returnFlight={returnFlight}
                  />
                ) : (
                  <FlightCard key={index} outboundFlight={outboundFlight} />
                );
              })
            : flights.map((outboundFlight, index) => (
                <FlightCard key={index} outboundFlight={outboundFlight} />
              ))}
        </div>
      )}
    </div>
  );
};

export default FlightsWidget;
