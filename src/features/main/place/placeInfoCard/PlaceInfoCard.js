import styles from "./PlaceInfoCard.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFocusedPlace } from "../../map/mapSlice";
import { Link, useLocation, useParams } from "react-router-dom";
import { requestGetGroupPlaceRecommenders, requestGetPlace } from "../../../../apis/placeApi";
import { changeGeometryToNum, createPath, processGooglePlaceData, snakeToCamel } from "../../../../utils/functions/common";
import GoogleMapsIcon from "../../../../utils/images/google-maps-icon.svg"

const PlaceInfoCard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const { googleMapsId } = useParams();
  
  const isMapApiLoaded = useSelector(state => state.map.isMapApiLoaded);
  const map = useSelector(state => state.map.map);
  const listData = useSelector(state => state.map.listData);
  const focusedPlace = useSelector(state => state.map.focusedPlace);

  const [recommenders, setRecommenders] = useState([]);

  useEffect(() => {
    if (isMapApiLoaded && map) {
      if (!focusedPlace || focusedPlace.googleMapsId !== googleMapsId) {
        requestGetPlace(googleMapsId)
          .then(async res => {
            const placesService = new window.google.maps.places.PlacesService(map);

            // DB에 저장된 장소의 경우
            if (res.status === 200) {
              let data = await res.json();
              data = changeGeometryToNum(snakeToCamel(data));

              // 사진 정보는 DB에 없으므로 Google에 다시 요청
              placesService.getDetails({
                placeId: googleMapsId,
                fields: ['photos']
              }, (place, status) => {
                const photos = place.photos.map(photo => photo.getUrl());
                data.photos = photos;
                dispatch(setFocusedPlace(data));
              });

            // DB에 저장되지 않은 장소의 경우
            } else if (res.status === 404) {
              if (map) {
                placesService.getDetails({
                  placeId: googleMapsId,
                  fields: [
                    'place_id',
                    'name',
                    'geometry.location',
                    'type',
                    'formatted_address',
                    'photos',
                    'url',
                    'formatted_phone_number'
                  ]
                }, (place, status) => {
                  const payload = processGooglePlaceData(place);
                  dispatch(setFocusedPlace(payload));
                });
              }
            }
          });
      }
    }
  }, [isMapApiLoaded, map, location]);

  useEffect(() => {
    if (recommenders.length === 0 && listData) {
      if (listData.isGroup) {
        requestGetGroupPlaceRecommenders(listData.id, googleMapsId)
          .then(data => {
            setRecommenders(data);
          });
      }
    }
  }, [listData]);

  return (
    <>
      {focusedPlace && listData &&
        <div className={styles.container}>
          <h5>{focusedPlace.name}</h5>
          {focusedPlace.isGroup && <>
            <i className={`bi bi-star-fill ${styles.starIcon}`} />
            <span>
              <Link
                to={createPath(`/main/place/${googleMapsId}/recommenders`, location)}
                className="fw-bold text-success"
              >
                {recommenders.length}명
              </Link>이 추천합니다
            </span>
          </>}
          <p className={styles.address}>{focusedPlace.address}</p>
          {focusedPlace.photos &&
            <div className={`d-flex ${styles.photoContainer}`}>
              {focusedPlace.photos.map((photo, i) => {
                return (
                  <img key={i} src={photo} className={`img-thumbnail ${styles.img}`} alt="" />
                )
              })}
            </div>
          }

          {/* 하단 버튼들 */}
          <div className={styles.buttonsContainer}>
            {/* 추천인 */}
            {listData.isGroup &&
              <Link
                to={createPath(`/main/place/${googleMapsId}/recommenders`, location)}
                className={`link-black ${styles.buttonWrap} ${styles.rightBorder}`}
              >
                <i className="bi bi-people text-success" />
                <span className={styles.btnText}>추천인</span>
              </Link>
            }
            {/* 장소 추천 */}
            <Link
              to={createPath(`/main/place/${googleMapsId}/add`, location)}
              className={`${styles.buttonWrap} ${styles.rightBorder}`}
            >
              <i className="bi bi-bookmark-plus text-success" />
              <span className={styles.btnText}>저장</span>
            </Link>
            {/* 전화 */}
            <a
              href={`tel:${focusedPlace.phoneNumber}`}
              className={`link-black ${styles.buttonWrap} ${styles.rightBorder}`}
            >
              <i className="bi bi-telephone-outbound text-success" />
              <span className={styles.btnText}>전화</span>
            </a>
            {/* 구글 지도에서 보기 */}
            <a
              href={focusedPlace.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className={`link-black ${styles.buttonWrap}`}
            >
              <img src={GoogleMapsIcon} alt="" height={"20px"} />
              <span className={styles.btnText}>구글 지도</span>
            </a>
          </div>
        </div>
      }
    </>
  );
}
 
export default PlaceInfoCard;