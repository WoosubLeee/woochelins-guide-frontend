import styles from "./PlaceAddList.module.css";
import { useSelector } from "react-redux";
import PlaceAddListItem from "./placeAddListItem/PlaceAddListItem";
import TopNavbar from "../../../../../components/navbar/topNavbar/TopNavbar";
import ListHeader from "../../../../../components/etc/listHeader/ListHeader";

const PlaceAddList = () => {
  const groups = useSelector(state => state.group.groups);
  const myLists = useSelector(state => state.group.myLists);

  return (
    <div className="full-screen-white">
      <TopNavbar header="맛집 저장" backBtnTo={-1} />
      <div className="body-without-topnavbar pt-2">
        <ListHeader headerText="모임" />
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
        <ListHeader headerText="내 리스트" />
        <ul className={styles.ul}>
          {myLists.map((myList, i) => {
            return (
              <PlaceAddListItem
                key={i}
                group={myList}
              />
            )
          })}
        </ul>
      </div>
    </div>
  );
}
 
export default PlaceAddList;