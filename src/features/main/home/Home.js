import { useState } from "react";
import { Outlet } from "react-router-dom";
import HomeTopNavbar from "./homeTopNavbar/HomeTopNavbar";
import Search from "../place/search/Search";
import LocationButton from "./locationButton/LocationButton";

const Home = () => {
  const [isSearching, setIsSearching] = useState(false);
  
  return (
    <div>
      {!isSearching && <HomeTopNavbar setIsSearching={setIsSearching} />}
      {isSearching && <Search setIsSearching={setIsSearching} />}
      <LocationButton />
      <Outlet />
    </div>
  );
}
 
export default Home;