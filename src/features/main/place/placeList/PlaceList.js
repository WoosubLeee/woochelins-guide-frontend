import styles from "./PlaceList.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import PlaceListItem from "./placeListItem/PlaceListItem";
import { createPath } from "../../../../utils/functions/common";

const PlaceList = () => {
  const location = useLocation();

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
    <div className={`full-screen ${styles.container}`}>
      <ul>
        {listData && places.map((place, i) => {
          return (
            <PlaceListItem key={i} place={place} />
          )
        })}
      </ul>
      <Link to={createPath("/main", location)}>닫기</Link>
    </div>
  );
}
 
export default PlaceList;