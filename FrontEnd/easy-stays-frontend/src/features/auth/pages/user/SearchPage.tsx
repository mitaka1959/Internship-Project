import SearchBar from "../user/SearchBar";
import FilterComponent from "./Filter";
import HotelCard from "./HotelCard";

const SearchPage: React.FC = () => {
  return (
    <div>
      <div>
        <SearchBar />
      </div>
      <div
        style={{
          marginTop: "200px",
          marginLeft: "200px",
          maxWidth: "80%",
        }}
      >
        <FilterComponent />
        <HotelCard />
      </div>
    </div>
  );
};

export default SearchPage;
