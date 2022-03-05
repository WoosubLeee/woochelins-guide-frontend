import styles from '../KakaoListMarkers.module.css';
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setKakaoFocusedMarker } from "../../../mapSlice";
import redMarker from "../../../../../../utils/images/red-marker.png";

const KakaoFocusMarker = ({ markers, listImage, isMarkerInList, setIsMarkerInList }) => {
  const dispatch = useDispatch();

  const kakaoMap = useSelector(state => state.map.kakaoMap);
  const kakaoFocusedMarker = useSelector(state => state.map.kakaoFocusedMarker);
  const focusedPlace = useSelector(state => state.place.focusedPlace);

  const image = useRef(new window.kakao.maps.MarkerImage(redMarker, new window.kakao.maps.Size(27, 46)));

  useEffect(() => {
    if (kakaoFocusedMarker) {
      if (isMarkerInList) {
        kakaoFocusedMarker.marker.setImage(listImage);
        kakaoFocusedMarker.marker.setZIndex(0);
      } else {
        kakaoFocusedMarker.marker.setMap(null);
        kakaoFocusedMarker.overlay.setMap(null);
      }
      dispatch(setKakaoFocusedMarker(undefined));
    }

    if (focusedPlace) {
      const focusedPlaceMarker = markers.find(marker => marker.googleMapsId === focusedPlace.googleMapsId);
      let marker;
      let overlay;
      if (focusedPlaceMarker) {
        marker = focusedPlaceMarker.marker;
        overlay = focusedPlaceMarker.overlay;
        marker.setImage(image.current);
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
      
      dispatch(setKakaoFocusedMarker({
        googleMapsId: focusedPlace.googleMapsId,
        marker: marker,
        overlay: overlay
      }));
      kakaoMap.panTo(marker.getPosition());
    }
  }, [focusedPlace]);

  useEffect(() => {
    if (!isMarkerInList && kakaoFocusedMarker) {
      const sameMarker = markers.find(marker => marker.googleMapsId === kakaoFocusedMarker.googleMapsId);
      if (sameMarker) {
        sameMarker.marker.setImage(image.current);
        kakaoFocusedMarker.marker.setMap(null);
        kakaoFocusedMarker.overlay.setMap(null);
        dispatch(setKakaoFocusedMarker(sameMarker));
        setIsMarkerInList(true);
      }
    }
  }, [markers, kakaoFocusedMarker]);

  return (
    <></>
  );
}
 
export default KakaoFocusMarker;