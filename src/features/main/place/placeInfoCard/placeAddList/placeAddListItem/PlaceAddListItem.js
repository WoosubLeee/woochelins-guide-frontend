import styles from "./PlaceAddListItem.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlacesUpdateNeeded } from "../../../placeSlice";
import { setGroupsUpdateNeeded } from "../../../../group/groupSlice";
import { requestAddGroupPlace, requestAddPlace, requestRemoveGroupPlace, requestRemovePlace } from "../../../../../../apis/placeApi";
import SmallLabel from "../../../../../../components/labels/smallLabel/SmallLabel";

const PlaceAddListItem = ({ group }) => {
  const dispatch = useDispatch();

  const focusedPlace = useSelector(state => state.place.focusedPlace);
  const listData = useSelector(state => state.map.listData);

  const [isSaved, setIsSaved] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isCurrent, setIsCurrent] = useState(false);

  useEffect(() => {
    if (focusedPlace) {
      if (group.isGroup) {
        if (group.placeList.places.map(place => place.place.googleMapsId).includes(focusedPlace.googleMapsId)) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      } else {
        if (group.places.map(place => place.googleMapsId).includes(focusedPlace.googleMapsId)) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      }
    }
  }, [group, focusedPlace]);

  useEffect(() => {
    if (listData) {
      if (group.isGroup === listData.isGroup && group.id === listData.id) {
        setIsCurrent(true);
      }
    }
  }, [listData]);
  
  const handleClick = () => {
    setIsRequesting(true);

    const requestAddRemove = () => {
      if (!isSaved) {
        if (group.isGroup) {
          return requestAddGroupPlace(group.id, focusedPlace);
        } else {
          return requestAddPlace(group.id, focusedPlace);
        }
      } else {
        if (group.isGroup) {
          return requestRemoveGroupPlace(group.id, focusedPlace.googleMapsId);
        } else {
          return requestRemovePlace(group.id, focusedPlace.googleMapsId);
        }
      }
    };

    requestAddRemove()
      .then(() => {
        dispatch(setGroupsUpdateNeeded(true));
        if (group.isGroup === listData.isGroup) {
          dispatch(setPlacesUpdateNeeded(true));
        }
        setIsRequesting(false);
      });
  };
  
  return (
    <li className={styles.li}>
      <div className={styles.nameDiv}>
        {isCurrent && <SmallLabel text="현재" />}
        <span className={styles.span}>{group.name}</span>
      </div>
      <div>
        {isRequesting ? (
          <div className="spinner-border spinner-border-sm text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <button onClick={handleClick} className={styles.button}>
            {isSaved ? (
              <i className="bi bi-bookmark-fill" />
            ) : (
              <i className="bi bi-bookmark" />
            )}
          </button>
        )}
      </div>
    </li>
  );
}
 
export default PlaceAddListItem;