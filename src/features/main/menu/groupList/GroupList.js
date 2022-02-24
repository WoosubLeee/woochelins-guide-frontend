import styles from "./GroupList.module.css";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GroupListItem from "./groupListItem/GroupListItem";
import { requestGetPlaceListUser } from "../../../../apis/placeApi";
import { requestGetGroupListUser } from "../../../../apis/groupApi";
import { createPath } from "../../../../utils/functions/common";

const GroupList = () => {
  const navigate = useNavigate();
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
        <h5>모임</h5>
        {groupList.map((group, i) => {
          return (
            <GroupListItem key={i} group={group} />
          )
        })}
      </ul>
      <Link to={createPath("/main/group/create", location)}>추가하기</Link>
      <ul>
        <h5>내 리스트</h5>
        {placeListList.map((placeList, i) => {
          return (
            <GroupListItem key={i} group={placeList} />
          )
        })}
      </ul>
      <Link to={createPath("/main/placelist/create", location)}>추가하기</Link>
      <br />
      <button onClick={() => navigate(-1)}>닫기</button>
    </div>
  );
}
 
export default GroupList;