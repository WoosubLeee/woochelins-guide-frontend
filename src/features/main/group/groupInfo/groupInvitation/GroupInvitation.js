import styles from './GroupInvitation.module.css';
import { useState, useEffect } from "react";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { requestAddMember, requestGroupInvitationIsValid } from "../../../../../apis/groupApi";
import TopNavbar from "../../../../../components/navbar/topNavbar/TopNavbar";
import { snakeToCamel } from "../../../../../utils/functions/common";
import FullWidthBtn from '../../../../../components/buttons/fullWidthBtn/FullWidthBtn';

const GroupInvitation = () => {
  const navigate = useNavigate();

  const { groupId, token } = useParams();

  const [resStatus, setResStatus] = useState(undefined);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    requestGroupInvitationIsValid(groupId, token)
      .then(async res => {
        setResStatus(res.status);
        if (res.status === 202) {
          let data = await res.json();
          data = snakeToCamel(data);
          setGroupName(data.groupName);
        }
      });
  }, []);

  const handleClickYes = () => {
    requestAddMember(groupId, token)
      .then(res => {
        if (res.status === 201) {
          const search = `?${createSearchParams({
            type: 'group',
            id: groupId
          })}`;
          navigate({
            pathname: '/main/home',
            search: search
          });
        }
      });
  };

  const handleClickNo = () => {
    navigate('/main/home');
  };

  return (
    <div className="full-screen-white">
      <TopNavbar
        header="모임 초대"
      />
      <div className={styles.body}>
        {resStatus === 202 &&
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
          <p>이미 참여하고 있는 모임입니다.</p>
          <FullWidthBtn
            text={"돌아가기"}
            props={{
              onClick: handleClickNo
            }}
            classProps={styles.noBtn}
          />
        </>}
        {resStatus === 403 && <>
          <p>유효한 초대 링크가 아닙니다.</p>
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