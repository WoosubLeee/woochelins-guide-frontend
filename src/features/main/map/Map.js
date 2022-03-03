import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mapApiLoaded, setGoogleMap } from "./mapSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "@googlemaps/js-api-loader";
import NaverMap from "./naverMap/NaverMap";
import GoogleMap from "./googleMap/GoogleMap";
import { routeTo } from "../../../utils/functions/routes";

const Map = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isMapApiLoaded = useSelector(state => state.map.isMapApiLoaded);

  const [currentMap, setCurrentMap] = useState('naver');
  const [navigateToHome, setNavigateToHome] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyADso4JNS7rJCc2DqF7dj5CJXBFaUXj61A',
      libraries: ['places', 'visualization', 'geometry'],
      version: "beta"
    });
    
    loader.load()
      .then(() => {
        dispatch(mapApiLoaded());
      });
  }, []);
  
  useEffect(() => {
    if (isMapApiLoaded) {
      const newMap = new window.google.maps.Map(document.getElementById('googleMap'), {
        center: {
          lat: 37.48,
          lng: 126.95,
        },
        zoom: 13,
        disableDefaultUI: true,
      })
      dispatch(setGoogleMap(newMap));
    }
  }, [isMapApiLoaded]);

  useEffect(() => {
    if (navigateToHome) {
      navigate(routeTo('Home', null, location));
      setNavigateToHome(false);
    }
  }, [navigateToHome]);

  return (
    <div className="h-100">
      {currentMap === 'naver' &&
        <div id="naverMap" className="h-100">
          <NaverMap setNavigateToHome={setNavigateToHome} />
        </div>
      }
      <div id="googleMap" className={`h-100 ${currentMap === 'naver' && styles.googleMap}`}>
        {currentMap === 'google' && <GoogleMap setNavigateToHome={setNavigateToHome} />}
      </div>
    </div>
  );
}
 
export default Map;