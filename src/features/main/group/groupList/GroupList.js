import styles from "./GroupList.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGroups, setPlaceLists } from "../groupSlice";
import { Link, useLocation } from "react-router-dom";
import GroupListItem from "./groupListItem/GroupListItem";
import { addIsGroupProperty, createPath } from "../../../../utils/functions/common";
import { requestGetGroupsLists } from "../../../../apis/authApi";
import TopNavbar from "../../../../components/navbar/topNavbar/TopNavbar";

const GroupList = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const listData = useSelector(state => state.map.listData);
  const groups = useSelector(state => state.group.groups);
  const placeLists = useSelector(state => state.group.placeLists);

  useEffect(() => {
    requestGetGroupsLists()
      .then(data => {
        let newGroups = addIsGroupProperty(data.groups);
        dispatch(setGroups(newGroups));
        let newPlaceLists = addIsGroupProperty(data.placeLists);
        dispatch(setPlaceLists(newPlaceLists));
      });
  }, []);

  return (
    <div className="full-screen-white">
      {/* TopNavbar */}
      <TopNavbar
        header={
          <div className={styles.listContainer}>
            <Link to={createPath("/main/home", location)} className={styles.header}>
              <span>{listData.isGroup ? "모임" : "내 리스트"}</span>
              {listData.name}<i className="bi bi-chevron-down text-success ms-1" />
            </Link>
          </div>
        }
        backBtnTo={createPath("/main/home", location)}
      />

      {/* 모임 목록 */}
      <div className={styles.body}>
        <h2 className={styles.h2}>
          모임
          <Link to={createPath("/main/group/create", location)}>
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
          <Link to={createPath("/main/placelist/create", location)}>
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