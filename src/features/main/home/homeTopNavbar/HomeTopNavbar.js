import styles from './HomeTopNavbar.module.css';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import SmallLabel from '../../../../components/labels/smallLabel/SmallLabel';
import { routeTo } from '../../../../utils/functions/routes';

const HomeTopNavbar = ({ setIsSearching }) => {
  const location = useLocation();

  const listData = useSelector(state => state.map.listData);

  return (
    <nav className={styles.nav}>
      {listData && <>
        {listData.isGroup ? (
          <Link to={routeTo('GroupInfo', null, location)} className={styles.groupIcon}>
            <i className="bi bi-people mx-3" />
          </Link>
        ) : (
          <></>
        )}
        <div className="topnavbar-header">
          <Link to={routeTo('GroupList', null, location)} className={styles.header}>
            <SmallLabel text={listData.isGroup ? "모임" : "내 리스트"} />
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