import styles from "./GroupList.module.css";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import GroupListItem from "./groupListItem/GroupListItem";
import TopNavbar from "../../../../components/navbar/topNavbar/TopNavbar";
import SmallLabel from "../../../../components/labels/smallLabel/SmallLabel";
import { routeTo } from "../../../../utils/functions/routes";
import ListHeader from "../../../../components/etc/listHeader/ListHeader";

const GroupList = () => {
  const location = useLocation();

  const currentGroup = useSelector(state => state.group.currentGroup);
  const groups = useSelector(state => state.group.groups);
  const placeLists = useSelector(state => state.group.placeLists);

  return (
    <div className="full-screen-white">
      {/* TopNavbar */}
      {currentGroup &&
        <TopNavbar
          header={
            <div className="topnavbar-header">
              <Link to={routeTo('Home', null, location)} className={styles.header}>
                <SmallLabel text={currentGroup.isGroup ? "모임" : "내 리스트"} />
                {currentGroup.name}<i className="bi bi-chevron-down text-success ms-1" />
              </Link>
            </div>
          }
          backBtnTo={-1}
        />
      }

      {/* 모임 목록 */}
      <div className="body-without-topnavbar pt-2">
        <ListHeader
          headerText="모임"
          rightElement={
            <Link to={routeTo('GroupCreate', null, location)}>
              <i className={`bi bi-plus-circle-fill ${styles.icon}`}></i>
            </Link>
          }
        />
        <ul className={styles.ul}>
          {groups.map((group, i) => {
            return (
              <GroupListItem key={i} group={group} />
            )
          })}
        </ul>
        {/* 내 리스트 목록 */}
        <ListHeader
          headerText="내 리스트"
          rightElement={
            <Link to={routeTo('PlaceListCreate', null, location)}>
              <i className={`bi bi-plus-circle-fill ${styles.icon}`}></i>
            </Link>
          }
        />
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