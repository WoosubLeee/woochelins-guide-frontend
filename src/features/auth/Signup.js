import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsLogin } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { requestSignup } from "../../apis/authApi";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: ''
  });
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  useEffect(() => {
    if (userInfo.password === userInfo.passwordConfirmation) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
  }, [userInfo.passwordConfirmation]);

  const handleInput = (field, value) => {
    const info = {
      ...userInfo
    };
    info[field] = value;
    setUserInfo(info);
  };

  const handleSubmit = e => {
    e.preventDefault();

    requestSignup(userInfo)
      .then(loginRes => {
        if (loginRes.status === 200) {
          dispatch(setIsLogin(true));
          navigate('/');
        }
      });
  };

  return (
    <form>
      <h1>회원가입</h1>
      <label>Email</label>
      <input value={userInfo.email} type="email" className="form-control" onChange={e => handleInput("email", e.target.value)} />
      <label>닉네임</label>
      <input value={userInfo.username} type="text" className="form-control" onChange={e => handleInput("username", e.target.value)} />
      <label>비밀번호</label>
      <input value={userInfo.password} type="password" className="form-control" onChange={e => handleInput("password", e.target.value)} />
      <p>비밀번호는 8자 이상이어야 합니다</p>
      <label>비밀번호 확인</label>
      <input value={userInfo.passwordConfirmation} type="password" className="form-control" onChange={e => handleInput("passwordConfirmation", e.target.value)} />
      {!isPasswordMatch && <span>비밀번호가 일치하지 않습니다</span>}
      <button onClick={e => handleSubmit(e)}>가입</button>
    </form>
  );
}
 
export default Signup;