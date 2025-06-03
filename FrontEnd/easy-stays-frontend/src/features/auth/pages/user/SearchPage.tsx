import React, { useState } from "react";
import SearchBar from "../user/SearchBar";
import FilterComponent from "./Filter";
import HotelCard from "./HotelCard";
import api from "../../../../services/axios";

export type BedTypeQuantity = {
  bedType: string;
  quantity: number;
};

export type HotelType = {
  hotelId: string;
  name: string;
  location: string;
  imageUrl: string | null;
  roomName: string;
  bedTypes: BedTypeQuantity[];
  quantity: number;
  price: number;
  stars: number;
};

const SearchPage: React.FC = () => {
  const [hotels, setHotels] = useState<HotelType[]>([]);

  const handleSearch = async (params: any) => {
    try {
      const res = await api.post("api/Hotels/available-hotels", params);
      setHotels(res.data);
    } catch (error) {
      console.error("Failed to search hotels:", error);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div
        style={{
          marginTop: "200px",
          marginLeft: "200px",
          maxWidth: "80%",
        }}
      >
        <FilterComponent />
        {hotels.map((hotel) => (
          <HotelCard key={hotel.hotelId} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
