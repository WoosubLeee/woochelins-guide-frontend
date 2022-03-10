import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setKakaoMap } from "./mapSlice";
import { useLocation, useNavigate } from "react-router-dom";
import ListMarkers from "./listMarkers/ListMarkers";
import { routeTo } from "../../../utils/functions/routes";

const Map = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const kakaoMap = useSelector(state => state.map.kakaoMap);

  useEffect(() => {
    let center = {
      lat: 37.48,
      lng: 126.95
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        center.lat = position.coords.latitude;
        center.lng = position.coords.longitude;
      });
    }

    const newMap = new window.kakao.maps.Map(document.getElementById('map'), {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level: 7
    });
    
    newMap.addListener('click', () => {
      setNavigateToHome(true);
    });

    dispatch(setKakaoMap(newMap));
  }, []);

  const [navigateToHome, setNavigateToHome] = useState(false);

  useEffect(() => {
    if (navigateToHome) {
      navigate(routeTo('Home', null, location));
      setNavigateToHome(false);
    }
  }, [navigateToHome]);

  return (
    <div id="map" className="h-100">
      {kakaoMap && <ListMarkers />}
    </div>
  );
}
 
export default Map;