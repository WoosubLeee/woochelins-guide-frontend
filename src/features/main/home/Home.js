import { useState } from "react";
import { Outlet } from "react-router-dom";
import HomeTopNavbar from "./homeTopNavbar/HomeTopNavbar";
import Search from "../place/search/Search";

const Home = () => {
  const [isSearching, setIsSearching] = useState(false);
  
  return (
    <div>
      {!isSearching && <HomeTopNavbar setIsSearching={setIsSearching} />}
      {isSearching && <Search setIsSearching={setIsSearching} />}
      <Outlet />
    </div>
  );
}
 
export default Home;