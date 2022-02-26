import { useState, useEffect } from "react";
import { createSearchParams, Link, useNavigate, useParams } from "react-router-dom";
import { requestAddMember, requestGroupInvitationIsValid } from "../../../../../apis/groupApi";
import { snakeToCamel } from "../../../../../utils/functions/common";

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

  const handleClick = () => {
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

  return (
    <div className="full-screen bg-white">
      {resStatus === 202 &&
        <div>
          <p>{groupName} 모임에 참여하시겠습니까?</p>
          <button onClick={handleClick}>네, 참여하겠습니다</button>
          <Link to="/main/home">취소</Link>
        </div>
      }
      {resStatus === 400 &&
        <p>이미 참여하고 있는 모임입니다.</p>
      }
      {resStatus === 403 &&
        <p>유효한 초대 링크가 아닙니다.</p>
      }
    </div>
  );
}
 
export default GroupInvitation;