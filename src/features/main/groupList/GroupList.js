import styles from "./GroupList.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GroupListItem from "./groupListItem/GroupListItem";
import { requestGetPlaceListUser } from "../../../apis/placeApi";
import { requestGetGroupListUser } from "../../../apis/groupApi";

const GroupList = () => {
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
            <GroupListItem key={i} placeList={group} />
          )
        })}
      </ul>
      <Link to="/main/group/create">추가하기</Link>
      <ul>
        {placeListList.map((placeList, i) => {
          return (
            <GroupListItem key={i} placeList={placeList} />
          )
        })}
      </ul>
      <Link to="/main/place-list/create">추가하기</Link>
      <Link to="/main">닫기</Link>
    </div>
  );
}
 
export default GroupList;