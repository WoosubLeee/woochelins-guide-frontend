import styles from './HomeTopNavbar.module.css';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { createPath } from '../../../../utils/functions/common';

const HomeTopNavbar = ({ setIsSearching }) => {
  const location = useLocation();

  const listData = useSelector(state => state.map.listData);

  return (
    <nav className={styles.nav}>
      {listData && <>
        {listData.isGroup ? (
          <Link to={createPath("/main/group/info", location)} className={styles.groupIcon}>
            <i className="bi bi-people mx-3" />
          </Link>
        ) : (
          <></>
        )}
        <div className="topnavbar-header">
          <Link to={createPath("/main/group/list", location)} className={styles.header}>
            <span>{listData.isGroup ? "모임" : "내 리스트"}</span>
            {listData.name}<i className="bi bi-chevron-down text-success ms-1" />
          </Link>
        </div>
        <div onClick={() => setIsSearching(true)} className={styles.searchIcon}>
          <i className="bi bi-search"></i>
        </div>
      </>}
    </nav>
  );
}
 
export default HomeTopNavbar;