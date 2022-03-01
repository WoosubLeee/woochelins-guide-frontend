import styles from "./PlaceListItem.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { routeTo } from "../../../../../utils/functions/routes";

const PlaceListItem = ({ place }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(routeTo('PlaceInfoCard', { googleMapsId: place.googleMapsId }, location));
  }

  return (
    <li onClick={handleClick} className={styles.li}>
      {place.name}
    </li>
  );
}
 
export default PlaceListItem;