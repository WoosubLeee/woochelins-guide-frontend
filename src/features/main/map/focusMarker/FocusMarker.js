import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFocusedPlace } from "../mapSlice";
import { useParams } from "react-router-dom";

const FocusMarker = ({ map }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const focusedPlace = useSelector(state => state.map.focusedPlace);

  const [markerFocused, setMarkerFocused] = useState(undefined);

  useEffect(() => {
    if (map) {
      if (markerFocused) {
        markerFocused.setMap(null);
      }
      if (focusedPlace) {
        const position = {
          lat: focusedPlace.latitude,
          lng: focusedPlace.longitude
        };
        setMarkerFocused(new window.google.maps.Marker({
          position: position,
          map: map,
          // 항상 ListMarker보다 앞쪽에 보이게 하기 위해
          zIndex: 1
        }));
        map.setCenter(position);
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