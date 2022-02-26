import styles from "./GroupCreate.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setListUpdateNeeded } from "../../map/mapSlice";
import { createSearchParams, useNavigate } from "react-router-dom";
import { requestCreatePlaceList } from "../../../../apis/placeApi";

const PlaceListCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          pathname: '/main/home',
          search: search
        });
        dispatch(setListUpdateNeeded(true));
      });
  };

  return (
    <form onSubmit={e => handleSubmit(e)} className={`full-screen ${styles.container}`}>
      <h1>리스트 추가</h1>
      <label>이름</label>
      <input value={listInfo.name} type="text" className="form-control" onChange={e => handleChange("name", e.target.value)} />
      <button type="submit">생성</button>
      <button type="button" onClick={() => navigate(-1)}>닫기</button>
    </form>
  );
}
 
export default PlaceListCreate;