import { useDispatch } from "react-redux";
import { useNavigate, createSearchParams } from "react-router-dom";
import { setListData } from "../../map/mapSlice";

const GroupListItem = ({ group }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    const data = {
      ...group,
      isGroup: false
    };
    if ('placeList' in group) {
      data.isGroup = true;
    }
    dispatch(setListData(data));

    const type = data.isGroup ? 'group' : 'placelist';
    const search = `?${createSearchParams({
      type: type,
      id: data.id
    })}`
    navigate({
      pathname: '/main',
      search: search
    });
  };

  return (
    <li onClick={handleClick}>{group.name}</li>
  );
}
 
export default GroupListItem;