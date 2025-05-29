import SearchBar from "../user/SearchBar";
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
          marginLeft: "150px",
          maxWidth: "80%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HotelCard />
      </div>
    </div>
  );
};

export default SearchPage;
