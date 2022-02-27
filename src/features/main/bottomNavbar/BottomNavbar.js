import styles from './BottomNavbar.module.css';
import { Link, useLocation } from 'react-router-dom';
import { createPath } from '../../../utils/functions/common';

const BottomNavbar = () => {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <Link to={createPath("/main/home", location)} className={styles.link}>
        <i className={`fa-solid fa-map-location-dot ${styles.mapIcon}`}></i>
        <span className={styles.mapSpan}>지도</span>
      </Link>
      <Link to={createPath("/main/place/list", location)} className={styles.link}>
        <i className={`bi bi-geo-alt-fill ${styles.locationIcon}`}></i>
        <span>장소 목록</span>
      </Link>
      <Link to={createPath("/main/home", location)} className={styles.link}>
        <i className={`bi bi-list ${styles.icon} ${styles.listIcon}`}></i>
        <span className={styles.listSpan}>메뉴</span>
      </Link>
    </nav>
  );
}
 
export default BottomNavbar;