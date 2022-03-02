import styles from "./ListHeader.module.css";

const ListHeader = ({ headerText, rightElement }) => {
  return (
    <h2 className={styles.h2}>
      {headerText}
      {rightElement}
    </h2>
  );
}
 
export default ListHeader;