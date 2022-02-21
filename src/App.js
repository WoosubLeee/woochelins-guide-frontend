import './utils/styles/common.css'
import styles from './App.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setIsLogin } from "./features/auth/authSlice";
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './features/main/Main';
import GroupCreate from './features/main/groupBar/groupList/groupCreate/GroupCreate';
import PlaceListCreate from './features/main/groupBar/groupList/groupCreate/PlaceListCreate';
import PlaceList from './features/main/placeList/PlaceList';
import PlaceInfoCard from './features/main/placeInfoCard/PlaceInfoCard';
import Signup from './features/auth/Signup';
import Login from './features/auth/Login';
import { requestIsValid } from './apis/authApi';

function App() {
  const isLogin = useSelector(state => state.auth.isLogin);
  const dispatch = useDispatch();

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
    element: <Navigate to="/auth/login" replace={true} />
  } : {
    element: <Main />
  };
  const authElement = isLogin && { element: <Navigate to="/main" replace={true} /> };

  return (
    <div className={`${styles.App} mx-auto`}>
      <Routes>
        <Route index element={<Navigate to="/main" replace={true} />} />
        <Route path="main" {...mainElement}>
          <Route path="place/:googleMapsId" element={<PlaceInfoCard />} />
          <Route path="place/list" element={<PlaceList />} />
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