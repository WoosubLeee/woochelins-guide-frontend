import styles from './Signup.module.css';
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import validator from "validator";
import TopNavbar from "../../../components/navbar/topNavbar/TopNavbar";
import FullWidthBtn from "../../../components/buttons/fullWidthBtn/FullWidthBtn";
import BottomBorderInput from '../../../components/inputs/bottomBorderInput/BottomBorderInput';
import { requestLogin, requestSignup } from "../../../apis/authApi";
import { createPath, routeTo } from '../../../utils/functions/routes';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: ''
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailErrorMsg, setEmailErrorMsg] = useState('이메일 형식이 아닙니다.');
  const [isEmailFocusOut, setIsEmailFocusOut] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordFocusOut, setIsPasswordFocusOut] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isPasswordConfFocusOut, setIsPasswordConfFocusOut] = useState(false);
  const [isAllValid, setIsAllValid] = useState(true);

  useEffect(() => {
    if (isEmailFocusOut) {
      if (!userInfo.email || validator.isEmail(userInfo.email)) {
        setIsEmailValid(true);
        setEmailErrorMsg('이메일 형식이 아닙니다.');
      } else {
        setIsEmailValid(false);
      }
    }
  }, [userInfo.email, isEmailFocusOut]);

  useEffect(() => {
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    if (!userInfo.username || (userInfo.username.length <= 15 && regex.test(userInfo.username))) {
      setIsUsernameValid(true);
    } else {
      setIsUsernameValid(false);
    }
  }, [userInfo.username]);

  useEffect(() => {
    if (isPasswordFocusOut) {
      if (!userInfo.password || userInfo.password.length >= 8) {
        setIsPasswordValid(true);
      } else {
        setIsPasswordValid(false);
      }
    }
  }, [userInfo.password, isPasswordFocusOut]);

  useEffect(() => {
    if (isPasswordConfFocusOut) {
      if (userInfo.password === userInfo.passwordConfirmation) {
        setIsPasswordMatch(true);
      } else {
        setIsPasswordMatch(false);
      }
    }
  }, [userInfo.passwordConfirmation, isPasswordConfFocusOut]);

  useEffect(() => {
    if ((isEmailValid && isUsernameValid && isPasswordValid && isPasswordMatch) && (Object.values(userInfo).every(value => value))) {
        setIsAllValid(true);
    } else {
      setIsAllValid(false);
    }
  }, [userInfo, isEmailValid, isUsernameValid, isPasswordValid, isPasswordMatch]);

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
      .then(async signupRes => {
        if (signupRes.status === 201) {
          requestLogin(userInfo)
            .then(() => {
              alert('우슐랭가이드에 오신 것을 환영합니다!');
              dispatch(setIsLogin(true));

              if (location.state?.location) {
                navigate(createPath(location.state.location.pathname, location.state.location));
              } else {
                navigate(routeTo('Home'));
              }
            });
        } else {
          const data = await signupRes.json();
          if (data.email_exists) {
            setIsEmailValid(false);
            setEmailErrorMsg('이미 가입된 이메일입니다.');
          } else {
            alert('회원가입에 실패했습니다.');
          }
        }
      });
  };

  return (
    <div>
      <TopNavbar header="회원가입" backBtnTo={-1} />
      <div className="body-without-topnavbar mt-4">
        {/* 이메일 */}
        <div className={styles.inputWrap}>
          <BottomBorderInput
            labelText={"이메일"}
            inputProps={{
              type: "email",
              value: userInfo.email,
              placeholder: "email@email.com",
              onChange: e => handleInput("email", e.target.value),
              onBlur: () => setIsEmailFocusOut(true)
            }}
            iProps={{onClick: () => handleInput("email", "")}}
            containerClass={`${styles.propContainer} ${!isEmailValid && styles.inputDanger}`}
          />
          <span className={`${styles.span} ${(!isEmailFocusOut || isEmailValid) && styles.spanHidden} text-danger`}>{emailErrorMsg}</span>
        </div>
        {/* 닉네임 */}
        <div className={styles.inputWrap}>
          <BottomBorderInput
            labelText={"닉네임"}
            inputProps={{
              type: "text",
              value: userInfo.username,
              placeholder: "한글, 영어, 숫자 2~15자",
              onChange: e => handleInput("username", e.target.value)
            }}
            iProps={{onClick: () => handleInput("username", "")}}
            containerClass={`${styles.propContainer} ${!isUsernameValid && styles.inputDanger}`}
          />
          <span className={`${styles.span} ${(isUsernameValid) && styles.spanHidden} text-danger`}>한글, 영어, 숫자 2~15자</span>
        </div>
        {/* 비밀번호 */}
        <div className={styles.inputWrap}>
          <BottomBorderInput
            labelText={"비밀번호"}
            inputProps={{
              type: "password",
              value: userInfo.password,
              placeholder: "비밀번호는 8자 이상입니다.",
              onChange: e => handleInput("password", e.target.value),
              onBlur: () => setIsPasswordFocusOut(true)
            }}
            iProps={{onClick: () => handleInput("password", "")}}
            containerClass={`${styles.propContainer} ${!isPasswordValid && styles.inputDanger}`}
          />
          <span className={`${styles.span} ${(!isPasswordFocusOut || isPasswordValid) && styles.spanHidden} text-danger`}>비밀번호는 8자 이상입니다.</span>
        </div>
        {/* 비밀번호 확인 */}
        <div className={styles.inputWrap}>
          <BottomBorderInput
            labelText={"비밀번호 확인"}
            inputProps={{
              type: "password",
              value: userInfo.passwordConfirmation,
              onChange: e => handleInput("passwordConfirmation", e.target.value),
              onBlur: () => setIsPasswordConfFocusOut(true)
            }}
            iProps={{onClick: () => handleInput("passwordConfirmation", "")}}
            containerClass={`${styles.propContainer} ${!isPasswordMatch && styles.inputDanger}`}
          />
          <span className={`${styles.span} ${(!isPasswordConfFocusOut || isPasswordMatch) && styles.spanHidden} text-danger`}>비밀번호가 일치하지 않습니다.</span>
        </div>
        <FullWidthBtn
          text="가입"
          props={{
            onClick: e => handleSubmit(e),
            disabled: !isAllValid
          }} 
        />
      </div>
    </div>
  );
}
 
export default Signup;