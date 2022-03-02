import styles from "./GroupListItem.module.css";
import { useDispatch } from "react-redux";
import { setCurrentGroup } from "../../groupSlice";
import { useNavigate, createSearchParams } from "react-router-dom";
import { routeTo } from "../../../../../utils/functions/routes";

const GroupListItem = ({ group }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(setCurrentGroup(group));

    const type = group.isGroup ? 'group' : 'placelist';
    const search = `?${createSearchParams({
      type: type,
      id: group.id
    })}`
    navigate(routeTo('Home', null, { search: search }));
  };

  return (
    <li onClick={handleClick} className={styles.li}>
      <div>
        <h3 className={styles.h3}>
          {group.name}
          <span>{group.isGroup && <><i className="bi bi-people-fill" />{group.members.length}</>}</span>
        </h3>
        <span className={styles.span}>
          장소 {group.isGroup ? group.placeList.places.length : group.places.length}곳
        </span>
      </div>
    </li>
  );
}
 
export default GroupListItem;