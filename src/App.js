import styles from './App.module.css';
import Map from './features/map/Map';
import Search from './features/search/Search';

function App() {
  return (
    <div className={`${styles.App} mx-auto`}>
      <Map />
      <Search />
    </div>
  );
}

export default App;
