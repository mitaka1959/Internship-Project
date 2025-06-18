import React, { useState, useEffect } from "react";
import { Checkbox, Divider, Slider, Rate } from "antd";

type FilterComponentProps = {
  minPrice: number;
  maxPrice: number;
  onBudgetChange: (range: [number, number]) => void;
  onStarChange?: (stars: number) => void;
};

const FilterComponent: React.FC<FilterComponentProps> = ({
  minPrice,
  maxPrice,
  onBudgetChange,
  onStarChange,
}) => {
  const [budgetRange, setBudgetRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);
  const [starValue, setStarValue] = useState<number>(0);

  useEffect(() => {
    setBudgetRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleSliderChange = (value: number[]) => {
    if (value.length === 2) {
      setBudgetRange([value[0], value[1]]);
      onBudgetChange([value[0], value[1]]);
    }
  };

  const handleStarChange = (value: number | 5) => {
    setStarValue(value);
    onStarChange?.(value);
  };

  return (
    <div
      style={{
        position: "fixed",
        marginLeft: "30px",
        top: "200px",
        left: 0,
        width: "250px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: "14px",
        zIndex: 900,
      }}
    >
      <h3>Your Budget (per night)</h3>
      <div style={{ marginBottom: "12px" }}>
        <span>
          USD {budgetRange[0]} - USD {budgetRange[1]}
        </span>
        <Slider
          range
          value={budgetRange}
          min={minPrice}
          max={maxPrice}
          step={10}
          onChange={handleSliderChange}
        />
      </div>

      <Divider />

      <h4>Star Rating</h4>
      <Rate value={starValue} onChange={handleStarChange} defaultValue={5} />

      <Divider />

      <h4>Popular Filters</h4>
      <Checkbox>Parking</Checkbox>
      <Checkbox>Excellent: 9+</Checkbox>
      <Checkbox>Hotels</Checkbox>
      <Checkbox>Free cancellation</Checkbox>
      <Checkbox>With breakfast</Checkbox>
      <Checkbox>5 stars</Checkbox>

      <Divider />

      <h4>Amenities</h4>
      <Checkbox>Free WiFi</Checkbox>
      <Checkbox>Non-smoking rooms</Checkbox>
      <Checkbox>Parking</Checkbox>
    </div>
  );
};

export default FilterComponent;
