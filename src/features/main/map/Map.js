import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMap } from "./mapSlice";
import { useLocation, useNavigate } from "react-router-dom";
import ListMarkers from "./listMarkers/ListMarkers";
import { createPath } from "../../../utils/functions/common";

const Map = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isMapApiLoaded = useSelector(state => state.map.isMapApiLoaded);
  const map = useSelector(state => state.map.map);

  const [navigateToHome, setNavigateToHome] = useState(false);
  
  useEffect(() => {
    if (isMapApiLoaded) {
      const newMap = new window.google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 37.48,
          lng: 126.95,
        },
        zoom: 13,
        disableDefaultUI: true,
      })
      dispatch(setMap(newMap));
      
      newMap.addListener('click', () => {
        setNavigateToHome(true);
      });
    }
  }, [isMapApiLoaded]);

  useEffect(() => {
    if (map && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        map.setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, [map]);

  useEffect(() => {
    if (navigateToHome) {
      navigate(createPath('/main/home', location));
      setNavigateToHome(false);
    }
  }, [navigateToHome]);

  return (
    <div id="map" className={styles.map}>
      <ListMarkers />
    </div>
  );
}
 
export default Map;