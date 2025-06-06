import React, { useState } from "react";
import { Input, DatePicker, Button, Dropdown, Menu } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import logo from "../../../../assets/logo.png";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

type SearchBarProps = {
  onSearch: (params: any) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [location, setLocation] = useState<string>("");
  const [dates, setDates] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [rooms, setRooms] = useState<number>(1);

  const handleSearch = () => {
    const searchParams = {
      destination: location,
      dates: dates
        ? [dates[0].format("YYYY-MM-DD"), dates[1].format("YYYY-MM-DD")]
        : null,
      adults,
      children,
      rooms,
    };
    onSearch(searchParams);
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
      <Menu.Item key="children">
        Children:
        <Input
          type="number"
          min={0}
          max={10}
          value={children}
          onChange={(e) => setChildren(Number(e.target.value))}
          style={{ width: 50, marginLeft: "8px" }}
        />
      </Menu.Item>
      <Menu.Item key="rooms">
        Rooms:
        <Input
          type="number"
          min={1}
          max={10}
          value={rooms}
          onChange={(e) => setRooms(Number(e.target.value))}
          style={{ width: 50, marginLeft: "8px" }}
        />
      </Menu.Item>
    </Menu>
  );

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
        marginBottom: "-150px",
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
          position: "absolute",
          top: "100%",
          transform: "translateY(-50%)",
          background: "#FFB703",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "5px",
          width: "70%",
        }}
      >
        <Input
          placeholder="Where are you going?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{
            maxWidth: 422,
            height: "50px",
            borderWidth: "2px",
          }}
        />

        <RangePicker
          onChange={(dates) => setDates(dates as [dayjs.Dayjs, dayjs.Dayjs])}
          style={{
            maxWidth: "330px",
            height: "50px",
            borderWidth: "2px",
          }}
        />

        <Dropdown overlay={guestMenu} trigger={["click"]}>
          <Button style={{ height: "50px" }}>
            {adults} adults · {children} children · {rooms} rooms{" "}
            <DownOutlined />
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

      <Avatar
        size={64}
        icon={<UserOutlined />}
        style={{ backgroundColor: "#FFB703", color: "#000" }}
      />
    </header>
  );
};

export default SearchBar;
