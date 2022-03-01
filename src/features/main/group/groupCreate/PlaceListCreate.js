import { useState } from "react";
import { useDispatch } from "react-redux";
import { setListUpdateNeeded } from "../../map/mapSlice";
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
        dispatch(setListUpdateNeeded(true));
      });
  };

  return (
    <div className="full-screen-white">
      <TopNavbar
        header="내 리스트 생성"
        backBtnTo={-1}
      />
      <form onSubmit={e => handleSubmit(e)} className="m-2">
        <BottomBorderInput
          labelText={"내 리스트 이름"}
          inputProps={{
            type: "text",
            value: listInfo.name,
            onChange: e => handleChange("name", e.target.value)
          }}
          iProps={{onClick: () => handleChange("name", "")}}
        />
        <FullWidthBtn
          text="생성"
        />
      </form>
    </div>
  );
}
 
export default PlaceListCreate;