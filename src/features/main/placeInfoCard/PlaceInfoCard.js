import styles from "./PlaceInfoCard.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { focusPlace } from "../map/mapSlice";
import { useParams } from "react-router-dom";
import PlaceAddList from "./placeAddList/PlaceAddList";
import { requestGetPlace } from "../../../apis/placeApi";

const PlaceInfoCard = () => {
  const { googleMapsId } = useParams();

  const dispatch = useDispatch();

  const focusedPlace = useSelector(state => state.map.focusedPlace);

  const [isAdding, setIsAdding] = useState(false);

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
        <div>
          <div className={styles.card}>
            <h5>{focusedPlace.name}</h5>
            <button onClick={() => setIsAdding(!isAdding)}>
              <i className="bi bi-bookmark-plus" />
            </button>
          </div>
          {isAdding && <PlaceAddList />}
        </div>
      }
    </>
  );
}
 
export default PlaceInfoCard;