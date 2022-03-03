import { useEffect } from "react";
import { useSelector } from "react-redux";

const NaverListMarkers = () => {
  const naverMap = useSelector(state => state.map.naverMap);
  const currentPlaces = useSelector(state => state.place.currentPlaces);

  useEffect(() => {
    if (naverMap && currentPlaces) {
      const newMarkers = currentPlaces.map(place => {
        let marker;
        if (false) {

        } else {
          marker = new window.naver.maps.Marker({
            map: naverMap,
            position: {
              lat: place.latitude,
              lng: place.longitude
            },
          })
        }
      })
    }
  }, [naverMap, currentPlaces])

  return (
    <></>
  );
}
 
export default NaverListMarkers;