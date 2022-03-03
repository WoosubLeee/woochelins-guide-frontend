import { useEffect } from "react";
import { useSelector } from "react-redux";
import GoogleListMarkers from "./googleListMarkers/GoogleListMarkers";

const GoogleMap = ({ setNavigateToHome }) => {
  const googleMap = useSelector(state => state.map.googleMap);
  
  useEffect(() => {
    if (googleMap) {
      googleMap.addListener('click', () => {
        setNavigateToHome(true);
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          googleMap.setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      }
    }
  }, [googleMap]);

  return (
    <GoogleListMarkers />
  );
}
 
export default GoogleMap;