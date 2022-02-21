import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { focusPlace, setListData, setListUpdateNeeded } from "../mapSlice";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { requestGetPlaceList, requestGetPlaceListDefault } from "../../../../apis/placeApi";
import { requestGetGroup } from "../../../../apis/groupApi";
import { createPath } from "../../../../utils/functions/common";

const Marker = ({ map }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const listData = useSelector(state => state.map.listData);
  const listUpdateNeeded = useSelector(state => state.map.listUpdateNeeded);
  const focusedPlace = useSelector(state => state.map.focusedPlace);

  const [markers, setMarkers] = useState([]);
  const [markerFocused, setMarkerFocused] = useState(undefined);

  useEffect(() => {
    if (listUpdateNeeded) {
      const fetchData = () => {
        // query로 list type(Group인지, PlaceList)과 id를 확인하고
        // 없으면 user의 default PlaceList 표시
        const queries = queryString.parse(location.search);
        if ('type' in queries && 'id' in queries) {
          if (queries.type === 'group') {
            return requestGetGroup(queries.id);
          } else if (queries.type === 'placelist') {
            return requestGetPlaceList(queries.id);
          }
        } else {
          return requestGetPlaceListDefault();
        }
      };

      fetchData()
        .then(data => {
          const newData = {
            ...data,
            isGroup: false
          };
          if ('placeList' in data) {
            newData.isGroup = true;
          }

          dispatch(setListData(newData));
          dispatch(setListUpdateNeeded(false));
        });
    }
  }, [listUpdateNeeded]);

  // list에 있는 place들의 Marker들을 표시
  useEffect(() => {
    if (map && listData) {
      const places = listData.isGroup ? listData.placeList.places : listData.places;

      // 기존에 표시된 Marker들 중 list에서 삭제된 것들 제거
      const googleMapsIds = places.map(place => listData.isgroup ? place.place.googleMapsId : place.googleMapsId);
      const newMarkers = markers.filter(marker => {
        if (googleMapsIds.includes(marker.googleMapsId)) {
          return true;
        }
        marker.marker.setMap(null);
        return false;
      });

      // 기존 Marker들과 비교해 새로운 것들은 추가
      places.forEach(place => {
        if (!markers.map(marker => marker.googleMapsId).includes(place.googleMapsId)) {
          const marker = new window.google.maps.Marker({
            position: {
              lat: place.latitude,
              lng: place.longitude
            },
            map: map
          });

          marker.addListener('click', () => {
            navigate(createPath(`/main/place/${place.googleMapsId}`, location));            
            dispatch(focusPlace(place));
          });

          newMarkers.push({
            googleMapsId: place.googleMapsId,
            marker: marker
          });
        }
      });
      setMarkers(newMarkers);
    }
  }, [map, listData]);
  
  useEffect(() => {
    if (map) {
      if (markerFocused) {
        markerFocused.setMap(null);
      }
      if (focusedPlace) {
        const position = {
          lat: focusedPlace.latitude,
          lng: focusedPlace.longitude
        };
        setMarkerFocused(new window.google.maps.Marker({
          position: position,
          map: map,
        }));
        map.setCenter(position);
      }
    }
  }, [map, focusedPlace]);

  return (
    <></>
  );
};
 
export default Marker;