import styles from './Login.module.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { requestLogin } from "../../../apis/authApi";
import { createPath } from "../../../utils/functions/common";

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

          if ('location' in state) {
            navigate(createPath(state.location.pathname, state.location));
          } else {
            navigate('/main');
          }
        } else {
          alert('계정 정보가 일치하지 않습니다.');
        }
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={e => handleSubmit(e)} className={styles.form}>
        <div className={styles.inputDiv}>
          <input
            value={userInfo.email}
            type="email"
            placeholder="이메일"
            onChange={e => handleInput("email", e.target.value)}
            className={styles.input}
          />
          {userInfo.email &&
            <i
              className={`fa-solid fa-circle-xmark ${styles.clearIcon}`}
              onClick={() => handleInput('email', '')}
            />
          }
        </div>
        <div className={styles.inputDiv}>
          <input
            value={userInfo.password}
            type="password"
            placeholder="비밀번호"
            onChange={e => handleInput("password", e.target.value)}
            className={styles.input}
          />
          {userInfo.password &&
            <i
              className={`fa-solid fa-circle-xmark ${styles.clearIcon}`}
              onClick={() => handleInput('password', '')}
            />
          }
        </div>
        <button className={`btn btn-success ${styles.loginBtn}`}>로그인</button>
      </form>
      <div className={styles.bottomDiv}>
        <span className="me-2">혹시, 우슐랭가이드가 처음이신가요?</span>
        <Link to="/auth/signup" className={`text-success ${styles.signupLink}`}>회원가입</Link>
      </div>
    </div>
  );
}
 
export default Login;