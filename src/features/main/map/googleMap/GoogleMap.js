import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMapCenter, setZoomLevel } from "../mapSlice";
import GoogleListMarkers from "./googleListMarkers/GoogleListMarkers";
import { isInKorea } from "../../../../utils/functions/common";

const GoogleMap = ({ setCurrentMap, setNavigateToHome }) => {
  const dispatch = useDispatch();
  
  const googleMap = useSelector(state => state.map.googleMap);
  const mapCenter = useSelector(state => state.map.mapCenter);
  const zoomLevel = useSelector(state => state.map.zoomLevel);

  const [switchToKakao, setSwitchToKakao] = useState(false);
  
  useEffect(() => {
    if (googleMap) {
      googleMap.setCenter(mapCenter);
      googleMap.setZoom(zoomLevel.map === 'kakao' ? 20 - zoomLevel.level : zoomLevel.level);

      googleMap.addListener('click', () => {
        setNavigateToHome(true);
      });

      const handleChanged = () => {
        const center = googleMap.getCenter();
        const zoomLevel = googleMap.getZoom();
        if (isInKorea(center.lat(), center.lng()) && zoomLevel >= 8) {
          setSwitchToKakao(true);
        }
      };

      const centerListener = googleMap.addListener('center_changed', handleChanged);
      const zoomListener = googleMap.addListener('zoom_changed', handleChanged);

      return () => {
        centerListener.remove();
        zoomListener.remove();
      };
    }
  }, [googleMap]);

  useEffect(() => {
    if (switchToKakao) {
      const center = googleMap.getCenter();
      const zoomLevel = googleMap.getZoom();
      dispatch(setMapCenter({
        lat: center.lat(),
        lng: center.lng()
      }));
      dispatch(setZoomLevel({
        map: 'google',
        level: zoomLevel
      }));
      setCurrentMap('kakao');
    }
  }, [switchToKakao]);

  return (
    <GoogleListMarkers />
  );
}
 
export default GoogleMap;