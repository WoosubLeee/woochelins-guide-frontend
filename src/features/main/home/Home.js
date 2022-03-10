import { useState } from "react";
import { Outlet } from "react-router-dom";
import HomeTopNavbar from "./homeTopNavbar/HomeTopNavbar";
import SearchBar from "../place/search/searchBar/SearchBar";
import LocationButton from "./locationButton/LocationButton";

const Home = () => {
  const [isSearching, setIsSearching] = useState(false);
  
  return (
    <>
      {!isSearching && <HomeTopNavbar setIsSearching={setIsSearching} />}
      {isSearching && <SearchBar setIsSearching={setIsSearching} />}
      <LocationButton />
      <Outlet />
    </>
  );
}
 
export default Home;