import styles from "./PredictionsItem.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { focusPlace } from "../../../map/mapSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { createPath } from "../../../../../utils/functions/common";

const PredictionsItem = ({ prediction, service, sessionToken }) => {
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

  const handleClick = () => {
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
      const payload = {
        googleMapsId: place.place_id,
        name: place.name,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        address: place.formatted_address,
        phoneNumber: place.formatted_phone_number,
        photos: place.photos ? place.photos.map(photo => photo.getUrl()) : [],
        googleMapsUrl: place.url
      };
      dispatch(focusPlace(payload));
      navigate(createPath(`/main/place/${place.place_id}/`, location));
    });
  }

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