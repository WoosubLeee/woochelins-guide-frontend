import styles from './FullWidthBtn.module.css';

const FullWidthBtn = ({ text, props }) => {
  return (
    <button className={`btn btn-success ${styles.btn}`} {...props}>{text}</button>
  );
}
 
export default FullWidthBtn;