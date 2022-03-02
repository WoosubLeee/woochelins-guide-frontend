import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FocusMarker from "./focusMarker/FocusMarker";
import { routeTo } from "../../../../utils/functions/routes";

const ListMarkers = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const map = useSelector(state => state.map.map);
  const focusedMarker = useSelector(state => state.map.focusedMarker);
  const currentPlaces = useSelector(state => state.place.currentPlaces);

  const [markers, setMarkers] = useState([]);
  const [isMarkerInList, setIsMarkerInList] = useState(undefined);

  const icon = map && {
    path: "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z",
    fillOpacity: 1,
    fillColor: "#00833c",
    strokeWeight: 1,
    strokeColor: "#004d26",
    scale: 1.1,
    anchor: new window.google.maps.Point(12,22),
  };

  // list에 있는 place들의 Marker들을 표시
  useEffect(() => {
    if (map && currentPlaces) {
      // 기존 markers 삭제
      markers.forEach(marker => {
        marker.marker.setMap(null);
      })

      // 새 markers 추가
      const newMarkers = currentPlaces.map(place => {
        let marker;
        // foucsedMarker로 이미 해당 장소에 대한 marker가 있다면
        if (focusedMarker && focusedMarker.googleMapsId === place.googleMapsId) {
          marker = focusedMarker.marker;
          setIsMarkerInList(true);
        // focusedMarker로 없어 새로이 추가하는 경우
        } else {
          marker = new window.google.maps.Marker({
            position: {
              lat: place.latitude,
              lng: place.longitude
            },
            icon: icon,
            map: map
          });
        }

        marker.addListener('click', () => {
          navigate(routeTo('PlaceInfoCard', { googleMapsId: place.googleMapsId }, location));
        });

        return {
          googleMapsId: place.googleMapsId,
          marker: marker
        };
      });

      setMarkers(newMarkers);
    }
  }, [map, currentPlaces]);

  return (
    <FocusMarker markers={markers} listIcon={icon} isMarkerInList={isMarkerInList} setIsMarkerInList={setIsMarkerInList} />
  );
};
 
export default ListMarkers;