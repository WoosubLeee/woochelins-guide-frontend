import styles from "./GroupCreate.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setListUpdateNeeded } from "../../../map/mapSlice";
import { createSearchParams, useNavigate } from "react-router-dom";
import { requestCreateGroup } from "../../../../../apis/groupApi";

const GroupCreate = () => {
  const dispatch = useDispatch();
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
      .then(data => {
        const search = `?${createSearchParams({
          type: 'group',
          id: data.id
        })}`;
        navigate({
          pathname: '/main',
          search: search
        });
        dispatch(setListUpdateNeeded(true));
      });
  };
  return (
    <form onSubmit={e => handleSubmit(e)} className={`full-screen ${styles.container}`}>
      <h1>모임 추가</h1>
      <label>이름</label>
      <input value={groupInfo.name} type="text" className="form-control" onChange={e => handleChange("name", e.target.value)} />
      <button>생성</button>
      <button type="button" onClick={() => navigate(-1)}>닫기</button>
    </form>
  );
}
 
export default GroupCreate;