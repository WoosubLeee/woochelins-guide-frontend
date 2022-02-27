import styles from './FullWidthBtn.module.css';

const FullWidthBtn = ({ text, props, classProps }) => {
  return (
    <button className={`btn btn-success ${styles.btn} ${classProps}`} {...props}>{text}</button>
  );
}
 
export default FullWidthBtn;