import styles from "./Search.module.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { focusPlace } from "../map/mapSlice";
import { createPath } from "../../../utils/functions/common";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isMapApiLoaded = useSelector(state => state.map.isMapApiLoaded);
  const focusedPlace = useSelector(state => state.map.focusedPlace);

  const [inputVal, setInputVal] = useState('');

  const autoComplete = useRef();
  useEffect(() => {
    if (isMapApiLoaded) {
      const options = {
        fields: [
          'place_id',
          'name',
          'geometry.location',
          'type',
        ],
        types: [
          'establishment',
        ],
      };
      autoComplete.current = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'), options);
      autoComplete.current.addListener('place_changed', handlePlaceChanged);
    }    
  }, [isMapApiLoaded]);

  useEffect(() => {
    if (focusedPlace) {
      setInputVal(focusedPlace.name);
    } else {
      setInputVal('');
    }
  }, [focusedPlace]);

  const handlePlaceChanged = useCallback(() => {
    const place = autoComplete.current.getPlace();
    
    const availableTypes = ['food', 'bakery', 'bar', 'cafe', 'meal_delivery', 'meal_takeaway', 'restaurant'];
    if (availableTypes.some(type => place.types.includes(type))) {
      const payload = {
        googleMapsId: place.place_id,
        name: place.name,
        location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      };
      dispatch(focusPlace(payload));
      navigate(createPath(`/main/place/${place.place_id}/`, location));
    } else {
      alert('식당, 카페를 선택해주세요.'); 
    }
  }, []);

  return (
    <div className={styles.search}>
      <input id="autocomplete" type="search" value={inputVal} onChange={e => setInputVal(e.target.value)} />
      <button>검색</button>
    </div>
  );
}
 
export default Search;