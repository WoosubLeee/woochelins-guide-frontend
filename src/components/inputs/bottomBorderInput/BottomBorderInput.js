import styles from './BottomBorderInput.module.css';

const BottomBorderInput = ({ inputProps, iProps, containerClass, iconClass }) => {
  return (
    <div className={`${styles.container} ${containerClass}`}>
      <input {...inputProps} className={`${styles.input}`} />
      {inputProps.value &&
        <i {...iProps} className={`fa-solid fa-circle-xmark ${styles.icon} ${iconClass}`} />
      }
    </div>
  );
}
 
export default BottomBorderInput;