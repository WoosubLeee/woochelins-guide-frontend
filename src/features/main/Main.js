import styles from './Main.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mapApiLoaded } from './map/mapSlice';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Loader } from "@googlemaps/js-api-loader";
import Map from "./map/Map";
import { createPath } from '../../utils/functions/common';

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginChecked = useSelector(state => state.auth.isLoginChecked);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyADso4JNS7rJCc2DqF7dj5CJXBFaUXj61A',
      libraries: ['places', 'visualization'],
    });
    
    loader.load()
      .then(() => {
        dispatch(mapApiLoaded());
      });
  }, []);

  useEffect(() => {
    if (location.pathname === '/main') {
      navigate(createPath('/main/home', location));
    }
  }, [location.pathname]);

  return (
    <div className={styles.main}>
      {isLoginChecked && <>
        <Map />
        <Outlet />
      </>}
    </div>
  );
}
 
export default Main;