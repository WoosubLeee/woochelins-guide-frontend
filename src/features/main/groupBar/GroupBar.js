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
        <div className={styles.container}>
          {listData.isGroup ? (
            <Link to={createPath("/main/group/info", location)}>
              <i className="fa-solid fa-users mx-3"></i>
            </Link>
          ) : (
            <></>
          )}
          <Link to={createPath("/main/place/list", location)}>
            {listData.name}<i className="bi bi-chevron-down"></i>
          </Link>
        </div>
      }
    </>
  );
}
 
export default GroupBar;