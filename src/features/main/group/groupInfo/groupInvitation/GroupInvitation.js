import styles from './GroupInvitation.module.css';
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { updateGroupsAndMylists } from '../../groupSlice';
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { requestGroupMemberAdd, requestGroupInvitationIsValid } from "../../../../../apis/groupApi";
import TopNavbar from "../../../../../components/navbar/topNavbar/TopNavbar";
import { snakeToCamel } from "../../../../../utils/functions/common";
import FullWidthBtn from '../../../../../components/buttons/fullWidthBtn/FullWidthBtn';
import { routeTo } from '../../../../../utils/functions/routes';

const GroupInvitation = () => {
  const navigate = useNavigate();

  const { groupId, token } = useParams();

  const [resStatus, setResStatus] = useState(undefined);
  const [groupName, setGroupName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    requestGroupInvitationIsValid(groupId, token)
      .then(async res => {
        setResStatus(res.status);
        let data = await res.json();
        if (res.status === 200) {
          data = snakeToCamel(data);
          setGroupName(data.name);
        } else {
          setErrorMessage(data.message);
        }
      });
  }, []);

  const dispatch = useDispatch();
  const handleClickYes = () => {
    requestGroupMemberAdd(groupId, token)
      .then(res => {
        if (res.status === 201) {
          dispatch(updateGroupsAndMylists);
          const search = `?${createSearchParams({
            type: 'group',
            id: groupId
          })}`;
          navigate(routeTo('Home', {}, { search: search }));
        }
      });
  };

  const handleClickNo = () => {
    navigate(routeTo('Home'));
  };

  return (
    <div className="full-screen-white">
      <TopNavbar
        header="모임 초대"
      />
      <div className="body-without-topnavbar pt-2 text-center">
        {resStatus === 200 &&
          <>
            <p className={styles.groupName}>{groupName}</p>
            <p>모임에 참여하시겠습니까?</p>
            <FullWidthBtn
              text={"네, 참여하겠습니다"}
              props={{
                onClick: handleClickYes
              }}
            />
            <FullWidthBtn
              text={"취소"}
              props={{
                onClick: handleClickNo
              }}
              classProps={styles.noBtn}
            />
          </>
        }
        {resStatus === 400 && <>
          <p>{errorMessage}</p>
          <FullWidthBtn
            text={"돌아가기"}
            props={{
              onClick: handleClickNo
            }}
            classProps={styles.noBtn}
          />
        </>}
      </div>
    </div>
  );
}
 
export default GroupInvitation;