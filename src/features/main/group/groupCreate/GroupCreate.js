import styles from './GroupCreate.module.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateGroupsAndMylists } from "../groupSlice";
import { createSearchParams, useNavigate } from "react-router-dom";
import { requestCreateGroup } from "../../../../apis/groupApi";
import TopNavbar from "../../../../components/navbar/topNavbar/TopNavbar";
import BottomBorderInput from "../../../../components/inputs/bottomBorderInput/BottomBorderInput";
import FullWidthBtn from "../../../../components/buttons/fullWidthBtn/FullWidthBtn";
import { routeTo } from "../../../../utils/functions/routes";

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
        navigate(routeTo('Home', {}, { search: search }));
        dispatch(updateGroupsAndMylists);
      });
  };
  return (
    <div className="full-screen-white">
      <TopNavbar
        header="모임 생성"
        backBtnTo={-1}
      />
      <form onSubmit={e => handleSubmit(e)} className="body-without-topnavbar pt-2">
        <div className={styles.inputDiv}>
          <BottomBorderInput
            labelText={"모임 이름"}
            inputProps={{
              type: "text",
              value: groupInfo.name,
              onChange: e => handleChange("name", e.target.value),
              placeholder: "12자 이하로 작성해주세요."
            }}
            iProps={{onClick: () => handleChange("name", "")}}
          />
          <span className={`${styles.span} ${groupInfo.name.length <= 12 && styles.spanHidden} text-danger`}>
            12자 이하로 작성해주세요.
          </span>
        </div>
        <FullWidthBtn
          text="생성"
          props={{ disabled: groupInfo.name.length <= 12 ? false : true }}
        />
      </form>
    </div>
  );
}
 
export default GroupCreate;