import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setListData } from "../../map/mapSlice";
import { requestAddPlace, requestGetPlaceList, requestRemovePlace } from "../../../../apis/placeApi";

const GroupPlaceSaveButton = () => {
  // const dispatch = useDispatch();

  // const listData = useSelector(state => state.map.listData);
  // const focusedPlace = useSelector(state => state.map.focusedPlace);

  const [isInList, setIsInList] = useState(false);

  // useEffect(() => {
  //   if (focusedPlace) {
  //     const places = listData.isGroup ? listData.place_list.places : listData.places;

  //     const googleMapsIds = places.map(place => place.google_maps_id);
  //     if (googleMapsIds.includes(focusedPlace.googleMapsId)) {
  //       setIsInList(true);
  //     } else {
  //       setIsInList(false);
  //     }
  //   }
  // }, [focusedPlace, listData]);

  const handleClick = () => {
  //   const listId = listData.id;

  //   const sendRequest = () => {
  //     if (isInList) {
  //       return requestRemovePlace(listId, focusedPlace.googleMapsId)
  //     } else {
  //       const placeInfo = {
  //         google_maps_id: focusedPlace.googleMapsId,
  //         name: focusedPlace.name,
  //         latitude: focusedPlace.location.lat,
  //         longitude: focusedPlace.location.lng,
  //       };
  //       return requestAddPlace(listId, placeInfo)
  //     }
  //   }

  //   sendRequest()
  //     .then(() => {
  //       requestGetPlaceList(listId)
  //         .then(data => {
  //           dispatch(setListData(data));
  //         });
  //     });
  };

  return (
    <button onClick={handleClick}>{isInList ? '삭제' : '저장'}</button>
  );
}
 
export default GroupPlaceSaveButton;