import styles from "./Search.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PredictionsItem from "./predictionsItem/PredictionsItem";

const Search = ({ setIsSearching }) => {
  
  const isMapApiLoaded = useSelector(state => state.map.isMapApiLoaded);
  const map = useSelector(state => state.map.map);

  const [autoComplete, setAutoComplete] = useState(undefined);
  const [sessionToken, setSessionToken] = useState(undefined);
  const [placesService, setPlacesService] = useState(undefined);
  const [inputVal, setInputVal] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [curretPosition, setCurrentPosition] = useState(undefined);

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
    if (isMapApiLoaded) {
      setAutoComplete(new window.google.maps.places.AutocompleteService());
      setSessionToken(new window.google.maps.places.AutocompleteSessionToken());
    }
  }, [isMapApiLoaded]);

  useEffect(() => {
    if (map) {
      setPlacesService(new window.google.maps.places.PlacesService(map));
    }
  }, [map]);

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
            <PredictionsItem key={i} prediction={prediction} service={placesService} sessionToken={sessionToken} />
          )
        })}
      </div>
    </div>
  );
};
 
export default Search;