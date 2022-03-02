import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFocusedMarker } from "../../mapSlice";

const FocusMarker = ({ markers, listIcon, isMarkerInList, setIsMarkerInList }) => {
  const dispatch = useDispatch();

  const map = useSelector(state => state.map.map);
  const focusedMarker = useSelector(state => state.map.focusedMarker);
  const focusedPlace = useSelector(state => state.place.focusedPlace);

  const icon = map && {
    path: "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z",
    fillOpacity: 1,
    fillColor: "#d85140",
    strokeWeight: 2,
    strokeColor: "#a3291e",
    scale: 1.6,
    anchor: new window.google.maps.Point(12,22),
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