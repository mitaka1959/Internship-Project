import React, { useState, useEffect } from "react";
import SearchBar from "../user/SearchBar";
import FilterComponent from "./Filter";
import HotelCard from "./HotelCard";
import api from "../../../../services/axios";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";

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

const SearchPage: React.FC = () => {
  const [originalHotels, setOriginalHotels] = useState<HotelType[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<HotelType[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [budgetRange, setBudgetRange] = useState<[number, number]>([0, 1000]);
  const [minStars, setMinStars] = useState<number>(0);
  const [maxStars, setMaxStars] = useState<number>(0);
  const [dates, setDates] = useState<[Dayjs, Dayjs] | null>(null);

  let navigate = useNavigate();

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
      setMinStars(0);
      setMaxStars(5);
      useNavigate();
      navigate("/search");
    } catch (error) {
      console.error("Failed to search hotels:", error);
    }
  };

  useEffect(() => {
    const [min, max] = budgetRange;
    const filtered = originalHotels.filter(
      (hotel) =>
        hotel.price >= min && hotel.price <= max && hotel.stars <= maxStars
    );
    setFilteredHotels(filtered);
  }, [budgetRange, minStars, maxStars, originalHotels]);

  return (
    <div>
      <SearchBar onSearch={handleSearch} dates={dates} setDates={setDates} />

      <div
        style={{
          marginTop: "200px",
          marginLeft: "200px",
          maxWidth: "80%",
        }}
      >
        <FilterComponent
          minPrice={minPrice}
          maxPrice={maxPrice}
          onBudgetChange={(range) => setBudgetRange(range)}
          onStarChange={(stars) => setMaxStars(stars)}
        />
        {filteredHotels.map((hotel) => (
          <HotelCard key={hotel.hotelId} hotel={hotel} selectedDates={dates} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
