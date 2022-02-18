import { useDispatch } from "react-redux";
import { focusPlace } from "../../map/mapSlice";
import { useNavigate } from "react-router-dom";

const PlaceListItem = ({ place }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/main/place');
    
    const payload = {
      googleMapsId: place.google_maps_id,
      name: place.name,
      location: {
        lat: place.latitude,
        lng: place.longitude
      }
    };
    dispatch(focusPlace(payload));
  }

  return (
    <li onClick={handleClick}>
      {place.name}
    </li>
  );
}
 
export default PlaceListItem;