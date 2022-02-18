import styles from './Main.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mapApiLoaded, removeFocusedPlace } from './map/mapSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import { Loader } from "@googlemaps/js-api-loader";
import Map from "./map/Map";
import Search from "./search/Search";
import NavBar from './navBar/NavBar';

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const focusedPlace = useSelector(state => state.map.focusedPlace);

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

  const handleClick = () => {
    dispatch(removeFocusedPlace());
    navigate('/main/place/list');
  };

  return (
    <div className={styles.main}>
      <Map />
      <Search />
      <button onClick={handleClick} className={`${styles.listButton} ${focusedPlace && styles.listButtonFocused}`}>
        목록 보기
      </button>
      <Outlet />
      <NavBar />
    </div>
  );
}
 
export default Main;