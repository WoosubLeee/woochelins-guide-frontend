import styles from "./PlaceAddListItem.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentPlaces } from "../../../placeSlice";
import { updateGroupsAndMylists } from "../../../../group/groupSlice";
import { useLocation } from "react-router-dom";
import { requestGroupPlaceAdd, requestGroupPlaceRemove } from "../../../../../../apis/groupApi";
import { requestMyListPlaceAdd, requestMyListPlaceRemove } from "../../../../../../apis/placeApi";
import SmallLabel from "../../../../../../components/labels/smallLabel/SmallLabel";

const PlaceAddListItem = ({ group }) => {
  const dispatch = useDispatch();

  const focusedPlace = useSelector(state => state.place.focusedPlace);
  const currentGroup = useSelector(state => state.group.currentGroup);

  const [isSaved, setIsSaved] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isCurrent, setIsCurrent] = useState(false);

  useEffect(() => {
    if (focusedPlace) {
      if (group.isGroup) {
        if (group.places.map(place => place.place.kakaoMapId).includes(focusedPlace.kakaoMapId)) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      } else {
        if (group.places.map(place => place.kakaoMapId).includes(focusedPlace.kakaoMapId)) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      }
    }
  }, [group, focusedPlace]);

  useEffect(() => {
    if (currentGroup) {
      if (group.isGroup === currentGroup.isGroup && group.id === currentGroup.id) {
        setIsCurrent(true);
      }
    }
  }, [currentGroup]);
  
  const location = useLocation();
  const handleClick = () => {
    setIsRequesting(true);

    const requestAddRemove = () => {
      if (!isSaved) {
        if (group.isGroup) {
          return requestGroupPlaceAdd(group.id, focusedPlace);
        } else {
          return requestMyListPlaceAdd(group.id, focusedPlace);
        }
      } else {
        if (group.isGroup) {
          return requestGroupPlaceRemove(group.id, focusedPlace.kakaoMapId);
        } else {
          return requestMyListPlaceRemove(group.id, focusedPlace.kakaoMapId);
        }
      }
    };

    requestAddRemove()
      .then(() => {
        setIsSaved(!isSaved);
        dispatch(updateGroupsAndMylists);
        if (isCurrent) {
          dispatch(updateCurrentPlaces(location));
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