import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGoogleFocusedMarker } from "../../../mapSlice";
import redMarker from "../../../../../../utils/images/red-marker.png";

const GoogleFocusMarker = ({ markers, listIcon, label, isMarkerInList, setIsMarkerInList }) => {
  const dispatch = useDispatch();

  const googleMap = useSelector(state => state.map.googleMap);
  const googleFocusedMarker = useSelector(state => state.map.googleFocusedMarker);
  const focusedPlace = useSelector(state => state.place.focusedPlace);

  const icon = useRef({
    url: redMarker,
    scaledSize: new window.google.maps.Size(27, 46),
    labelOrigin: new window.google.maps.Point(12, 45),
  });
  const focusLabel = focusedPlace && {
    ...label,
    text: focusedPlace.name
  };

  useEffect(() => {
    if (googleFocusedMarker) {
      if (isMarkerInList) {
        googleFocusedMarker.marker.setIcon(listIcon);
        googleFocusedMarker.marker.setZIndex(0);
      } else if (isMarkerInList === false) googleFocusedMarker.marker.setMap(null);
      dispatch(setGoogleFocusedMarker(undefined));
    }

    if (focusedPlace) {
      const focusedPlaceMarker = markers.find(marker => marker.googleMapsId === focusedPlace.googleMapsId);
      let marker;
      if (focusedPlaceMarker) {
        marker = focusedPlaceMarker.marker;
        marker.setIcon(icon.current);
        setIsMarkerInList(true);
      } else {
        marker = new window.google.maps.Marker({
          position: {
            lat: focusedPlace.latitude,
            lng: focusedPlace.longitude
          },
          icon: icon.current,
          map: googleMap,
          label: focusLabel
        });
        setIsMarkerInList(false);
      }
      marker.setZIndex(1);

      dispatch(setGoogleFocusedMarker({
        googleMapsId: focusedPlace.googleMapsId,
        marker: marker
      }));
      googleMap.panTo(marker.position);
    }
  }, [focusedPlace]);

  useEffect(() => {
    if (!isMarkerInList && googleFocusedMarker) {
      const sameMarker = markers.find(marker => marker.googleMapsId === googleFocusedMarker.googleMapsId);
      if (sameMarker) {
        sameMarker.marker.setIcon(icon.current);
        googleFocusedMarker.marker.setMap(null);
        dispatch(setGoogleFocusedMarker(sameMarker));
        setIsMarkerInList(true);
      }
    }
  }, [markers, googleFocusedMarker]);

  return (
    <></>
  );
}
 
export default GoogleFocusMarker;