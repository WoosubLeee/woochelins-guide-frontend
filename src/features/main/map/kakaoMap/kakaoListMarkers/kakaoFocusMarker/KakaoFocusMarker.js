import styles from '../KakaoListMarkers.module.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setKakaoFocusedMarker } from "../../../mapSlice";
import redMarker from "../../../../../../utils/images/red-marker.png";

const KakaoFocusMarker = ({ markers, listImage, isMarkerInList, setIsMarkerInList }) => {
  const dispatch = useDispatch();

  const kakaoMap = useSelector(state => state.map.kakaoMap);
  const kakaoFocusedMarker = useSelector(state => state.map.kakaoFocusedMarker);
  const focusedPlace = useSelector(state => state.place.focusedPlace);

  const image = kakaoMap && new window.kakao.maps.MarkerImage(redMarker, new window.kakao.maps.Size(45, 45));

  useEffect(() => {
    if (kakaoMap) {
      if (kakaoFocusedMarker) {
        if (isMarkerInList) {
          kakaoFocusedMarker.marker.setImage(listImage);
        } else {
          kakaoFocusedMarker.marker.setMap(null);
          kakaoFocusedMarker.overlay?.setMap(null);
        }
        dispatch(setKakaoFocusedMarker(undefined));
      }

      if (focusedPlace) {
        const focusedPlaceMarker = markers.find(marker => marker.googleMapsId === focusedPlace.googleMapsId);
        let marker;
        let overlay;
        if (focusedPlaceMarker) {
          marker = focusedPlaceMarker.marker;
          marker.setImage(image);
          setIsMarkerInList(true);
        } else {
          marker = new window.kakao.maps.Marker({
            map: kakaoMap,
            position: new window.kakao.maps.LatLng(focusedPlace.latitude, focusedPlace.longitude),
            image: image
          });

          overlay = new window.kakao.maps.CustomOverlay({
            map: kakaoMap,
            position: new window.kakao.maps.LatLng(focusedPlace.latitude, focusedPlace.longitude),
            content: `<span class="${styles.markerLabel}">${focusedPlace.name}</span>`,
            yAnchor: 0
          });
          
          setIsMarkerInList(false);
        }
        
        dispatch(setKakaoFocusedMarker({
          googleMapsId: focusedPlace.googleMapsId,
          marker: marker,
          overlay: overlay
        }));
        kakaoMap.panTo(marker.getPosition());
      }
    }
  }, [kakaoMap, focusedPlace]);

  return (
    <></>
  );
}
 
export default KakaoFocusMarker;