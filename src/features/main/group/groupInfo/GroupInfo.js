import styles from "./GroupInfo.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { requestCreateGroupInvitationToken, requestIsGroupAdmin } from "../../../../apis/groupApi";
import { useRef } from "react";
import TopNavbar from "../../../../components/navbar/topNavbar/TopNavbar";
import BottomBorderInput from "../../../../components/inputs/bottomBorderInput/BottomBorderInput";
import FullWidthBtn from "../../../../components/buttons/fullWidthBtn/FullWidthBtn";

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
    <div className="full-screen-white">
      <TopNavbar
        header={
          <div className={`topnavbar-header ${styles.header}`}>
            <span className={styles.headerLabel}>{listData.isGroup ? "모임" : "내 리스트"}</span>
            {listData.name}
          </div>
        }
        backBtnTo={-1}
      />
      <div className={styles.body}>
        {isAdmin &&
          <div>
            <label className="ms-1">초대하기</label>
            <div>
              <BottomBorderInput
                inputProps={{
                  type: "text",
                  value: invitationUrl,
                  readOnly: true,
                  placeholder: "초대링크를 생성하세요.",
                  ref: inputRef
                }}
                containerClass={styles.linkInput}
              />
              <FullWidthBtn
                text={isUrlCreated ? "복사" : "초대링크 생성"}
                props={{
                  onClick: isUrlCreated ? handleClickCopy : handleClickCreate
                }}
              />
            </div>
          </div>
        }
      </div>
    </div>
  );
}
 
export default GroupInfo;