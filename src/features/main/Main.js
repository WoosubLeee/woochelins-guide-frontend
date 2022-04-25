import styles from './Main.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGroupsAndMylists } from "./group/groupSlice";
import { setFocusedPlace, updateCurrentPlaces } from './place/placeSlice';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import Map from "./map/Map";
import BottomNavbar from './bottomNavbar/BottomNavbar';
import {
  requestGetPlace,
} from '../../apis/placeApi';
import {
  changeGeometryToNum,
  snakeToCamel
} from '../../utils/functions/common';

const Main = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { kakaoMapId } = useParams();

  const isLoginChecked = useSelector(state => state.auth.isLoginChecked);
  const focusedPlace = useSelector(state => state.place.focusedPlace);

  // FocusedPlace 처리
  useEffect(() => {
    // focus할 장소가 있는 경우
    if (kakaoMapId) {
      if (!focusedPlace || focusedPlace.kakaoMapId !== kakaoMapId) {
        requestGetPlace(kakaoMapId)
          .then(async res => {
            // DB에 저장된 맛집의 경우
            if (res.status === 200) {
              let data = await res.json();
              data = changeGeometryToNum(snakeToCamel(data));

              dispatch(setFocusedPlace(data));

            // DB에 저장되지 않은 맛집의 경우
            } else {
              alert('맛집을 불러오는 과정 중 오류가 발생했습니다.');
            }
          });
      }
    // focus할 장소가 없는 경우
    } else {
      dispatch(setFocusedPlace(undefined));
    }
  }, [kakaoMapId]);

  useEffect(() => {
    dispatch(updateCurrentPlaces(location));
  }, [location.search, dispatch, location]);

  // User의 Group과 MyList 목록 가져오기
  useEffect(() => {
    dispatch(updateGroupsAndMylists);
  }, [dispatch]);

  return (
    <div className={styles.main}>
      {isLoginChecked && <>
        <Map />
        <Outlet />
        <BottomNavbar />
      </>}
    </div>
  );
}
 
export default Main;