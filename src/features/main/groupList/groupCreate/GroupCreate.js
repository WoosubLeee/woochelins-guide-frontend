import styles from "./GroupCreate.module.css";
import { useState } from "react";
import { createSearchParams, Link, useLocation, useNavigate } from "react-router-dom";
import { requestCreateGroup } from "../../../../apis/groupApi";
import { createPath } from "../../../../utils/functions/common";

const GroupCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
      .then(data => {
        const search = `?${createSearchParams({
          type: 'group',
          id: data.id
        })}`;
        navigate({
          pathname: '/main',
          search: search
        });
      });
  };
  return (
    <form onSubmit={e => handleSubmit(e)} className={`full-screen ${styles.container}`}>
      <h1>모임 추가</h1>
      <label>이름</label>
      <input value={groupInfo.name} type="text" className="form-control" onChange={e => handleChange("name", e.target.value)} />
      <button>생성</button>
      <Link to={createPath("/main/group/list", location)}>닫기</Link>
    </form>
  );
}
 
export default GroupCreate;