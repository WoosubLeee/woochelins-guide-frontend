import styles from './GroupMemberItem.module.css';

const GroupMemberItem = ({ member }) => {
  return (
    <li className={styles.li}>
      <i className={`bi bi-person-circle ${styles.icon}`}></i>
      <span>{member.username}</span>
    </li>
  );
}
 
export default GroupMemberItem;