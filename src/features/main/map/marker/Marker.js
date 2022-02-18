import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { focusPlace, setListData } from "../mapSlice";
import { useNavigate } from "react-router-dom";
import { requestGetPlaceListDefault } from "../../../../apis/placeApi";

const Marker = ({ map }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listData = useSelector(state => state.map.listData);
  const focusedPlace = useSelector(state => state.map.focusedPlace);

  const [markers, setMarkers] = useState([]);
  const [markerFocused, setMarkerFocused] = useState(undefined);

  useEffect(() => {
    requestGetPlaceListDefault()
      .then(data => {
        dispatch(setListData(data));
      });
  }, []);

  // list에 있는 place들의 Marker들을 표시
  useEffect(() => {
    if (map && listData) {
      const places = listData.isGroup ? listData.place_list.places : listData.places;

      // 기존에 표시된 Marker들 중 list에서 삭제된 것들 제거
      const googleMapsIds = places.map(place => place.google_maps_id);
      const newMarkers = markers.filter(marker => {
        if (googleMapsIds.includes(marker.googleMapsId)) {
          return true;
        }
        marker.marker.setMap(null);
        return false;
      });

      // 기존 Marker들과 비교해 새로운 것들은 추가
      places.forEach(place => {
        if (!markers.map(marker => marker.googleMapsId).includes(place.google_maps_id)) {
          const marker = new window.google.maps.Marker({
            position: {
              lat: place.latitude,
              lng: place.longitude
            },
            map: map
          });

          marker.addListener('click', () => {
            navigate('/main/place');
            
            const payload = {
              googleMapsId: place.google_maps_id,
              name: place.name,
              location: {
                lat: place.latitude,
                lng: place.longitude
              }
            };
            dispatch(focusPlace(payload));
          });

          newMarkers.push({
            googleMapsId: place.google_maps_id,
            marker: marker
          });
        }
      });
      setMarkers(newMarkers);
    }
  }, [map, listData]);
  
  useEffect(() => {
    if (markerFocused) {
      markerFocused.setMap(null);
    }
    if (focusedPlace) {
      setMarkerFocused(new window.google.maps.Marker({
        position: focusedPlace.location,
        map: map,
      }));
      map.setCenter(focusedPlace.location);
    }
  }, [focusedPlace]);

  return (
    <></>
  );
};
 
export default Marker;