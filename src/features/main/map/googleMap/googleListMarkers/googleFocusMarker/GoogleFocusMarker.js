import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGoogleFocusedMarker } from "../../../mapSlice";

const GoogleFocusMarker = ({ markers, listIcon, label, isMarkerInList, setIsMarkerInList }) => {
  const dispatch = useDispatch();

  const googleMap = useSelector(state => state.map.googleMap);
  const googleFocusedMarker = useSelector(state => state.map.googleFocusedMarker);
  const focusedPlace = useSelector(state => state.place.focusedPlace);

  const icon = googleMap && {
    path: "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z",
    fillOpacity: 1,
    fillColor: "#d85140",
    strokeWeight: 2,
    strokeColor: "#a3291e",
    scale: 1.6,
    anchor: new window.google.maps.Point(12,22),
    labelOrigin: new window.google.maps.Point(12,30)
  };

  const focusLabel = focusedPlace && {
    ...label,
    text: focusedPlace.name
  };

  useEffect(() => {
    if (googleMap) {
      if (googleFocusedMarker) {
        if (isMarkerInList) googleFocusedMarker.marker.setIcon(listIcon);
        else if (isMarkerInList === false) googleFocusedMarker.marker.setMap(null);
        dispatch(setGoogleFocusedMarker(undefined));
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
            icon: icon,
            map: googleMap,
            label: focusLabel
          });
          setIsMarkerInList(false);
        }
        dispatch(setGoogleFocusedMarker({
          googleMapsId: focusedPlace.googleMapsId,
          marker: marker
        }));
        googleMap.panTo(marker.position);
      }
    }
  }, [googleMap, focusedPlace]);

  return (
    <></>
  );
}
 
export default GoogleFocusMarker;