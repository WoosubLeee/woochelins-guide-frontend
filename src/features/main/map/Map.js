import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFocusedPlace } from "./mapSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Marker from "./marker/Marker";
import { createPath } from "../../../utils/functions/common";

const Map = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isMapApiLoaded = useSelector(state => state.map.isMapApiLoaded);

  const [map, setMap] = useState(undefined);
  
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
      setMap(newMap);
      
      newMap.addListener('click', () => {
        dispatch(removeFocusedPlace());
        navigate(createPath('/main', location));
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
      }, () => {
        console.error('Error: The Geolocation service failed.');
      });
    }
  }, [map]);

  return (
    <div id="map" className={styles.map}>
      <Marker map={map} />
    </div>
  );
}
 
export default Map;