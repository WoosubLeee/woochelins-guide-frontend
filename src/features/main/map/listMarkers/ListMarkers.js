import styles from './ListMarkers.module.css';
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FocusMarker from './focusMarker/FocusMarker';
import { routeTo } from "../../../../utils/functions/routes";
import greenMarker from "../../../../utils/images/green-marker.png";

const ListMarkers = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const kakaoMap = useSelector(state => state.map.kakaoMap);
  const focusedMarker = useSelector(state => state.map.focusedMarker);
  const currentPlaces = useSelector(state => state.place.currentPlaces);

  const [markers, setMarkers] = useState([]);
  const [isMarkerInList, setIsMarkerInList] = useState(undefined);
  const [navigateTo, setNavigateTo] = useState(undefined);
  const [overlayVisible, setOverlayVisible] = useState(true);

  const image = useRef(new window.kakao.maps.MarkerImage(greenMarker, new window.kakao.maps.Size(20, 34)));

  // list에 있는 place들의 Marker들을 표시
  useEffect(() => {
    // 기존 markers 삭제
    markers.forEach(marker => {
      if (!focusedMarker || marker.kakaoMapId !== focusedMarker.kakaoMapId) {
        marker.marker.setMap(null);
        marker.overlay.setMap(null);
      }
    });
    setIsMarkerInList(false);

    // 새 markers 추가
    const zoomLevel = kakaoMap.getLevel();

    const newMarkers = currentPlaces.map(place => {
      let marker;
      let overlay;
      // foucsedMarker로 이미 해당 맛집에 대한 marker가 있다면
      if (focusedMarker && focusedMarker.kakaoMapId === place.kakaoMapId) {
        marker = focusedMarker.marker;
        overlay = focusedMarker.overlay;
        setIsMarkerInList(true);
      // focusedMarker로 없어 새로이 추가하는 경우
      } else {
        marker = new window.kakao.maps.Marker({
          map: kakaoMap,
          position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
          image: image.current
        });

        overlay = new window.kakao.maps.CustomOverlay({
          map: kakaoMap,
          position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
          content: `<span class="${styles.markerLabel}">${place.name}</span>`,
          yAnchor: 0
        });
        if (zoomLevel >= 6) overlay.setVisible(false);
      }

      marker.addListener('click', () => {
        setNavigateTo(place.kakaoMapId);
      });

      return {
        kakaoMapId: place.kakaoMapId,
        marker: marker,
        overlay: overlay
      };
    });

    setMarkers(newMarkers);
  }, [currentPlaces]);

  useEffect(() => {
    if (navigateTo) {
      navigate(routeTo('PlaceInfoCard', { kakaoMapId: navigateTo }, location));
      setNavigateTo(undefined);
    }
  }, [navigateTo]);

  useEffect(() => {
    if (kakaoMap) {
      window.kakao.maps.event.addListener(kakaoMap, 'zoom_changed', () => {
        const zoomLevel = kakaoMap.getLevel();
        if (zoomLevel <= 5) setOverlayVisible(true);
        else setOverlayVisible(false);
      })
    }
  }, [kakaoMap]);

  useEffect(() => {
    if (overlayVisible !== undefined) {
      markers.forEach(marker => {
        if (marker.kakaoMapId !== focusedMarker?.kakaoMapId) marker.overlay.setVisible(overlayVisible);
      });
      setOverlayVisible(undefined);
    }
  }, [overlayVisible]);

  return (
    <FocusMarker
      markers={markers}
      listImage={image.current}
      isMarkerInList={isMarkerInList}
      setIsMarkerInList={setIsMarkerInList}
    />
  );
}
 
export default ListMarkers;