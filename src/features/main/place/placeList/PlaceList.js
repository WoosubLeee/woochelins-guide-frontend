import styles from "./PlaceList.module.css";
import { useSelector } from "react-redux";
import PlaceListItem from "./placeListItem/PlaceListItem";
import TopNavbar from "../../../../components/navbar/topNavbar/TopNavbar";

const PlaceList = () => {
  const currentPlaces = useSelector(state => state.place.currentPlaces);

  return (
    <div className="full-screen-white">
      <TopNavbar
        header="장소 목록"
        backBtnTo={-1}
      />
      <ul className={styles.ul}>
        {currentPlaces && currentPlaces.map((place, i) => {
          return (
            <PlaceListItem key={i} place={place} />
          )
        })}
      </ul>
    </div>
  );
}
 
export default PlaceList;