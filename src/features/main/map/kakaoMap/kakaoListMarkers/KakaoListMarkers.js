import styles from './KakaoListMarkers.module.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import KakaoFocusMarker from './kakaoFocusMarker/KakaoFocusMarker';
import { routeTo } from "../../../../../utils/functions/routes";
import blueMarker from "../../../../../utils/images/blue-marker.png";

const KakaoListMarkers = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const kakaoMap = useSelector(state => state.map.kakaoMap);
  const kakaoFocusedMarker = useSelector(state => state.map.kakaoFocusedMarker);
  const currentPlaces = useSelector(state => state.place.currentPlaces);

  const [markers, setMarkers] = useState([]);
  console.log(markers)
  const [isMarkerInList, setIsMarkerInList] = useState(undefined);

  const image = kakaoMap &&
    new window.kakao.maps.MarkerImage(blueMarker, new window.kakao.maps.Size(25, 25));

  useEffect(() => {
    if (kakaoMap && currentPlaces) {
      // 기존 markers 삭제
      markers.forEach(marker => {
        marker.marker.setMap(null);
        marker.overlay.setMap(null);
      });

      // 새 markers 추가
      const newMarkers = currentPlaces.map(place => {
        let marker;
        let overlay;
        // foucsedMarker로 이미 해당 장소에 대한 marker가 있다면
        if (kakaoFocusedMarker && kakaoFocusedMarker.googleMapsId === place.googleMapsId) {
          marker = kakaoFocusedMarker.marker;
          overlay = kakaoFocusedMarker.overlay;
          setIsMarkerInList(true);
        // focusedMarker로 없어 새로이 추가하는 경우
        } else {
          marker = new window.kakao.maps.Marker({
            map: kakaoMap,
            position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
            image: image
          });

          overlay = new window.kakao.maps.CustomOverlay({
            map: kakaoMap,
            position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
            content: `<span class="${styles.markerLabel}">${place.name}</span>`,
            yAnchor: 0
          });
        }

        marker.addListener('click', () => {
          navigate(routeTo('PlaceInfoCard', { googleMapsId: place.googleMapsId }, location));
        });

        return {
          googleMapsId: place.googleMapsId,
          marker: marker,
          overlay: overlay
        };
      });

      setMarkers(newMarkers);
    }
  }, [kakaoMap, currentPlaces])

  return (
    <KakaoFocusMarker
      markers={markers}
      listImage={image}
      isMarkerInList={isMarkerInList}
      setIsMarkerInList={setIsMarkerInList}
    />
  );
}
 
export default KakaoListMarkers;