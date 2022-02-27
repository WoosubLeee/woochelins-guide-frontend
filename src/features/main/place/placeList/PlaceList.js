import styles from "./PlaceList.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PlaceListItem from "./placeListItem/PlaceListItem";
import TopNavbar from "../../../../components/navbar/topNavbar/TopNavbar";

const PlaceList = () => {
  const listData = useSelector(state => state.map.listData);

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (listData) {
      if (listData.isGroup) {
        setPlaces(listData.placeList.places);
      } else {
        setPlaces(listData.places);
      }
    }
  }, [listData]);

  return (
    <div className="full-screen-white">
      <TopNavbar
        header="장소 목록"
        backBtnTo={-1}
      />
      <ul className={styles.ul}>
        {listData && places.map((place, i) => {
          return (
            <PlaceListItem key={i} place={place} />
          )
        })}
      </ul>
    </div>
  );
}
 
export default PlaceList;