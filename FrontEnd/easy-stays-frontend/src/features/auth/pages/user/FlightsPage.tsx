import React, { useState } from "react";
import FlightsWidget from "./FlightsWidget";
import FlightsNavbar from "./FlightsNavbar";
import {
  Input,
  DatePicker,
  Button,
  Dropdown,
  Menu,
  Radio,
  Checkbox,
  Select,
} from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;
const SingleDatePicker = DatePicker;

const FlightsPage: React.FC = () => {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<dayjs.Dayjs | null>(null);
  const [returnDate, setReturnDate] = useState<dayjs.Dayjs | null>(null);
  const [adults, setAdults] = useState<number>(1);

  const [tripType, setTripType] = useState<string>("round-trip");
  const [cabinClass, setCabinClass] = useState<string>("economy");
  const [directOnly, setDirectOnly] = useState<boolean>(false);

  const [searchTriggered, setSearchTriggered] = useState(false);

  const handleSearch = () => {
    setSearchTriggered(true);
  };

  const guestMenu = (
    <Menu>
      <Menu.Item key="adults">
        Adults:
        <Input
          type="number"
          min={1}
          max={10}
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
          style={{ width: 50, marginLeft: "8px" }}
        />
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <FlightsNavbar />

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <Radio.Group
            value={tripType}
            onChange={(e) => {
              setTripType(e.target.value);
            }}
            style={{ display: "flex", gap: "8px" }}
          >
            <Radio.Button value="round-trip">Round trip</Radio.Button>
            <Radio.Button value="one-way">One way</Radio.Button>
          </Radio.Group>

          <Select
            value={cabinClass}
            onChange={(value) => setCabinClass(value)}
            style={{ width: 180 }}
          >
            <Option value="economy">Economy</Option>
            <Option value="premium-economy">Premium Economy</Option>
            <Option value="business">Business</Option>
            <Option value="first">First</Option>
          </Select>

          <Checkbox
            checked={directOnly}
            onChange={(e) => setDirectOnly(e.target.checked)}
          >
            Direct flights only
          </Checkbox>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#FFB703",
            borderRadius: "8px",
            padding: "8px",
          }}
        >
          <Input
            placeholder="Flying from (city name)"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            style={{
              maxWidth: 200,
              height: "50px",
              borderWidth: "2px",
            }}
          />

          <Input
            placeholder="Flying to (city name)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            style={{
              maxWidth: 200,
              height: "50px",
              borderWidth: "2px",
            }}
          />

          <SingleDatePicker
            value={departureDate ?? undefined}
            onChange={(date) => setDepartureDate(date)}
            style={{
              maxWidth: "200px",
              height: "50px",
              borderWidth: "2px",
            }}
            placeholder="Departure date"
          />

          {tripType === "round-trip" && (
            <SingleDatePicker
              value={returnDate ?? undefined}
              onChange={(date) => setReturnDate(date)}
              style={{
                maxWidth: "200px",
                height: "50px",
                borderWidth: "2px",
              }}
              placeholder="Return date"
            />
          )}

          <Dropdown overlay={guestMenu} trigger={["click"]}>
            <Button style={{ height: "50px" }}>
              {adults} adults <DownOutlined />
            </Button>
          </Dropdown>

          <Button
            icon={
              <SearchOutlined
                style={{ fontWeight: "bolder", fontSize: "large" }}
              />
            }
            style={{
              height: "48px",
              backgroundColor: "#91CAFF",
              color: "#fff",
              fontWeight: "bolder",
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>

      {tripType === "round-trip" && returnDate ? (
        <FlightsWidget
          origin={origin}
          destination={destination}
          departureDate={departureDate?.format("YYYY-MM-DD") || ""}
          returnDate={returnDate.format("YYYY-MM-DD")}
          adults={adults}
          type="round-trip-return"
          searchTriggered={searchTriggered}
          cabinClass={cabinClass}
          directOnly={directOnly}
        />
      ) : (
        <FlightsWidget
          origin={origin}
          destination={destination}
          departureDate={departureDate?.format("YYYY-MM-DD") || ""}
          adults={adults}
          type="one-way"
          searchTriggered={searchTriggered}
          cabinClass={cabinClass}
          directOnly={directOnly}
        />
      )}
    </>
  );
};

export default FlightsPage;
