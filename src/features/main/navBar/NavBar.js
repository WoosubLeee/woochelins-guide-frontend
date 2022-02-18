import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <Link to="/main/place-list/list">그룹</Link>
    </nav>
  );
}
 
export default NavBar;