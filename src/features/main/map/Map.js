import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mapApiLoaded, setGoogleMap } from "./mapSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "@googlemaps/js-api-loader";
import GoogleMap from "./googleMap/GoogleMap";
import KakaoMap from "./kakaoMap/KakaoMap";
import { routeTo } from "../../../utils/functions/routes";

const Map = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isMapApiLoaded = useSelector(state => state.map.isMapApiLoaded);
  const googleMap = useSelector(state => state.map.googleMap);
  const zoomLevel = useSelector(state => state.map.zoomLevel);

  const [currentMap, setCurrentMap] = useState('kakao');
  const [navigateToHome, setNavigateToHome] = useState(false);

  // Google Map은 search와 placesService 등에 사용되므로
  // currentMap이 무엇인지에 관계없이 load시켜놓는다.
  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyADso4JNS7rJCc2DqF7dj5CJXBFaUXj61A',
      libraries: ['places', 'visualization', 'geometry'],
    });
    
    loader.load()
      .then(() => {
        dispatch(mapApiLoaded());
      });
  }, []);
  
  useEffect(() => {
    if (isMapApiLoaded) {
      const googleMap = new window.google.maps.Map(document.getElementById('googleMap'), {
        center: {
          lat: 37.48,
          lng: 126.95,
        },
        disableDefaultUI: true,
        clickableIcons: false,
      })
      dispatch(setGoogleMap(googleMap));
    }
  }, [isMapApiLoaded]);

  useEffect(() => {
    if (navigateToHome) {
      navigate(routeTo('Home', null, location));
      setNavigateToHome(false);
    }
  }, [navigateToHome]);

  // 카카오맵 -> 구글맵 전환 시, zoom을 미리 어느정도 맞춰놓지 않으면
  // 너무 한 번에 많이 변해서 이질감이 느껴져 미리 반영
  useEffect(() => {
    if (googleMap && zoomLevel && currentMap === 'kakao') {
      googleMap.setZoom(20 - zoomLevel.level);
    }
  }, [googleMap, zoomLevel]);

  return (
    <div className="h-100">
      {currentMap === 'kakao' &&
        <div id="kakaoMap" className="h-100">
          <KakaoMap setCurrentMap={setCurrentMap} setNavigateToHome={setNavigateToHome} />
        </div>
      }
      <div id="googleMap" className={`h-100 ${currentMap === 'kakao' && styles.googleMap}`}>
        {currentMap === 'google' && googleMap && <GoogleMap setCurrentMap={setCurrentMap} setNavigateToHome={setNavigateToHome} />}
      </div>
    </div>
  );
}
 
export default Map;