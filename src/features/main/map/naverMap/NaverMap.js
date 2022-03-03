import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNaverMap } from "../mapSlice";
import NaverListMarkers from "./naverListMarkers/NaverListMarkers";

const NaverMap = ({ setNavigateToHome }) => {
  const dispatch = useDispatch();

  const naverMap = useSelector(state => state.map.naverMap);

  useEffect(() => {
    const newMap = new window.naver.maps.Map('naverMap', {
      zoom: 12,
      mapDataControl: false,
      scaleControl: false,
    });
    dispatch(setNaverMap(newMap));
      
    newMap.addListener('click', () => {
      setNavigateToHome(true);
    });
  }, []);

  useEffect(() => {
    if (naverMap && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        naverMap.setCenter(new window.naver.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        ));
      });
    }
  }, [naverMap]);

  return (
    <NaverListMarkers />
  );
}
 
export default NaverMap;