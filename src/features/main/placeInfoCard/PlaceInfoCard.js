import styles from "./PlaceInfoCard.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { focusPlace } from "../map/mapSlice";
import { Link, useLocation, useParams } from "react-router-dom";
import { requestGetPlace } from "../../../apis/placeApi";
import { createPath } from "../../../utils/functions/common";
import GoogleMapsIcon from "../../../utils/images/google-maps-icon.svg"

const PlaceInfoCard = () => {
  const { googleMapsId } = useParams();

  const dispatch = useDispatch();
  const location = useLocation();

  const focusedPlace = useSelector(state => state.map.focusedPlace);

  useEffect(() => {
    if (!focusedPlace || focusedPlace.googleMapsId !== googleMapsId) {
      requestGetPlace(googleMapsId)
        .then(data => {
          dispatch(focusPlace(data));
        });
    }
  }, [location]);

  return (
    <>
      {focusedPlace &&
        <div className={styles.card}>
          <h5>{focusedPlace.name}</h5>
          <a href={`tel:${focusedPlace.phoneNumber}`}>{focusedPlace.phoneNumber}</a>
          <p>{focusedPlace.address}</p>
          <div className={`d-flex ${styles.photoContainer}`}>
            {focusedPlace.photos.map((photo, i) => {
              return (
                <img key={i} src={photo} className="img-thumbnail" alt="" />
              )
            })}
          </div>
          <Link to={createPath(`/main/place/${googleMapsId}/add`, location)}>
            <i className="bi bi-bookmark-plus" />
          </Link>
          <a href={focusedPlace.googleMapsUrl} target="_blank" rel="noreferrer">
            <img src={GoogleMapsIcon} alt="" height={"25px"} />
          </a>
        </div>
      }
    </>
  );
}
 
export default PlaceInfoCard;