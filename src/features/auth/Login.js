import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsLogin } from "./authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { requestLogin } from "../../apis/authApi";
import { createPath } from "../../utils/functions/common";

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
        }
      })
      .catch(err => {
        console.error('During Login :', err);
      });
  };

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <h1>회원가입</h1>
      <label>Email</label>
      <input value={userInfo.email} type="email" className="form-control" onChange={e => handleInput("email", e.target.value)} />
      <label>비밀번호</label>
      <input value={userInfo.password} type="password" className="form-control" onChange={e => handleInput("password", e.target.value)} />
      <button>로그인</button>
      <Link to="/auth/signup">아직 회원이 아니신가요?</Link>
    </form>
  );
}
 
export default Login;