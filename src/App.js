import './utils/styles/common.css'
import styles from './App.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setIsLogin } from "./features/auth/authSlice";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Main from './features/main/Main';
import PlaceInfoCard from './features/main/placeInfoCard/PlaceInfoCard';
import PlaceAddList from './features/main/placeInfoCard/placeAddList/PlaceAddList';
import PlaceList from './features/main/placeList/PlaceList';
import Menu from './features/main/menu/Menu';
import GroupInfo from './features/main/groupInfo/GroupInfo';
import GroupList from './features/main/menu/groupList/GroupList';
import GroupCreate from './features/main/menu/groupList/groupCreate/GroupCreate';
import PlaceListCreate from './features/main/menu/groupList/groupCreate/PlaceListCreate';
import Signup from './features/auth/signup/Signup';
import Login from './features/auth/login/Login';
import { requestIsValid } from './apis/authApi';
import { createPath } from './utils/functions/common';
import GroupInvitation from './features/main/groupInfo/groupInvitation/GroupInvitation';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const isLogin = useSelector(state => state.auth.isLogin);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      requestIsValid()
        .then(res => {
          if (res.status === 200) {
            dispatch(setIsLogin(true));
          } else {
            dispatch(setIsLogin(false));
            localStorage.removeItem('token');
          }
        });
    } else {
      dispatch(setIsLogin(false));
      localStorage.removeItem('token');
    }
  }, []);

  const mainElement = !isLogin ? {
    element: <Navigate to="/auth/login" replace={true} state={{location: location}} />
  } : {
    element: <Main />
  };
  const authElement = isLogin && (
    { element: <Navigate to={(location.state && 'location' in location.state) ? createPath(location.state.location.pathname, location.state.location) : "/main"} replace={true} /> }
  );

  return (
    <div className={`${styles.App} mx-auto`}>
      <Routes>
        <Route index element={<Navigate to="/main" replace={true} />} />
        <Route path="main" {...mainElement}>
          <Route path="place/:googleMapsId" element={<PlaceInfoCard />} />
          <Route path="place/:googleMapsId/add" element={<PlaceAddList />} />
          <Route path="place/list" element={<PlaceList />} />
          <Route path="menu" element={<Menu />} />
          <Route path="group/info" element={<GroupInfo />} />
          <Route path="group/:groupId/invitation/:token" element={<GroupInvitation />} />
          <Route path="group/list" element={<GroupList />} />
          <Route path="group/create" element={<GroupCreate />} />
          <Route path="placelist/create" element={<PlaceListCreate />} />
        </Route>
        <Route path="auth" {...authElement}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;