import { useDispatch } from "react-redux";
import { setIsLogin } from "../../auth/authSlice";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../../../components/navbar/topNavbar/TopNavbar";
import { routeTo } from "../../../utils/functions/routes";

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem('token');
    dispatch(setIsLogin(false));
    navigate(routeTo('Login'));
  };

  return (
    <div className="full-screen-white">
      <TopNavbar
        header="더보기"
        backBtnTo={-1}
      />
      <div>
        <button onClick={handleClick}>로그아웃</button>
      </div>
    </div>
  );
}
 
export default Menu;