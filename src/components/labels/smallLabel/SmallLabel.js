import styles from "./SmallLabel.module.css";

const SmallLabel = ({ text }) => {
  return (
    <span className={styles.span}>
      {text}
    </span>
  );
}
 
export default SmallLabel;