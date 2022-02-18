import styles from "./GroupCreate.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { requestCreateGroup } from "../../../../apis/groupApi";

const GroupCreate = () => {
  const navigate = useNavigate();

  const [groupInfo, setGroupInfo] = useState({
    name: ''
  });

  const handleChange = (field, value) => {
    const info = {
      ...groupInfo
    };
    info[field] = value;
    setGroupInfo(info);
  };

  const handleSubmit = e => {
    e.preventDefault();

    requestCreateGroup(groupInfo)
      .then(() => {
        navigate('/main/place/list/list');
      });
  };
  return (
    <form onSubmit={e => handleSubmit(e)} className={`full-screen ${styles.container}`}>
      <h1>모임 추가</h1>
      <label>이름</label>
      <input value={groupInfo.name} type="text" className="form-control" onChange={e => handleChange("name", e.target.value)} />
      <button>생성</button>
      <Link to="/main/place/list/list">닫기</Link>
    </form>
  );
}
 
export default GroupCreate;