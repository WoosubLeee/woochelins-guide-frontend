import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFocusedPlace } from "../../mapSlice";
import { useParams } from "react-router-dom";

const FocusMarker = ({ markers, listIcon }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const map = useSelector(state => state.map.map);
  const focusedPlace = useSelector(state => state.map.focusedPlace);

  const [focusedMarker, setFocusedMarker] = useState(undefined);
  const [isMarkerInList, setIsMarkerInList] = useState(undefined);

  const icon = map && {
    path: "M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z",
    fillColor: "#dc3545",
    fillOpacity: 1,
    strokeWeight: 0,
    scale: 2.3,
    anchor: new window.google.maps.Point(9, 21)
  };

  useEffect(() => {
    if (map) {
      if (focusedMarker) {
        if (isMarkerInList) focusedMarker.setIcon(listIcon);
        else if (isMarkerInList === false) focusedMarker.setMap(null);
        setFocusedMarker(undefined);
      }

      if (focusedPlace) {
        const focusedPlaceMarker = markers.find(marker => marker.googleMapsId === focusedPlace.googleMapsId);
        if (focusedPlaceMarker) {
          focusedPlaceMarker.marker.setIcon(icon);
          setFocusedMarker(focusedPlaceMarker.marker);
          setIsMarkerInList(true);
        } else {
          const position = {
            lat: focusedPlace.latitude,
            lng: focusedPlace.longitude
          };
          setFocusedMarker(new window.google.maps.Marker({
            position: position,
            map: map,
            // 항상 ListMarker보다 앞쪽에 보이게 하기 위해
            zIndex: 1
          }));
          setIsMarkerInList(false);
          map.setCenter(position);
        }
      }
    }
  }, [map, focusedPlace]);
  
  useEffect(() => {
    if (focusedPlace && !('googleMapsId' in params)) {
      dispatch(removeFocusedPlace());
    }
  }, [params]);

  return (
    <></>
  );
}
 
export default FocusMarker;