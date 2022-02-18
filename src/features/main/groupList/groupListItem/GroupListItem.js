import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setListData } from "../../map/mapSlice";

const GroupListItem = ({ placeList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    const data = {
      ...placeList,
      isGroup: false
    };
    if ('place_list' in placeList) {
      data.isGroup = true;
    }
    dispatch(setListData(data));
    console.log(data);
    navigate('/main');
  };

  return (
    <li onClick={handleClick}>{placeList.name}</li>
  );
}
 
export default GroupListItem;