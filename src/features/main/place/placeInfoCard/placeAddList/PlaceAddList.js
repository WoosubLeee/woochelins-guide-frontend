import styles from "./PlaceAddList.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import queryString from "query-string";
import PlaceAddListItem from "./placeAddListItem/PlaceAddListItem";
import TopNavbar from "../../../../../components/navbar/topNavbar/TopNavbar";
import { requestGetSavedUserPlace } from "../../../../../apis/placeApi";

const PlaceAddList = () => {
  const location = useLocation();

  const { googleMapsId } = useParams();

  const groups = useSelector(state => state.group.groups);
  const placeLists = useSelector(state => state.group.placeLists);

  const [otherGroups, setOtherGroups] = useState([]);
  const [otherPlaceLists, setOtherPlaceLists] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(undefined);
  const [saved, setSaved] = useState(undefined);

  useEffect(() => {
    if (groups && placeLists) {
      // 현재 선택된 그룹/리스트 찾기
      const queries = queryString.parse(location.search);
      if (queries.type === 'group') {
        setCurrentGroup(groups.find(group => group.id == queries.id));
        setOtherGroups(groups.filter(group => group.id != queries.id));
        setOtherPlaceLists(placeLists);
      } else {
        setCurrentGroup(placeLists.find(placeList => placeList.id == queries.id));
        setOtherPlaceLists(placeLists.filter(placeList => placeList.id != queries.id));
        setOtherGroups(groups);
      }
    }
  }, [groups, placeLists]);

  useEffect(() => {
    requestGetSavedUserPlace(googleMapsId)
      .then(data => {
        setSaved(data);
      })
  }, []);

  const changeSaved = (isGroup, isAdding, groupId) => {
    const newSaved = {
      ...saved
    };
    const type = isGroup ? newSaved.groups : newSaved.placeLists;
    if (isAdding) {
      type.push(groupId);
    } else {
      type.splice(type.indexOf(groupId), 1);
    }
    
    setSaved(newSaved);
  };

  return (
    <div className="full-screen-white">
      <TopNavbar header="장소 저장" backBtnTo={-1} />
      <div className="body-without-topnavbar pt-2">
        {currentGroup && <>
          <h2 className={styles.h2}>
            현재 {currentGroup.isGroup ? "모임" : "리스트"}
          </h2>
          <ul className={styles.ul}>
            {saved &&
              <PlaceAddListItem
                group={currentGroup}
                isSaved={currentGroup.isGroup ? saved.groups.includes(currentGroup.id) : saved.placeLists.includes(currentGroup.id)}
                changeSaved={changeSaved}
              />
            }
          </ul>
        </>}
        <h2 className={styles.h2}>모임</h2>
        <ul className={styles.ul}>
          {saved && otherGroups.map((group, i) => {
            return (
              <PlaceAddListItem
                key={i}
                group={group}
                isSaved={saved.groups.includes(group.id)}
                changeSaved={changeSaved}
              />
            )
          })}
        </ul>
        <h2 className={styles.h2}>내 리스트</h2>
        <ul className={styles.ul}>
          {saved && otherPlaceLists.map((placeList, i) => {
            return (
              <PlaceAddListItem
                key={i}
                group={placeList}
                isSaved={saved.placeLists.includes(placeList.id)}
                changeSaved={changeSaved}
              />
            )
          })}
        </ul>
      </div>
    </div>
  );
}
 
export default PlaceAddList;