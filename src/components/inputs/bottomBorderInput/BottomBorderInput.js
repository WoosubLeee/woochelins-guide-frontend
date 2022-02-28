import styles from './BottomBorderInput.module.css';

const BottomBorderInput = ({ labelText, inputProps, iProps, containerClass, iconClass }) => {
  return (
    <div>
      {labelText && <label className="ms-1">{labelText}</label>}
      <div className={`${styles.container} ${containerClass}`}>
        <input {...inputProps} className={`${styles.input}`} />
        {inputProps.value &&
          <i {...iProps} className={`fa-solid fa-circle-xmark ${styles.icon} ${iconClass}`} />
        }
      </div>
    </div>
  );
}
 
export default BottomBorderInput;