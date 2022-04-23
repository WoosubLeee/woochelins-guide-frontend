import styles from "./SearchResultItem.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFocusedPlace } from "../../../placeSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { requestSavePlace } from "../../../../../../apis/placeApi";
import { routeTo } from "../../../../../../utils/functions/routes";

const SearchResultItem = ({ result }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const kakaoMap = useSelector(state => state.map.kakaoMap);

  // 현위치 - 식당 간 거리
  const [distance, setDistance] = useState('');
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      const placePosition = {
        lat: result.y,
        lng: result.x
      };

      const distance = window.google.maps.geometry.spherical.computeDistanceBetween(currentPosition, placePosition);
      if (distance > 1000) {
        setDistance((distance / 1000).toFixed(1) + 'km');
      } else {
        setDistance(distance.toFixed(0) + 'm');
      }
    });
  }, [result]);

  const handleClick = () => {
    const place = {
      kakaoMapId: result.id,
      name: result.placeName,
      latitude: result.y,
      longitude: result.x,
      address: result.roadAddressName,
      kakaoMapUrl: result.placeUrl
    };
    if (result.phone) place.phone = result.phone;
    dispatch(setFocusedPlace(place));
    requestSavePlace(place);
    kakaoMap.setLevel(4);
    navigate(routeTo('PlaceInfoCard', { kakaoMapId: result.id }, location));
  };
  
  return (
    <li onClick={handleClick} className={styles.li}>
      <div>
        <h3 className={styles.placeName}>{result.placeName}</h3>
        <span className={styles.placeInfo}>{result.categoryName}</span>
        <br />
        <span className={styles.placeInfo}>{result.roadAddressName}</span>
      </div>
      <span className={styles.distance}>{distance}</span>
    </li>
  );
}
 
export default SearchResultItem;