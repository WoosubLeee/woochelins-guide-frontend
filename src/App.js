import './utils/styles/common.css'
import styles from './App.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setIsLogin } from "./features/auth/authSlice";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Main from './features/main/Main';
import Home from './features/main/home/Home';
import PlaceInfoCard from './features/main/place/placeInfoCard/PlaceInfoCard';
import PlaceRecommenders from './features/main/place/placeRecommenders/PlaceRecommenders';
import PlaceAddList from './features/main/place/placeInfoCard/placeAddList/PlaceAddList';
import PlaceList from './features/main/place/placeList/PlaceList';
import SearchResult from './features/main/place/search/searchResult/SearchResult';
import GroupInfo from './features/main/group/groupInfo/GroupInfo';
import GroupInvitation from './features/main/group/groupInfo/groupInvitation/GroupInvitation';
import GroupList from './features/main/group/groupList/GroupList';
import GroupCreate from './features/main/group/groupCreate/GroupCreate';
import MyListCreate from './features/main/group/groupCreate/MyListCreate';
import Menu from './features/main/menu/Menu';
import Signup from './features/auth/signup/Signup';
import Login from './features/auth/login/Login';
import { requestIsValid } from './apis/authApi';
import { routeTo, createPath } from './utils/functions/routes';

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
    element: <Navigate to={routeTo('Login')} replace={true} state={{location: location}} />
  } : {
    element: <Main />
  };
  const authElement = isLogin && (
    { element: <Navigate to={
      (location.state && 'location' in location.state) ? 
      createPath(location.state.location.pathname, location.state.location) : 
      routeTo('Home')}
      replace={true} /> }
  );

  return (
    <div className={styles.App}>
      <Routes>
        <Route path="" {...mainElement}>
          <Route path="" element={<Home />}>
            <Route path="place/:kakaoMapId" element={<PlaceInfoCard />} />
          </Route>
          <Route path="place/:kakaoMapId/add" element={<PlaceAddList />} />
          <Route path="place/:kakaoMapId/recommenders" element={<PlaceRecommenders />} />
          <Route path="place/list" element={<PlaceList />} />
          <Route path="place/search/:keyword" element={<SearchResult />} />
          <Route path="group/info" element={<GroupInfo />} />
          <Route path="group/list" element={<GroupList />} />
          <Route path="group/:groupId/invitation/:token" element={<GroupInvitation />} />
          <Route path="group/create" element={<GroupCreate />} />
          <Route path="mylist/create" element={<MyListCreate />} />
          <Route path="menu" element={<Menu />} />
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