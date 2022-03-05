import styles from './GoogleListMarkers.module.css';
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGoogleFocusedMarker } from '../../mapSlice';
import { useLocation, useNavigate } from "react-router-dom";
import GoogleFocusMarker from "./googleFocusMarker/GoogleFocusMarker";
import { routeTo } from "../../../../../utils/functions/routes";
import greenMarker from "../../../../../utils/images/green-marker.png";

const GoogleListMarkers = ({ switchToKakao }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const googleMap = useSelector(state => state.map.googleMap);
  const googleFocusedMarker = useSelector(state => state.map.googleFocusedMarker);
  const currentPlaces = useSelector(state => state.place.currentPlaces);

  const [markers, setMarkers] = useState([]);
  const [isMarkerInList, setIsMarkerInList] = useState(undefined);
  const [navigateTo, setNavigateTo] = useState(undefined);

  const icon = useRef({
    url: greenMarker,
    scaledSize: new window.google.maps.Size(20, 34),
    labelOrigin: new window.google.maps.Point(12, 45),
  });
  const label = {
    color: "black",
    fontSize: "14px",
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: "500",
    className: styles.markerLabel
  };

  // list에 있는 place들의 Marker들을 표시
  useEffect(() => {
    // 기존 markers 삭제
    markers.forEach(marker => {
      marker.marker.setMap(null);
    })

    // 새 markers 추가
    const newMarkers = currentPlaces.map(place => {
      let marker;
      // foucsedMarker로 이미 해당 장소에 대한 marker가 있다면
      if (googleFocusedMarker && googleFocusedMarker.googleMapsId === place.googleMapsId) {
        marker = googleFocusedMarker.marker;
        setIsMarkerInList(true);
      // focusedMarker로 없어 새로이 추가하는 경우
      } else {
        marker = new window.google.maps.Marker({
          position: {
            lat: place.latitude,
            lng: place.longitude
          },
          icon: icon.current,
          map: googleMap,
          label: {
            ...label,
            text: place.name
          }
        });
      }

      marker.addListener('click', () => {
        setNavigateTo(place.googleMapsId);
      });

      return {
        googleMapsId: place.googleMapsId,
        marker: marker
      };
    });

    setMarkers(newMarkers);
  }, [currentPlaces]);

  useEffect(() => {
    if (navigateTo) {
      navigate(routeTo('PlaceInfoCard', { googleMapsId: navigateTo }, location));
      setNavigateTo(undefined);
    }
  }, [navigateTo]);

  useEffect(() => {
    if (switchToKakao) {
      if (googleFocusedMarker) {
        if (!isMarkerInList) googleFocusedMarker.marker.setMap(null);
        dispatch(setGoogleFocusedMarker(undefined));
      }
      markers.forEach(marker => {
        marker.marker.setMap(null);
      });
    }
  }, [switchToKakao]);

  return (
    <GoogleFocusMarker
      markers={markers}
      listIcon={icon.current}
      label={label}
      isMarkerInList={isMarkerInList}
      setIsMarkerInList={setIsMarkerInList}
    />
  );
};
 
export default GoogleListMarkers;