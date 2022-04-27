import styles from './Home.module.css';
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import HomeTopNavbar from "./homeTopNavbar/HomeTopNavbar";
import SearchBar from "../place/search/searchBar/SearchBar";
import LocationButton from "./locationButton/LocationButton";
import { routeTo } from '../../../utils/functions/routes';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSearching, setIsSearching] = useState(false);

  const [isPlaceInfoCardExpanded, setIsPlaceInfoCardExpanded] = useState(false);
  useEffect(() => {
    if (document.getElementById('place-info-card')) {
      setIsPlaceInfoCardExpanded(true);
    } else {
      setIsPlaceInfoCardExpanded(false);
    }
  }, [location]);
  
  return (
    <>
      {!isSearching && <HomeTopNavbar setIsSearching={setIsSearching} />}
      {isSearching && <SearchBar setIsSearching={setIsSearching} />}
      <div className={`${styles.btnWrap} ${isPlaceInfoCardExpanded ? styles.btnWrapHigh : styles.btnWrapLow}`}>
        <LocationButton />
        <button
          className={`${styles.placeListBtn} floating-btn`}
          onClick={() => navigate(routeTo('GroupList', null, location))}
        >
          <i className="bi bi-list me-1 text-success" />
          <span>식당 목록</span>
        </button>
      </div>
      <Outlet />
    </>
  );
}
 
export default Home;