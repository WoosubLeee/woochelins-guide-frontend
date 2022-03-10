import styles from '../ListMarkers.module.css';
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFocusedMarker } from "../../mapSlice";
import redMarker from "../../../../../utils/images/red-marker.png";

const FocusMarker = ({ markers, listImage, isMarkerInList, setIsMarkerInList }) => {
  const dispatch = useDispatch();

  const kakaoMap = useSelector(state => state.map.kakaoMap);
  const focusedMarker = useSelector(state => state.map.focusedMarker);
  const focusedPlace = useSelector(state => state.place.focusedPlace);

  const image = useRef(new window.kakao.maps.MarkerImage(redMarker, new window.kakao.maps.Size(27, 46)));

  useEffect(() => {
    if (focusedMarker) {
      if (isMarkerInList) {
        focusedMarker.marker.setImage(listImage);
        focusedMarker.marker.setZIndex(0);
        if (kakaoMap.getLevel() >= 6) focusedMarker.overlay.setVisible(false);
      } else {
        focusedMarker.marker.setMap(null);
        focusedMarker.overlay.setMap(null);
      }
      dispatch(setFocusedMarker(undefined));
    }

    if (focusedPlace) {
      const focusedPlaceMarker = markers.find(marker => marker.kakaoMapId === focusedPlace.kakaoMapId);
      let marker;
      let overlay;
      if (focusedPlaceMarker) {
        marker = focusedPlaceMarker.marker;
        overlay = focusedPlaceMarker.overlay;
        marker.setImage(image.current);
        overlay.setVisible(true);
        setIsMarkerInList(true);
      } else {
        marker = new window.kakao.maps.Marker({
          map: kakaoMap,
          position: new window.kakao.maps.LatLng(focusedPlace.latitude, focusedPlace.longitude),
          image: image.current
        });

        overlay = new window.kakao.maps.CustomOverlay({
          map: kakaoMap,
          position: new window.kakao.maps.LatLng(focusedPlace.latitude, focusedPlace.longitude),
          content: `<span class="${styles.markerLabel}">${focusedPlace.name}</span>`,
          yAnchor: 0
        });
        
        setIsMarkerInList(false);
      }
      marker.setZIndex(1);
      
      dispatch(setFocusedMarker({
        kakaoMapId: focusedPlace.kakaoMapId,
        marker: marker,
        overlay: overlay
      }));
      kakaoMap.panTo(marker.getPosition());
    }
  }, [focusedPlace]);

  return (
    <></>
  );
}
 
export default FocusMarker;