import styles from "./PlaceInfoCard.module.css";
import { useSelector } from "react-redux";
import GroupPlaceSaveButton from "./placeSaveButton/GroupPlaceSaveButton";
import PlaceSaveButton from "./placeSaveButton/PlaceSaveButton";

const PlaceInfoCard = () => {
  const listData = useSelector(state => state.map.listData);
  const focusedPlace = useSelector(state => state.map.focusedPlace);

  return (
    <>
      {focusedPlace &&
        <div className={styles.card}>
          <h5>{focusedPlace.name}</h5>
          {listData.isGroup ? (
            <GroupPlaceSaveButton />
          ) : (
            <PlaceSaveButton />
          )}
        </div>
      }
    </>
  );
}
 
export default PlaceInfoCard;