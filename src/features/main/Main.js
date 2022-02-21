import styles from './Main.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mapApiLoaded } from './map/mapSlice';
import { Outlet } from 'react-router-dom';
import { Loader } from "@googlemaps/js-api-loader";
import Map from "./map/Map";
import Search from "./search/Search";
import NavBar from './navBar/NavBar';
import GroupBar from './groupBar/GroupBar';

const Main = () => {
  const dispatch = useDispatch();

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

  return (
    <div className={styles.main}>
      <Map />
      <Search />
      <GroupBar />
      <Outlet />
      <NavBar />
    </div>
  );
}
 
export default Main;