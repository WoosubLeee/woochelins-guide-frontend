import styles from "./PredictionsItem.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFocusedPlace } from "../../../map/mapSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { createPath, processGooglePlaceData } from "../../../../../utils/functions/common";

const PredictionsItem = ({ prediction, service, sessionToken, setIsSearching }) => {
  const dispatch = useDispatch();
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
    service.getDetails({
      placeId: prediction.place_id,
      fields: [
        'place_id',
        'name',
        'geometry.location',
        'type',
        'formatted_address',
        'photos',
        'url',
        'formatted_phone_number'
      ],
      sessionToken: sessionToken
    }, (place, status) => {
      const payload = processGooglePlaceData(place);
      dispatch(setFocusedPlace(payload));
      navigate(createPath(`/main/place/${payload.googleMapsId}`, location));
      setIsSearching(false);
    });
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