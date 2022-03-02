import styles from "./GroupListItem.module.css";
import { useDispatch } from "react-redux";
import { setCurrentGroup } from "../../groupSlice";
import { useNavigate, createSearchParams } from "react-router-dom";
import peopleImg from "./people.png";
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
      {group.isGroup && <img src={peopleImg} alt="" className={styles.img} />}
      <span className={styles.span}>{group.name}</span>
    </li>
  );
}
 
export default GroupListItem;