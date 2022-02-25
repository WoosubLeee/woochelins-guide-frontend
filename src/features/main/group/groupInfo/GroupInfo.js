import styles from "./GroupInfo.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { requestCreateGroupInvitationToken, requestIsGroupAdmin } from "../../../../apis/groupApi";
import { useRef } from "react";

const GroupInfo = () => {
  const listData = useSelector(state => state.map.listData);
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [invitationUrl, setInvitationUrl] = useState('');
  const [isUrlCreated, setIsUrlCreated] = useState(false);

  useEffect(() => {
    if (listData) {
      requestIsGroupAdmin(listData.id)
        .then(res => {
          if (res.status === 202) {
            setIsAdmin(true);
          }
        });
    }
  }, [listData]);
  
  const handleClickCreate = () => {
    requestCreateGroupInvitationToken(listData.id)
      .then(data => {
        const url = `${window.location.origin}/main/group/${listData.id}/invitation/${data.token}/`;
        setInvitationUrl(url);
        setIsUrlCreated(true);
      });
  };

  const inputRef = useRef();
  const handleClickCopy = () => {
    inputRef.current.select();
    document.execCommand('copy');
  };

  return (
    <div className={`full-screen ${styles.container}`}>
      {isAdmin &&
        <div>
          <h6>초대하기</h6>
          <div>
            <input
              type="text"
              value={invitationUrl}
              readOnly
              placeholder="초대링크를 생성하세요"
              ref={inputRef}
            />
            {isUrlCreated ? (
              <button onClick={handleClickCopy}>복사</button>
            ) : (
              <button onClick={handleClickCreate}>링크 생성</button>
            )}
          </div>
        </div>
      }
    </div>
  );
}
 
export default GroupInfo;