import styles from "./SearchResult.module.css";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import TopNavbar from "../../../../../components/navbar/topNavbar/TopNavbar";
import SearchResultItem from "./searchResultItem/SearchResultItem";
import { snakeToCamel } from "../../../../../utils/functions/common";

const SearchResult = () => {
  const { keyword } = useParams();

  const placesService = useRef(new window.kakao.maps.services.Places());

  const [results, setResults] = useState([]);

  useEffect(() => {
    placesService.current.keywordSearch(keyword, (searchResult, status) => {
      searchResult.forEach(place => {
        place.x = Number(place.x);
        place.y = Number(place.y);
      });
      setResults(snakeToCamel(searchResult));
    }, {
      category_group_code: 'FD6, CE7',
      useMapCenter: true
    });
  }, []);
    
  return (
    <div className="full-screen-white d-flex flex-column">
      <TopNavbar
        header={`'${keyword}' 검색 결과`}
        backBtnTo={-1}
      />
      {results.length > 0 ? (
        <ul className="body-without-topnavbar">
          {results.map((result, i) => {
            return (
              <SearchResultItem key={i} result={result} />
            )
          })}
        </ul>
      ) : (
        <div className={styles.noContentWrap}>
          <i className={`bi bi-exclamation-circle ${styles.excMark}`} />
          <span>검색결과가 없습니다</span>
        </div>
      )}
    </div>
  );
}
 
export default SearchResult;