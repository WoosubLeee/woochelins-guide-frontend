import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFocusedMarker } from "../../mapSlice";

const FocusMarker = ({ markers, listIcon, isMarkerInList, setIsMarkerInList }) => {
  const dispatch = useDispatch();

  const map = useSelector(state => state.map.map);
  const focusedMarker = useSelector(state => state.map.focusedMarker);
  const focusedPlace = useSelector(state => state.place.focusedPlace);

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
        if (isMarkerInList) focusedMarker.marker.setIcon(listIcon);
        else if (isMarkerInList === false) focusedMarker.marker.setMap(null);
        dispatch(setFocusedMarker(undefined));
      }

      if (focusedPlace) {
        const focusedPlaceMarker = markers.find(marker => marker.googleMapsId === focusedPlace.googleMapsId);
        let marker;
        if (focusedPlaceMarker) {
          marker = focusedPlaceMarker.marker;
          marker.setIcon(icon);
          setIsMarkerInList(true);
        } else {
          const position = {
            lat: focusedPlace.latitude,
            lng: focusedPlace.longitude
          };
          marker = new window.google.maps.Marker({
            position: position,
            map: map,
            icon: icon,
            // 항상 ListMarker보다 앞쪽에 보이게 하기 위해
            zIndex: 1
          });
          setIsMarkerInList(false);
        }
        dispatch(setFocusedMarker({
          googleMapsId: focusedPlace.googleMapsId,
          marker: marker
        }));
        map.panTo(marker.position);
      }
    }
  }, [map, focusedPlace]);

  return (
    <></>
  );
}
 
export default FocusMarker;