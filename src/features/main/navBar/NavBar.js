import styles from "./NavBar.module.css";
import { Link, useLocation } from "react-router-dom";
import { createPath } from "../../../utils/functions/common";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className={styles.navBar}>
      <Link to={createPath("/main/menu", location)}><i className="fa-solid fa-bars fa-2xl"></i></Link>
    </nav>
  );
}
 
export default NavBar;