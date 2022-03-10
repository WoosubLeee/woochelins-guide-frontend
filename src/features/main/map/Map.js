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
    const newMap = new window.kakao.maps.Map(document.getElementById('map'), {
      // 기본 위치(위치 정보 조회 안될시)는 서울대입구역 근처
      center: new window.kakao.maps.LatLng(37.48, 126.95),
      level: 7
    });

    // 위치 조회 동의 시, 현위치 근처로 center 변경
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        newMap.setCenter(new window.kakao.maps.LatLng(position.coords.latitude, position.coords.longitude));
      });
    }
    
    // map에 marker가 없는 빈 구역 click 시 home으로 되돌아 오도록
    newMap.addListener('click', () => {
      // addListener에서 바로 callback function을 작성할 경우 location이 callback이 선언될 때로 고정되어
      // 제대로 반영되지 않는 문제 발생.
      // 이에 useState(navigateToHome), useEffect를 활용하여 해결
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