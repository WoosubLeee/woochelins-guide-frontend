import styles from "./PredictionsItem.module.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createPath } from "../../../../../utils/functions/common";

const PredictionsItem = ({ prediction, setIsSearching }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [distance, setDistance] = useState(undefined);

  useEffect(() => {
    if ('distance_meters' in prediction) {
      let newDistance = prediction.distance_meters;
      if (newDistance > 1000) {
        setDistance((newDistance / 1000).toFixed(1) + 'km');
      } else {
        setDistance(newDistance + 'm');
      }
    }
  }, []);

  const handleClick = async () => {
    navigate(createPath(`/main/home/${prediction.place_id}`, location));
    setIsSearching(false);
  };

  return (
    <li onClick={handleClick} className={styles.li}>
      <i className={`fa-solid fa-location-dot ${styles.locationIcon}`}></i>
      <div className={styles.textArea}>
        <span className={styles.name}>{prediction.structured_formatting.main_text}</span>
        <br />
        <span className={styles.address}>{prediction.structured_formatting.secondary_text}</span>
      </div>
      <span>{distance}</span>
    </li>
  );
}
 
export default PredictionsItem;