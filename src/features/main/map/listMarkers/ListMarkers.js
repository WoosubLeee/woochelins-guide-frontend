import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FocusMarker from "./focusMarker/FocusMarker";
import { createPath } from "../../../../utils/functions/common";

const ListMarkers = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const map = useSelector(state => state.map.map);
  const focusedMarker = useSelector(state => state.map.focusedMarker);
  const currentPlaces = useSelector(state => state.place.currentPlaces);

  const [markers, setMarkers] = useState([]);
  const [isMarkerInList, setIsMarkerInList] = useState(undefined);

  const icon = map && {
    path: "M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z",
    fillColor: "#198754",
    fillOpacity: 1,
    strokeWeight: 0,
    scale: 1.4,
    anchor: new window.google.maps.Point(9, 21),
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
          navigate(createPath(`/main/home/${place.googleMapsId}`, location));
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