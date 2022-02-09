import styles from "./Search.module.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { focusPlace } from "../map/mapSlice";

const Search = () => {
  const dispatch = useDispatch();
  const isLoaded = useSelector(state => state.map.isLoaded);

  const [inputVal, setInputVal] = useState('');

  const autoComplete = useRef();
  useEffect(() => {
    if (isLoaded) {
      const options = {
        fields: ['geometry', 'name']
      }
      autoComplete.current = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'), options);
      autoComplete.current.addListener('place_changed', handlePlaceChanged);
    }    
  }, [isLoaded]);

  const handlePlaceChanged = useCallback(() => {
    const place = autoComplete.current.getPlace();
    const payload = {
      name: place.name,
      position: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
    };
    dispatch(focusPlace(payload));
    setInputVal(place.name);
  }, []);

  return (
    <div className={styles.search}>
      <input id="autocomplete" type="search" value={inputVal} onChange={e => setInputVal(e.target.value)} />
      <button>검색</button>
    </div>
  );
}
 
export default Search;