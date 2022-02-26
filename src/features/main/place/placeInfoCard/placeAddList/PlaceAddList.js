import styles from "./PlaceAddList.module.css";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import queryString from "query-string";
import PlaceAddListItem from "./placeAddListItem/PlaceAddListItem";
import TopNavbar from "../../../../../components/navbar/topNavbar/TopNavbar";
import { requestGetGroupsLists } from "../../../../../apis/authApi";
import { requestGetSavedUserPlace } from "../../../../../apis/placeApi";
import { createPath } from "../../../../../utils/functions/common";

const PlaceAddList = () => {
  const location = useLocation();

  const { googleMapsId } = useParams();

  const [groups, setGroups] = useState([]);
  const [placeLists, setPlaceLists] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(undefined);
  const [saved, setSaved] = useState(undefined);

  useEffect(() => {
    // 현재 선택된 그룹/리스트 찾기

    requestGetGroupsLists()
      .then(async data => {
        let newGroups = data.groups.map(group => {
          return {
            ...group,
            isGroup: true
          };
        });
        let newPlaceLists = data.placeLists.map(placeList => {
          return {
            ...placeList,
            isGroup: false
          };
        });
        
        const queries = queryString.parse(location.search);
        if (queries.type === 'group') {
          setCurrentGroup(newGroups.find(group => group.id == queries.id));
          setGroups(newGroups.filter(group => group.id != queries.id));
          setPlaceLists(newPlaceLists);
        } else {
          setCurrentGroup(newPlaceLists.find(placeList => placeList.id == queries.id));
          setPlaceLists(newPlaceLists.filter(placeList => placeList.id != queries.id));
          setGroups(newGroups);
        }
      });
  }, []);

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
      <TopNavbar header="장소 저장" backBtnTo={createPath(`/main/place/${googleMapsId}`, location)} />
      <div className={styles.body}>
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
          {saved && groups.map((group, i) => {
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
          {saved && placeLists.map((placeList, i) => {
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