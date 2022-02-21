import styles from "./NavBar.module.css";
import { Link, useLocation } from "react-router-dom";
import { createPath } from "../../../utils/functions/common";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className={styles.navBar}>
      <Link to={createPath("/main/place/list", location)}>장소 목록</Link>
    </nav>
  );
}
 
export default NavBar;