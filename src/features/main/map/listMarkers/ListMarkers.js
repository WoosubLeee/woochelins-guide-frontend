import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setListData, setListUpdateNeeded } from "../mapSlice";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import FocusMarker from "./focusMarker/FocusMarker";
import { requestGetPlaceList, requestGetPlaceListDefault } from "../../../../apis/placeApi";
import { requestGetGroup } from "../../../../apis/groupApi";
import { createPath } from "../../../../utils/functions/common";

const ListMarkers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const map = useSelector(state => state.map.map);
  const listData = useSelector(state => state.map.listData);
  const listUpdateNeeded = useSelector(state => state.map.listUpdateNeeded);

  const [markers, setMarkers] = useState([]);

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
            icon: icon,
            map: map
          });

          marker.addListener('click', () => {
            navigate(createPath(`/main/home/${place.googleMapsId}`, location));
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

  return (
    <FocusMarker markers={markers} listIcon={icon} />
  );
};
 
export default ListMarkers;