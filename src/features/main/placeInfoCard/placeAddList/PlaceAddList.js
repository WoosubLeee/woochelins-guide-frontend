import styles from "./PlaceAddList.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PlaceAddListItem from "./placeAddListItem/PlaceAddListItem";
import { requestGetGroupsLists } from "../../../../apis/authApi";
import { requestGetSavedUserPlace } from "../../../../apis/placeApi";

const PlaceAddList = () => {
  const focusedPlace = useSelector(state => state.map.focusedPlace);

  const [groups, setGroups] = useState([]);
  const [placeLists, setPlaceLists] = useState([]);
  const [saved, setSaved] = useState(undefined);

  useEffect(() => {
    requestGetGroupsLists()
      .then(data => {
        setGroups(data.groups.map(group => {
          return {
            ...group,
            isGroup: true
          };
        }));
        setPlaceLists(data.placeLists.map(placeList => {
          return {
            ...placeList,
            isGroup: false
          };
        }));
      });
  }, []);

  useEffect(() => {
    if (focusedPlace) {
      requestGetSavedUserPlace(focusedPlace.googleMapsId)
        .then(data => {
          setSaved(data);
        })
    }
  }, [focusedPlace]);

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
    <div className={styles.container}>
      <ul>
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
      <ul>
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
  );
}
 
export default PlaceAddList;