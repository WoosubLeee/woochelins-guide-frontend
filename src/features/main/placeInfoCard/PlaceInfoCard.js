import styles from "./PlaceInfoCard.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { focusPlace } from "../map/mapSlice";
import { Link, useLocation, useParams } from "react-router-dom";
import { requestGetPlace } from "../../../apis/placeApi";
import { createPath } from "../../../utils/functions/common";

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
  }, []);

  return (
    <>
      {focusedPlace &&
        <div className={styles.card}>
          <h5>{focusedPlace.name}</h5>
          <Link to={createPath(`/main/place/${googleMapsId}/add`, location)}>
            <i className="bi bi-bookmark-plus" />
          </Link>
        </div>
      }
    </>
  );
}
 
export default PlaceInfoCard;