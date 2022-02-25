import { useState } from "react";
import { Outlet } from "react-router-dom";
import MainTopNavbar from "../mainTopNavbar/MainTopNavbar";
import Search from "../place/search/Search";

const Home = () => {
  const [isSearching, setIsSearching] = useState(false);
  
  return (
    <div>
      {!isSearching && <MainTopNavbar setIsSearching={setIsSearching} />}
      {isSearching && <Search setIsSearching={setIsSearching} />}
      <Outlet />
    </div>
  );
}
 
export default Home;