import styles from "./PlaceListItem.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { routeTo } from "../../../../../utils/functions/routes";

const PlaceListItem = ({ place }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const googleMap = useSelector(state => state.map.googleMap);
  const currentGroup = useSelector(state => state.map.currentGroup);

  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (googleMap) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          const placePosition = {
            lat: place.latitude,
            lng: place.longitude
          }

          const distance = window.google.maps.geometry.spherical.computeDistanceBetween(currentPosition, placePosition);
          if (distance > 1000) {
            setDistance((distance / 1000).toFixed(1) + 'km');
          } else {
            setDistance(distance.toFixed(0) + 'm');
          }
        });
      }
    }
  }, [googleMap]);

  const handleClick = () => {
    navigate(routeTo('PlaceInfoCard', { googleMapsId: place.googleMapsId }, location));
  }

  return (
    <li onClick={handleClick} className={styles.li}>
      <i className={`fa-solid fa-location-dot fs-3 ${styles.icon}`} />
      <div className={styles.mainInfo}>
        <h3>{place.name}</h3>
        <span>{place.address}</span>
        <br />
        <span>{distance}</span>
      </div>
      {currentGroup?.isGroup &&
        <span>
          추천 <span className="text-success">{place.recommendedBy.length}</span>
        </span>
      }
    </li>
  );
}
 
export default PlaceListItem;