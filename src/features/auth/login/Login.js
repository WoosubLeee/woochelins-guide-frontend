import styles from './Login.module.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FullWidthBtn from '../../../components/buttons/fullWidthBtn/FullWidthBtn';
import BottomBorderInput from '../../../components/inputs/bottomBorderInput/BottomBorderInput';
import { requestLogin } from "../../../apis/authApi";
import { routeTo, createPath } from '../../../utils/functions/routes';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  });

  const handleInput = (field, value) => {
    const info = {
      ...userInfo
    };
    info[field] = value;
    setUserInfo(info);
  };

  const handleSubmit = e => {
    e.preventDefault();

    requestLogin(userInfo)
      .then(res => {
        if (res.status === 200) {
          dispatch(setIsLogin(true));

          if (state && 'location' in state) {
            navigate(createPath(state.location.pathname, state.location));
          } else {
            navigate(routeTo('Home'));
          }
        } else {
          alert('계정 정보가 일치하지 않습니다.');
        }
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>우슐랭</h1>
        <h1 className={styles.header}>가이드</h1>
      </div>
      <form onSubmit={e => handleSubmit(e)} className={styles.form}>
        <BottomBorderInput
          inputProps={{
            type: "email",
            value: userInfo.email,
            placeholder: "이메일",
            onChange: e => handleInput("email", e.target.value),
          }}
          iProps={{onClick: () => handleInput("email", "")}}
        />
        <BottomBorderInput
          inputProps={{
            type: "password",
            value: userInfo.password,
            placeholder: "비밀번호",
            onChange: e => handleInput("password", e.target.value),
          }}
          iProps={{onClick: () => handleInput("password", "")}}
        />
        <FullWidthBtn text="로그인" />
      </form>
      <div className={styles.bottomDiv}>
        <span className="me-2">혹시, 우슐랭가이드가 처음이신가요?</span>
        <Link to={routeTo('Signup')} state={state} className={`text-success ${styles.signupLink}`}>회원가입</Link>
      </div>
    </div>
  );
}
 
export default Login;