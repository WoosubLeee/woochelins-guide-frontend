import styles from './BottomNavbar.module.css';
import { Link, useLocation } from 'react-router-dom';
import { routeTo } from '../../../utils/functions/routes';

const BottomNavbar = () => {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <Link to={routeTo('Home', null, location)} className={styles.link}>
        <i className={`fa-solid fa-map-location-dot ${styles.mapIcon}`}></i>
        <span className={styles.mapSpan}>지도</span>
      </Link>
      <Link to={routeTo('PlaceList', null, location)} className={styles.link}>
        <i className={`bi bi-geo-alt-fill ${styles.locationIcon}`}></i>
        <span>맛집 목록</span>
      </Link>
      <Link to={routeTo('Menu', null, location)} className={styles.link}>
        <i className={`bi bi-three-dots ${styles.icon} ${styles.listIcon}`}></i>
        <span className={styles.listSpan}>더보기</span>
      </Link>
    </nav>
  );
}
 
export default BottomNavbar;