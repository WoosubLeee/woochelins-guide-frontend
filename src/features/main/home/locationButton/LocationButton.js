import styles from "./LocationButton.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const LocationButton = () => {
  const location = useLocation();

  const [position, setPosition] = useState();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      setPosition(pos);
    });
  }, []);

  const map = useSelector(state => state.map.kakaoMap);
  const handleClick = () => {
    map.panTo(new window.kakao.maps.LatLng(position.coords.latitude, position.coords.longitude));
  };

  return (
    position ? (
      <i
        onClick={handleClick}
        className={`fa-solid fa-location-crosshairs ${styles.icon}
        ${location.pathname.includes('place') ? styles.iconCardExpanded : styles.iconNormal}`}
      />
    ) : (
      <></>
    )
  );
}
 
export default LocationButton;