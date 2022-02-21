import styles from "./GroupList.module.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import GroupListItem from "./groupListItem/GroupListItem";
import { requestGetPlaceListUser } from "../../../apis/placeApi";
import { requestGetGroupListUser } from "../../../apis/groupApi";
import { createPath } from "../../../utils/functions/common";

const GroupList = () => {
  const location = useLocation();

  const [groupList, setGroupList] = useState([]);
  const [placeListList, setPlaceListList] = useState([]);

  useEffect(() => {
    requestGetGroupListUser()
      .then(data => {
        setGroupList(data);
      });
    requestGetPlaceListUser()
      .then(data => {
        setPlaceListList(data);
      });
  }, []);

  return (
    <div className={`full-screen ${styles.container}`}>
      <ul>
        {groupList.map((group, i) => {
          return (
            <GroupListItem key={i} group={group} />
          )
        })}
      </ul>
      <Link to={createPath("/main/group/create", location)}>추가하기</Link>
      <ul>
        {placeListList.map((placeList, i) => {
          return (
            <GroupListItem key={i} group={placeList} />
          )
        })}
      </ul>
      <Link to={createPath("/main/placelist/create", location)}>추가하기</Link>
      <Link to={createPath("/main", location)}>닫기</Link>
    </div>
  );
}
 
export default GroupList;