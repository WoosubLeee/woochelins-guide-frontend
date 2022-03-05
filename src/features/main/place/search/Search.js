import styles from "./Search.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PredictionsItem from "./predictionsItem/PredictionsItem";
import { setSessionToken } from "../placeSlice";

const Search = ({ setIsSearching }) => {
  const dispatch = useDispatch();
  
  const sessionToken = useSelector(state => state.place.sessionToken);

  const [autoComplete, setAutoComplete] = useState(undefined);
  const [inputVal, setInputVal] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [curretPosition, setCurrentPosition] = useState(undefined);
  
  // Google Maps PlaceAutocomplete를 이용한 검색
  useEffect(() => {
    setAutoComplete(new window.google.maps.places.AutocompleteService());
    dispatch(setSessionToken(new window.google.maps.places.AutocompleteSessionToken()));
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (autoComplete) {
      const autoCompleteProps = {
        input: inputVal,
        types: [
          'establishment',
        ],
        sessionToken: sessionToken
      };
      if (curretPosition) {
        // location을 기준으로 radius(m 단위) 만큼의 구역에 대해 biased 된 predictons을 내놓음
        autoCompleteProps.location = new window.google.maps.LatLng(curretPosition.lat, curretPosition.lng);
        autoCompleteProps.radius = 10000;
        // distance_meters를 계산하는 기준점
        autoCompleteProps.origin = curretPosition;
      }
      autoComplete.getPlacePredictions(autoCompleteProps, displaySuggestions);
    }
  }, [inputVal]);
  
  const displaySuggestions = (predictions, status) => {
    let newPredictions = [];
    if (predictions) {
      newPredictions = predictions.filter(prediction => {
        return prediction.types.some(type => {
          return ['food', 'bakery', 'bar', 'cafe', 'meal_delivery', 'meal_takeaway', 'restaurant'].includes(type);
        });
      });
    }
    setPredictions(newPredictions);
  };

  return (
    <div className={`bg-white ${styles.container}`}>
      {/* search bar */}
      <div className={styles.searchBarWrap}>
        <i onClick={() => setIsSearching(false)} className={`bi bi-arrow-left ${styles.backIcon}`}></i>
        <div className={styles.autoCompleteWrap}>
          <i className="bi bi-search"></i>
          <input
            id="autocomplete"
            type="search"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            className={styles.autoComplete}
            autoComplete="off"
          />
          <i onClick={() => {
            setInputVal("");
            setPredictions([]);
          }} className={`fa-solid fa-circle-xmark ${styles.clearIcon}`} />
        </div>
      </div>
      {/* prediction list */}
      <div>
        {predictions.map((prediction, i) => {
          return (
            <PredictionsItem
              key={i}
              prediction={prediction}
              setIsSearching={setIsSearching}
              sessionToken={sessionToken}
            />
          )
        })}
      </div>
    </div>
  );
};
 
export default Search;