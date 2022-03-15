import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TopNavbar from "../../../../components/navbar/topNavbar/TopNavbar";
import RecommendersItems from "./recommendersItem/RecommendersItem";

const PlaceRecommenders = () => {
  const currentGroup = useSelector(state => state.group.currentGroup);
  const focusedPlace = useSelector(state => state.place.focusedPlace);

  const [recommenders, setRecommenders] = useState([]);

  useEffect(() => {
    if (currentGroup) {
      const place = currentGroup.places.find(place => place.place.kakaoMapId === focusedPlace.kakaoMapId);
      setRecommenders(place.recommenders);
    }
  }, [currentGroup]);

  return (
    <div className="full-screen-white">
      <TopNavbar header="추천한 사람" backBtnTo={-1} />
      <ul className="body-without-topnavbar p-0">
        {recommenders.map((recommender, i) => {
          return <RecommendersItems key={i} recommender={recommender} />
        })}
      </ul>
    </div>
  );
}
 
export default PlaceRecommenders;