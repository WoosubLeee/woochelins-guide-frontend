import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../../../components/navbar/topNavbar/TopNavbar";
import { setIsLogin } from "../../auth/authSlice";

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem('token');
    dispatch(setIsLogin(false));
    navigate("/auth/login");
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