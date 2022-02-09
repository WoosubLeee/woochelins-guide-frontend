import styles from "./Map.module.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeLoad } from "./mapSlice";
import { Loader } from "@googlemaps/js-api-loader";

const Map = () => {
  const dispatch = useDispatch();
  const focusedPlace = useSelector(state => state.map.focusedPlace);

  const [markerFocused, setMarkerFocused] = useState(undefined);

  const map = useRef();
  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyADso4JNS7rJCc2DqF7dj5CJXBFaUXj61A',
      libraries: ['places', 'visualization'],
    });
    
    loader.load()
      .then(() => {
        dispatch(completeLoad());
        map.current = new window.google.maps.Map(document.getElementById('map'), {
          center: {
            lat: 37.48,
            lng: 126.95,
          },
          zoom: 14,
          disableDefaultUI: true,
        });
        
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            map.current.setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          }, () => {
            console.log('Error: The Geolocation service failed.');
          });
        }
      });
  }, []);
  
  useEffect(() => {
    if (focusedPlace) {
      map.current.setCenter(focusedPlace.position);

      if (markerFocused) {
        markerFocused.setMap(null);
      }

      setMarkerFocused(new window.google.maps.Marker({
        position: focusedPlace.position,
        map: map.current,
      }));
    }
  }, [focusedPlace]);

  return (
    <div id="map" className={styles.map} />
  );
}
 
export default Map;