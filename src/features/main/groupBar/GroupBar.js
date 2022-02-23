import styles from "./GroupBar.module.css";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { createPath } from "../../../utils/functions/common";

const GroupBar = () => {
  const location = useLocation();

  const listData = useSelector(state => state.map.listData);

  return (
    <>
      {listData &&
        <Link to={createPath("/main/group/list", location)} className={styles.container}>
          {listData.name}<i className="bi bi-chevron-down"></i>
        </Link>
      }
    </>
  );
}
 
export default GroupBar;