import styles from "./GroupList.module.css";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import GroupListItem from "./groupListItem/GroupListItem";
import { requestGetPlaceListUser } from "../../../../apis/placeApi";
import { requestGetGroupListUser } from "../../../../apis/groupApi";
import { createPath } from "../../../../utils/functions/common";

const GroupList = ({ setListExpanded }) => {
  const location = useLocation();

  const [groupList, setGroupList] = useState([]);
  const [placeListList, setPlaceListList] = useState([]);
  const [eventAdded, setEventAdded] = useState(false);

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

  const listRef = useRef();
  const btnRef = useRef();
  useEffect(() => {
    if (listRef.current && !eventAdded) {
      window.addEventListener('click', handleClick);
      setEventAdded(true);
    }
  }, [listRef.current]);

  const handleClick = () => {
    window.removeEventListener('click', handleClick);
    setListExpanded(false);
  };

  return (
    <div ref={listRef} className={styles.container}>
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
      <button ref={btnRef}>닫기</button>
    </div>
  );
}
 
export default GroupList;