import styles from "./GroupList.module.css";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import GroupListItem from "./groupListItem/GroupListItem";
import TopNavbar from "../../../../components/navbar/topNavbar/TopNavbar";
import { routeTo } from "../../../../utils/functions/routes";

const GroupList = () => {
  const location = useLocation();

  const listData = useSelector(state => state.map.listData);
  const groups = useSelector(state => state.group.groups);
  const placeLists = useSelector(state => state.group.placeLists);

  return (
    <div className="full-screen-white">
      {/* TopNavbar */}
      {listData &&
        <TopNavbar
          header={
            <div className="topnavbar-header">
              <Link to={routeTo('Home', null, location)} className={styles.header}>
                <span>{listData.isGroup ? "모임" : "내 리스트"}</span>
                {listData.name}<i className="bi bi-chevron-down text-success ms-1" />
              </Link>
            </div>
          }
          backBtnTo={-1}
        />
      }

      {/* 모임 목록 */}
      <div className="body-without-topnavbar pt-2">
        <h2 className={styles.h2}>
          모임
          <Link to={routeTo('GroupCreate', null, location)}>
            <i className="bi bi-plus-circle-fill"></i>
          </Link>
        </h2>
        <ul className={styles.ul}>
          {groups.map((group, i) => {
            return (
              <GroupListItem key={i} group={group} />
            )
          })}
        </ul>
        {/* 내 리스트 목록 */}
        <h2 className={styles.h2}>
          내 리스트
          <Link to={routeTo('PlaceListCreate', null, location)}>
            <i className="bi bi-plus-circle-fill"></i>
          </Link>
        </h2>
        <ul className={styles.ul}>
          {placeLists.map((placeList, i) => {
            return (
              <GroupListItem key={i} group={placeList} />
            )
          })}
        </ul>
      </div>
    </div>
  );
}
 
export default GroupList;