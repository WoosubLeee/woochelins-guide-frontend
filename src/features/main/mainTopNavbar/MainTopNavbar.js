import styles from './MainTopNavbar.module.css';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { createPath } from '../../../utils/functions/common';

const MainTopNavbar = () => {
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
        <div className={styles.listContainer}>
          <Link to={createPath("/main/place/list", location)} className={styles.header}>
            {listData.name}<i className="bi bi-chevron-down ms-1" />
          </Link>
        </div>
        <Link to={createPath("/main/search", location)} className={styles.serachIcon}>
          <i className="bi bi-search"></i>
        </Link>
      </>}
    </nav>
  );
}
 
export default MainTopNavbar;