import styles from "./SearchBar.module.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routeTo } from "../../../../../utils/functions/routes";

const SearchBar = ({ setIsSearching }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [inputVal, setInputVal] = useState('');

  const handleEnter = () => {
    if (inputVal.length > 0) navigate(routeTo('SearchResult', { keyword: inputVal }, location));
    else alert('검색어를 입력해주세요.');
  };

  return (
    <div className={`bg-white ${styles.container}`}>
      <i onClick={() => setIsSearching(false)} className={`bi bi-arrow-left ${styles.backIcon}`}></i>
      <div className={styles.inputWrap}>
        <input
          value={inputVal}
          placeholder="검색어를 입력해주세요"
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleEnter();
            }
          }}
          className={styles.input}
          autoComplete="off"
        />
        <i onClick={() => setInputVal("")} className={`fa-solid fa-circle-xmark ${styles.clearIcon}`} />
      </div>
      <div onClick={handleEnter} className={styles.searchIcon}>
        <i className="bi bi-search"></i>
      </div>
    </div>
  );
};
 
export default SearchBar;