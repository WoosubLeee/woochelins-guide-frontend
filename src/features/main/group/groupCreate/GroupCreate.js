import { useState } from "react";
import { useDispatch } from "react-redux";
import { setListUpdateNeeded } from "../../map/mapSlice";
import { setGroupsUpdateNeeded } from "../groupSlice";
import { createSearchParams, useNavigate } from "react-router-dom";
import { requestCreateGroup } from "../../../../apis/groupApi";
import TopNavbar from "../../../../components/navbar/topNavbar/TopNavbar";
import BottomBorderInput from "../../../../components/inputs/bottomBorderInput/BottomBorderInput";
import FullWidthBtn from "../../../../components/buttons/fullWidthBtn/FullWidthBtn";

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
          pathname: '/main/home',
          search: search
        });
        dispatch(setGroupsUpdateNeeded(true));
        dispatch(setListUpdateNeeded(true));
      });
  };
  return (
    <div className="full-screen-white">
      <TopNavbar
        header="모임 생성"
        backBtnTo={-1}
      />
      <form onSubmit={e => handleSubmit(e)} className="m-2">
        <BottomBorderInput
          labelText={"모임 이름"}
          inputProps={{
            type: "text",
            value: groupInfo.name,
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
 
export default GroupCreate;