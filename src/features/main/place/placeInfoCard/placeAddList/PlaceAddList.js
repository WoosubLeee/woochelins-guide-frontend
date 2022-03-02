import styles from "./PlaceAddList.module.css";
import { useSelector } from "react-redux";
import PlaceAddListItem from "./placeAddListItem/PlaceAddListItem";
import TopNavbar from "../../../../../components/navbar/topNavbar/TopNavbar";

const PlaceAddList = () => {
  const groups = useSelector(state => state.group.groups);
  const placeLists = useSelector(state => state.group.placeLists);

  return (
    <div className="full-screen-white">
      <TopNavbar header="장소 저장" backBtnTo={-1} />
      <div className="body-without-topnavbar pt-2">
        <h2 className={styles.h2}>모임</h2>
        <ul className={styles.ul}>
          {groups.map((group, i) => {
            return (
              <PlaceAddListItem
                key={i}
                group={group}
              />
            )
          })}
        </ul>
        <h2 className={styles.h2}>내 리스트</h2>
        <ul className={styles.ul}>
          {placeLists.map((placeList, i) => {
            return (
              <PlaceAddListItem
                key={i}
                group={placeList}
              />
            )
          })}
        </ul>
      </div>
    </div>
  );
}
 
export default PlaceAddList;