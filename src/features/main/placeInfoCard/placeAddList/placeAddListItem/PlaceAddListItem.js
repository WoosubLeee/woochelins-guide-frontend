import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setListUpdateNeeded } from "../../../map/mapSlice";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { requestAddGroupPlace, requestAddPlace, requestRemoveGroupPlace, requestRemovePlace } from "../../../../../apis/placeApi";

const PlaceAddListItem = ({ group, isSaved, changeSaved }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const focusedPlace = useSelector(state => state.map.focusedPlace);
  
  const [isRequesting, setIsRequesting] = useState(false);
  
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
        changeSaved(group.isGroup, !isSaved, group.id);
        setIsRequesting(false);

        const queries = queryString.parse(location.search);
        if (!('type' in queries) || !('id' in queries)) {
          dispatch(setListUpdateNeeded(true));
        } else if ('type' in queries && 'id' in queries) {
          if ((group.isGroup && queries.type === 'group') || (!group.isGroup && queries.type === 'placelist')) {
            if (Number(queries.id) === group.id) {
              dispatch(setListUpdateNeeded(true));
            }
          }
        }
      });
  };
  
  return (
    <li>
      <span>{group.name}</span>
      <button onClick={handleClick}>
        {isRequesting ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          isSaved ? <i className="bi bi-bookmark-fill" /> : <i className="bi bi-bookmark" />
        )}
      </button>
    </li>
  );
}
 
export default PlaceAddListItem;