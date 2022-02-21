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
        navigateToMain();
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

  // newMap.addListener 내부에 작성 시
  // location을 이벤트를 추가할 때 기준으로 받아오게 되어
  // query가 정확히 저장되지 않아 함수를 따로 생성함.
  const navigateToMain = () => {
    navigate(createPath('/main', location));
  };

  return (
    <div id="map" className={styles.map}>
      <Marker map={map} />
    </div>
  );
}
 
export default Map;