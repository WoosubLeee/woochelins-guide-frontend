import styles from "./LocationButton.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LocationButton = () => {
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
        className={`fa-solid fa-location-crosshairs ${styles.icon} floating-btn`}
      />
    ) : (
      <></>
    )
  );
}
 
export default LocationButton;