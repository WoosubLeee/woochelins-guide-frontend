import styles from "./GroupCreate.module.css";
import { useState } from "react";
import { createSearchParams, Link, useLocation, useNavigate } from "react-router-dom";
import { requestCreatePlaceList } from "../../../../../apis/placeApi";
import { createPath } from "../../../../../utils/functions/common";

const PlaceListCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [listInfo, setListInfo] = useState({
    name: ''
  });

  const handleChange = (field, value) => {
    const info = {
      ...listInfo
    };
    info[field] = value;
    setListInfo(info);
  };

  const handleSubmit = e => {
    e.preventDefault();

    requestCreatePlaceList(listInfo)
      .then(data => {
        const search = `?${createSearchParams({
          type: 'placelist',
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
      <h1>리스트 추가</h1>
      <label>이름</label>
      <input value={listInfo.name} type="text" className="form-control" onChange={e => handleChange("name", e.target.value)} />
      <button>생성</button>
      <Link to={createPath("/main/group/list", location)}>닫기</Link>
    </form>
  );
}
 
export default PlaceListCreate;