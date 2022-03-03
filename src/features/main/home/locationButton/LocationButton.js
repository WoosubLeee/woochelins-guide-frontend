import styles from "./LocationButton.module.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const LocationButton = () => {
  const location = useLocation();

  const map = useSelector(state => state.map.map);

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        map.panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }
  };

  return (
    <i
      onClick={handleClick}
      className={`fa-solid fa-location-crosshairs ${styles.icon}
        ${location.pathname.includes('place') ? styles.iconCardExpanded : styles.iconNormal}`}
    />
  );
}
 
export default LocationButton;