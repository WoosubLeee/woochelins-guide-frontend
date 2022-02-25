import styles from "./Map.module.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setMap as seetMap } from "./mapSlice";
import { useLocation, useNavigate } from "react-router-dom";
import ListMarkers from "./listMarkers/ListMarkers";
import FocusMarker from "./focusMarker/FocusMarker";
import { createPath } from "../../../utils/functions/common";
import { useDispatch } from "react-redux";

const Map = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isMapApiLoaded = useSelector(state => state.map.isMapApiLoaded);
  const map = useSelector(state => state.map.map);
  
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
      dispatch(seetMap(newMap));
      
      newMap.addListener('click', () => {
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
      <ListMarkers />
      <FocusMarker />
    </div>
  );
}
 
export default Map;