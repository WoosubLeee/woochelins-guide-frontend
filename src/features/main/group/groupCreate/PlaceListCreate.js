import styles from './GroupCreate.module.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setGroupsUpdateNeeded } from "../groupSlice";
import { createSearchParams, useNavigate } from "react-router-dom";
import { requestCreatePlaceList } from "../../../../apis/placeApi";
import TopNavbar from "../../../../components/navbar/topNavbar/TopNavbar";
import BottomBorderInput from "../../../../components/inputs/bottomBorderInput/BottomBorderInput";
import FullWidthBtn from "../../../../components/buttons/fullWidthBtn/FullWidthBtn";
import { routeTo } from "../../../../utils/functions/routes";

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
        navigate(routeTo('Home', {}, { search: search }));
        dispatch(setGroupsUpdateNeeded(true));
      });
  };

  return (
    <div className="full-screen-white">
      <TopNavbar
        header="내 리스트 생성"
        backBtnTo={-1}
      />
      <form onSubmit={e => handleSubmit(e)} className="body-without-topnavbar pt-2">
        <div className={styles.inputDiv}>
          <BottomBorderInput
            labelText={"내 리스트 이름"}
            inputProps={{
              type: "text",
              value: listInfo.name,
              onChange: e => handleChange("name", e.target.value),
              placeholder: "12자 이하로 작성해주세요."
            }}
            iProps={{onClick: () => handleChange("name", "")}}
          />
          <span className={`${styles.span} ${listInfo.name.length <= 12 && styles.spanHidden} text-danger`}>
            12자 이하로 작성해주세요.
          </span>
        </div>
        <FullWidthBtn
          text="생성"
        />
      </form>
    </div>
  );
}
 
export default PlaceListCreate;