import styles from './RecommendersItems.module.css';

const RecommendersItems = ({ recommender }) => {
  return (
    <li className={styles.li}>
      <i className={`bi bi-person-circle ${styles.icon}`}></i>
      <span>{recommender.username}</span>
    </li>
  );
}
 
export default RecommendersItems;