import { useLocation, useNavigate } from "react-router-dom";
import { createPath } from "../../../../utils/functions/common";

const PlaceListItem = ({ place }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(createPath(`/main/place/${place.googleMapsId}`, location));
  }

  return (
    <li onClick={handleClick}>
      {place.name}
    </li>
  );
}
 
export default PlaceListItem;