import styles from "./GroupInfo.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { requestCreateGroupInvitationToken, requestIsGroupAdmin } from "../../../../apis/groupApi";
import { useRef } from "react";
import TopNavbar from "../../../../components/navbar/topNavbar/TopNavbar";
import BottomBorderInput from "../../../../components/inputs/bottomBorderInput/BottomBorderInput";
import FullWidthBtn from "../../../../components/buttons/fullWidthBtn/FullWidthBtn";
import SmallLabel from "../../../../components/labels/smallLabel/SmallLabel";
import GroupMemberItem from "./groupMemberItem/GroupMemberItem";
import ListHeader from "../../../../components/etc/listHeader/ListHeader";

const GroupInfo = () => {
  const currentGroup = useSelector(state => state.group.currentGroup);
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [invitationUrl, setInvitationUrl] = useState('');
  const [isUrlCreated, setIsUrlCreated] = useState(false);

  useEffect(() => {
    if (currentGroup) {
      requestIsGroupAdmin(currentGroup.id)
        .then(res => {
          if (res.status === 202) {
            setIsAdmin(true);
          }
        });
    }
  }, [currentGroup]);
  
  const handleClickCreate = () => {
    requestCreateGroupInvitationToken(currentGroup.id)
      .then(data => {
        const url = `${window.location.origin}/group/${currentGroup.id}/invitation/${data.token}/`;
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
            <SmallLabel text="모임" />
            {currentGroup?.name}
          </div>
        }
        backBtnTo={-1}
      />

      <div className={`body-without-topnavbar pt-2 ${styles.body}`}>
        {isAdmin &&
          <div>
            <h6>초대하기</h6>
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
        }
        
        <div className="mt-4">
          <h6>멤버</h6>
          <ul className={styles.ul}>
            {currentGroup?.members.map((member, i) => <GroupMemberItem key={i} member={member} />)}
          </ul>
        </div>
      </div>
    </div>
  );
}
 
export default GroupInfo;