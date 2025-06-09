import React, { useState, useEffect } from "react";
import { Route, useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Divider,
  Button,
  Image,
  Rate,
  Tag,
  Row,
  Col,
  Spin,
  Table,
  Radio,
  InputNumber,
} from "antd";
import { HeartOutlined } from "@ant-design/icons";
import HotelGalleryModal from "../user/ImageGallery";
import SearchBar from "./SearchBar";
import api from "../../../../services/axios";
import dayjs, { Dayjs } from "dayjs";

const { Title, Paragraph } = Typography;

export type BedTypeQuantity = {
  bedType: string;
  quantity: number;
};

export type HotelType = {
  hotelId: string;
  name: string;
  location: string;
  imageUrl: string | null;
  roomId: string;
  roomName: string;
  bedTypes: BedTypeQuantity[];
  quantity: number;
  price: number;
  stars: number;
};

const HotelPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    matchedRoomId,
    matchedRoomQuantity,
    dates: initialDates,
  } = location.state || {};
  const [dates, setDates] = useState<[Dayjs, Dayjs] | null>(
    initialDates ? [dayjs(initialDates[0]), dayjs(initialDates[1])] : null
  );

  const [hotel, setHotel] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedRoomQuantities, setSelectedRoomQuantities] = useState<{
    [roomId: string]: number;
  }>({});

  const numberOfNights =
    dates && dates.length === 2
      ? dayjs(dates[1]).diff(dayjs(dates[0]), "day")
      : 1;

  const handleSearch = async (params: any) => {
    try {
      const res = await api.post("api/Hotels/available-hotels", params);
      const hotels = res.data;

      setOriginalHotels(hotels);
      setFilteredHotels(hotels);

      const prices = hotels.map((h: HotelType) => h.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setMinPrice(min);
      setMaxPrice(max);
      setBudgetRange([min, max]);
      setMaxStars(5);
      navigate("/search");
    } catch (error) {
      console.error("Failed to search hotels:", error);
    }
  };

  const [originalHotels, setOriginalHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [budgetRange, setBudgetRange] = useState<[number, number]>([0, 1000]);
  const [maxStars, setMaxStars] = useState<number>(0);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await api.get(`/api/hotels/page/${id}`);
        setHotel(res.data);
      } catch (err) {
        console.error("Failed to load hotel:", err);
      }
    };

    fetchHotel();
  }, [id]);

  useEffect(() => {
    if (hotel) {
      setSelectedRoomId(matchedRoomId || null);
      const initialQuantities: { [roomId: string]: number } = {};
      hotel.rooms.forEach((room: any) => {
        initialQuantities[room.id] =
          room.id === matchedRoomId ? matchedRoomQuantity || 1 : 0;
      });
      setSelectedRoomQuantities(initialQuantities);
    }
  }, [hotel, matchedRoomId, matchedRoomQuantity]);

  if (!hotel) {
    return (
      <Spin
        size="large"
        style={{ display: "block", marginTop: 200, textAlign: "center" }}
      />
    );
  }

  const selectedQuantity = selectedRoomId
    ? selectedRoomQuantities[selectedRoomId] || 0
    : 0;

  const totalPrice = selectedRoomId
    ? hotel.rooms.find((r: any) => r.id === selectedRoomId)?.pricePerNight *
      selectedQuantity *
      numberOfNights
    : 0;

  const roomColumns = [
    {
      title: "Room Name",
      dataIndex: "displayName",
      key: "name",
      render: (text: string, record: any) => (
        <strong
          style={{
            color: record.id === hotel.matchedRoomId ? "#FFB703" : undefined,
          }}
        >
          {text}
        </strong>
      ),
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      render: (_: any, record: any) => <span>{record.capacity}</span>,
    },
    {
      title: "Amenities",
      dataIndex: "amenities",
      key: "amenities",
      render: (amenities: string[]) =>
        amenities
          ?.filter((a) => a)
          .map((amenity, idx) => (
            <Tag key={idx} color="geekblue">
              {amenity}
            </Tag>
          )),
    },
    {
      title: "How Many Rooms",
      key: "howManyRooms",
      render: (_: any, record: any) => (
        <div>
          <InputNumber
            min={1}
            max={10}
            value={selectedRoomQuantities[record.id] || 1}
            onChange={(value) => {
              setSelectedRoomQuantities((prev) => ({
                ...prev,
                [record.id]: value ?? 1,
              }));
            }}
          />
        </div>
      ),
    },
    {
      title: "Total Price",
      key: "totalPrice",
      render: (_: any, record: any) => {
        const quantity = selectedRoomQuantities[record.id] || 0;
        const totalPrice = record.pricePerNight * quantity * numberOfNights;
        return `$${totalPrice}`;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Radio
          checked={selectedRoomId === record.id}
          onChange={() => setSelectedRoomId(record.id)}
        >
          Select
        </Radio>
      ),
    },
  ];
  const roomGroups = hotel.rooms?.map((room: any) => ({
    roomName: room.displayName,
    images: room.images || [],
  }));

  const handleClick = () => {
    if (!selectedRoomId || !dates) {
      console.warn("Please select a room and dates first.");
      return;
    }

    const selectedRoom = hotel.rooms.find((r: any) => r.id === selectedRoomId);
    const selectedRoomQuantity = selectedRoomQuantities[selectedRoomId] || 1;

    navigate("/reservation", {
      state: {
        hotelId: hotel.id,
        hotelName: hotel.name,
        country: hotel.country,
        city: hotel.city,
        address: hotel.address,
        roomId: selectedRoomId,
        roomName: selectedRoom?.displayName || "",
        roomQuantity: selectedRoomQuantity,
        dates: [dates[0].format("YYYY-MM-DD"), dates[1].format("YYYY-MM-DD")],
        pricePerNight: selectedRoom?.pricePerNight || 0,
      },
    });
  };

  return (
    <div style={{ backgroundColor: "#eeeeee" }}>
      <SearchBar onSearch={handleSearch} dates={dates} setDates={setDates} />

      <div
        style={{
          marginTop: "230px",
          maxWidth: "1200px",
          marginBottom: "0px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "20px",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2}>{hotel.name}</Title>
            <Rate disabled value={hotel.stars} style={{ marginTop: "-20px" }} />
            <Paragraph style={{ color: "#555" }}>
              {hotel.city}, {hotel.country}
            </Paragraph>
          </Col>
          <Col>
            <Button icon={<HeartOutlined />} type="default">
              Save
            </Button>
          </Col>
        </Row>

        <Divider />

        <div
          onClick={() => setIsModalVisible(true)}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "8px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              gridRow: "1 / span 2",
              overflow: "hidden",
              borderRadius: "8px",
            }}
          >
            <Image
              src={hotel.images[0]}
              alt="Main Hotel"
              width="100%"
              height="100%"
              style={{
                objectFit: "cover",
                borderRadius: "8px",
                transition: "filter 0.3s ease",
              }}
              preview={false}
              onMouseEnter={(e) =>
                ((e.target as HTMLImageElement).style.filter =
                  "brightness(85%)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLImageElement).style.filter =
                  "brightness(100%)")
              }
            />
          </div>

          {hotel.images.slice(1, 5).map((img: string, index: number) => (
            <div
              key={index}
              style={{ overflow: "hidden", borderRadius: "8px" }}
            >
              <Image
                src={img}
                alt={`Hotel ${index + 1}`}
                width="100%"
                height="100%"
                style={{
                  objectFit: "cover",
                  borderRadius: "8px",
                  transition: "filter 0.3s ease",
                }}
                preview={false}
                onMouseEnter={(e) =>
                  ((e.target as HTMLImageElement).style.filter =
                    "brightness(85%)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLImageElement).style.filter =
                    "brightness(100%)")
                }
              />
            </div>
          ))}
        </div>

        {isModalVisible && (
          <HotelGalleryModal
            isModalVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            hotelImages={hotel.images}
            roomGroups={roomGroups}
          />
        )}

        <Row
          justify="space-between"
          gutter={[16, 16]}
          style={{ marginBottom: "20px" }}
        >
          <Col xs={24} md={14}>
            <Title level={4}>About this hotel</Title>
            <Paragraph style={{ color: "#555" }}>{hotel.description}</Paragraph>
            {hotel.specialNote && <Tag color="red">{hotel.specialNote}</Tag>}
          </Col>
          <Col xs={24} md={8} style={{ textAlign: "right" }}>
            <Title level={4} style={{ margin: 0 }}>
              USD ${hotel.price}
            </Title>
            {totalPrice && <Paragraph delete>USD ${totalPrice}</Paragraph>}

            <div style={{ marginTop: "10px" }}>
              <Button type="primary" size="large" onClick={handleClick}>
                Reserve
              </Button>
            </div>
          </Col>
        </Row>

        <Divider />
        <Title level={4}>Facilities</Title>
        <Row gutter={[16, 16]}>
          {hotel.amenities?.map((amenity: string, idx: number) => (
            <Col key={idx}>
              <Tag>{amenity}</Tag>
            </Col>
          ))}
        </Row>

        <Divider />
        <Title level={4}>Check-in & Check-out</Title>
        <Paragraph style={{ color: "#555" }}>
          Check-in: From {hotel.checkInTime}
          <br />
          Check-out: Until {hotel.checkOutTime}
        </Paragraph>
        <Divider />
        <Title level={4}>Rooms Available</Title>
        <Table rowKey="id" columns={roomColumns} dataSource={hotel.rooms} />
      </div>
    </div>
  );
};

export default HotelPage;
