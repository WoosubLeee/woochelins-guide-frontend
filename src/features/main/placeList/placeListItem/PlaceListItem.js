import { useDispatch } from "react-redux";
import { focusPlace } from "../../map/mapSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { createPath } from "../../../../utils/functions/common";

const PlaceListItem = ({ place }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const payload = {
      googleMapsId: place.googleMapsId,
      name: place.name,
      location: {
        lat: place.latitude,
        lng: place.longitude
      }
    };
    dispatch(focusPlace(payload));
    navigate(createPath(`/main/place/${place.googleMapsId}`, location));
  }

  return (
    <li onClick={handleClick}>
      {place.name}
    </li>
  );
}
 
export default PlaceListItem;