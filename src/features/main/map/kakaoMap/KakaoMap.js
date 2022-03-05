import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setKakaoFocusedMarker, setKakaoMap, setMapCenter, setZoomLevel } from "../mapSlice";
import KakaoListMarkers from "./kakaoListMarkers/KakaoListMarkers";
import { isInKorea } from "../../../../utils/functions/common";

const KakaoMap = ({ setCurrentMap, setNavigateToHome }) => {
  const dispatch = useDispatch();

  const kakaoMap = useSelector(state => state.map.kakaoMap);
  const mapCenter = useSelector(state => state.map.mapCenter);
  const zoomLevel = useSelector(state => state.map.zoomLevel);

  const [switchToGoogle, setSwitchToGoogle] = useState(false);

  useEffect(() => {
    let center = {
      lat: 37.48,
      lng: 126.95
    };
    if (mapCenter) {
      center.lat = mapCenter.lat;
      center.lng = mapCenter.lng;
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        center.lat = position.coords.latitude;
        center.lng = position.coords.longitude;
      });
    }

    const level = zoomLevel ? zoomLevel.map === 'google' ? 20 - zoomLevel.level : zoomLevel.level : 7;
    const newMap = new window.kakao.maps.Map(document.getElementById('kakaoMap'), {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level: level
    });
    dispatch(setKakaoMap(newMap));
    dispatch(setZoomLevel({
      map: 'kakao',
      level: level
    }));
    
    newMap.addListener('click', () => {
      setNavigateToHome(true);
    });

    const handleCenterChanged = () => {
      const center = newMap.getCenter();
      if (!isInKorea(center.Ma, center.La)) {
        setSwitchToGoogle(true);
      }
    };
    const handleZoomChanged = () => {
      const newLevel = newMap.getLevel();
      dispatch(setZoomLevel({
        map: 'kakao',
        level: newLevel
      }));
      if (newLevel >= 13) {
        setSwitchToGoogle(true);
      }
    };

    window.kakao.maps.event.addListener(newMap, 'center_changed', handleCenterChanged);
    window.kakao.maps.event.addListener(newMap, 'zoom_changed', handleZoomChanged);

    return () => {
      dispatch(setKakaoMap(undefined));
      dispatch(setKakaoFocusedMarker(undefined));
      window.kakao.maps.event.removeListener(newMap, 'center_changed', handleCenterChanged);
      window.kakao.maps.event.removeListener(newMap, 'zoom_changed', handleZoomChanged);
    };
  }, []);

  useEffect(() => {
    if (switchToGoogle) {
      const center = kakaoMap.getCenter();
      dispatch(setMapCenter({
        lat: center.Ma,
        lng: center.La
      }));
      setCurrentMap('google');
    }
  }, [switchToGoogle]);

  return (
    <>
      {kakaoMap && <KakaoListMarkers />}
    </>
  );
}
 
export default KakaoMap;