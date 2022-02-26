import styles from './PlaceRecommenders.module.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { requestGetGroupPlaceRecommenders } from "../../../../apis/placeApi";
import TopNavbar from "../../../../components/navbar/topNavbar/TopNavbar";
import { createPath } from "../../../../utils/functions/common";
import RecommendersItems from "./recommendersItem/RecommendersItem";

const PlaceRecommenders = () => {
  const location = useLocation();

  const { googleMapsId } = useParams();

  const listData = useSelector(state => state.map.listData);

  const [recommenders, setRecommenders] = useState([]);

  useEffect(() => {
    if (listData) {
      requestGetGroupPlaceRecommenders(listData.id, googleMapsId)
        .then(data => {
          setRecommenders(data);
        });
    }
  }, [listData]);

  return (
    <div className="full-screen-white">
      <TopNavbar header="추천한 사람" backBtnTo={createPath(`/main/place/${googleMapsId}`, location)} />
      <ul className={styles.ul}>
        {recommenders.map((recommender, i) => {
          return <RecommendersItems key={i} recommender={recommender} />
        })}
      </ul>
    </div>
  );
}
 
export default PlaceRecommenders;