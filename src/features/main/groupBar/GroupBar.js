import styles from "./GroupBar.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import GroupList from "./groupList/GroupList";

const GroupBar = () => {
  const listData = useSelector(state => state.map.listData);

  const [listExpanded, setListExpanded] = useState(false);

  const handleClick = () => {
    if (!listExpanded) {
      setListExpanded(true);
    }
  };

  return (
    <>
      {listData && <div onClick={handleClick} className={styles.container}>
        {listData.name}<i className="bi bi-chevron-down"></i>
        {listExpanded && <GroupList setListExpanded={setListExpanded} />}
      </div>}
    </>
  );
}
 
export default GroupBar;