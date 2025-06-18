import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Button, Rate, Tag, Progress } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Sidebar from "../sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import api from "../../../../../../services/axios";
import { Popconfirm, message } from "antd";

const { Title, Text } = Typography;

interface HotelImage {
  url: string;
}

interface Hotel {
  id: string;
  name: string;
  stars: number;
  IsActive: boolean;
  availableRooms: number;
  TotalRooms: number;
  totalRooms: number;
  images: { imageUrl: string }[];
}

const MyHotels: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await api.get("/api/Hotels/my-hotels");
        console.log(res);
        setHotels(res.data);
      } catch (error) {
        console.error("Failed to fetch hotels", error);
      }
    };

    fetchHotels();
  }, []);

  const handleDeleteHotel = async (hotelId: string) => {
    try {
      await api.patch(`/api/Hotels/${hotelId}/delete`);
      message.success("Hotel deleted successfully!");
      setHotels((prevHotels) =>
        prevHotels.filter((hotel) => hotel.id !== hotelId)
      );
    } catch (error) {
      console.error("Failed to delete hotel", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div
        style={{
          marginLeft: 220,
          padding: "2rem",
          width: "100%",
          backgroundColor: "#eeeeee",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <Title level={2} style={{ color: "#023047", margin: 0 }}>
            My Hotels
          </Title>
          <Button
            onClick={() => navigate("/host/create-hotel/create-hotel")}
            type="primary"
            style={{ backgroundColor: "#FB8500", borderColor: "#FB8500" }}
          >
            + Add New Hotel
          </Button>
        </div>

        <Row gutter={[0, 25]} style={{ justifyContent: "left" }}>
          {hotels.map((hotel) => (
            <Col xs={24} md={20} key={hotel.id}>
              <Card
                hoverable
                style={{
                  display: "flex",
                  borderRadius: "10px",
                  height: "200px",
                  padding: "0",
                  overflow: "hidden",
                  width: "120%",
                }}
                bodyStyle={{
                  display: "flex",
                  width: "100%",
                  padding: 0,
                  justifyContent: "left",
                }}
              >
                <img
                  alt="hotel"
                  src={hotel.images?.[0]?.imageUrl || "/placeholder.jpg"}
                  style={{
                    width: "300px",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginTop: "1.2rem",
                    marginLeft: "1.2rem",
                    marginRight: "20px",
                  }}
                />

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "1rem",
                  }}
                >
                  <div>
                    <Title level={4} style={{ marginBottom: "0.5rem" }}>
                      {hotel.name}
                    </Title>
                    <Rate disabled defaultValue={hotel.stars} />
                    <div style={{ margin: "0.5rem 0" }}>
                      <Tag color={hotel.IsActive ? "red" : "green"}>
                        {hotel.IsActive ? "Inactive" : "Active"}
                      </Tag>
                    </div>
                    <Text style={{ marginRight: "1rem" }}>
                      Available Rooms: {hotel.availableRooms} /{" "}
                      {hotel.totalRooms}
                    </Text>
                    <Progress
                      percent={
                        hotel.totalRooms > 0
                          ? Math.round(
                              ((hotel.totalRooms - hotel.availableRooms) /
                                hotel.totalRooms) *
                                100
                            )
                          : 0
                      }
                      style={{
                        marginTop: "0.5rem",
                        marginLeft: "1rem",
                        maxWidth: "300px",
                      }}
                    />
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      style={{ color: "#FB8500", marginRight: "0.5rem" }}
                      onClick={() =>
                        navigate(`/host/my_hotels/edit-hotel/${hotel.id}`)
                      }
                    />
                    <Popconfirm
                      title="Are you sure you want to delete this hotel?"
                      onConfirm={() => handleDeleteHotel(hotel.id)}
                      okText="Yes"
                      cancelText="No"
                      placement="topRight"
                    >
                      <Button type="text" icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default MyHotels;
