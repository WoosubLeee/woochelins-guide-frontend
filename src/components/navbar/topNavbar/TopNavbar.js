import styles from './TopNavbar.module.css';
import { useNavigate } from 'react-router-dom';

const TopNavbar = ({ header, backBtnTo, rightBtn }) => {
  const navigate = useNavigate();

  return (
    <nav className={styles.nav}>
      {backBtnTo &&
        <i onClick={() => navigate(backBtnTo)} className={`bi bi-arrow-left ${styles.backIcon}`}></i>
      }
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>{header}</h1>
      </div>
      {rightBtn &&
        <div>

        </div>
      }
    </nav>
  );
}
 
export default TopNavbar;