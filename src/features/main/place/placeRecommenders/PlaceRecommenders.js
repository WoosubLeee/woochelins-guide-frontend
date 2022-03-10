import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { requestGetGroup } from "../../../../apis/groupApi";
import TopNavbar from "../../../../components/navbar/topNavbar/TopNavbar";
import RecommendersItems from "./recommendersItem/RecommendersItem";

const PlaceRecommenders = () => {
  const currentGroup = useSelector(state => state.group.currentGroup);

  const [recommenders, setRecommenders] = useState([]);

  useEffect(() => {
    if (currentGroup) {
      requestGetGroup(currentGroup.id)
        .then(data => {
          setRecommenders(data.members);
        });
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