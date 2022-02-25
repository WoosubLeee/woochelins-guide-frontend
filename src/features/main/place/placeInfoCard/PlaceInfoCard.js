import styles from "./PlaceInfoCard.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFocusedPlace } from "../../map/mapSlice";
import { useLocation, useParams } from "react-router-dom";
import PlaceAddList from "./placeAddList/PlaceAddList";
import { requestGetGroupPlaceRecommendedBy, requestGetPlace } from "../../../../apis/placeApi";
import { changeGeometryToNum, snakeToCamel } from "../../../../utils/functions/common";
import GoogleMapsIcon from "../../../../utils/images/google-maps-icon.svg"

const PlaceInfoCard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const { googleMapsId } = useParams();

  const map = useSelector(state => state.map.map);
  const listData = useSelector(state => state.map.listData);
  const focusedPlace = useSelector(state => state.map.focusedPlace);

  const [recommendedBy, setRecommendedBy] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (!focusedPlace || focusedPlace.googleMapsId !== googleMapsId) {
      requestGetPlace(googleMapsId)
        .then(async res => {
          const placesService = new window.google.maps.places.PlacesService(map);

          // DB에 저장된 장소의 경우
          if (res.status === 200) {
            let data = await res.json();
            data = changeGeometryToNum(snakeToCamel(data));

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
                const payload = {
                  googleMapsId: place.place_id,
                  name: place.name,
                  latitude: place.geometry.location.lat(),
                  longitude: place.geometry.location.lng(),
                  address: place.formatted_address,
                  phoneNumber: place.formatted_phone_number,
                  photos: place.photos ? place.photos.map(photo => photo.getUrl()) : [],
                  googleMapsUrl: place.url
                };
                dispatch(setFocusedPlace(payload));
              });
            }
          }
        });
    }
  }, [location, map]);

  useEffect(() => {
    if (recommendedBy.length === 0 && focusedPlace && listData && listData.isGroup) {
      requestGetGroupPlaceRecommendedBy(listData.id, googleMapsId)
        .then(data => {
          setRecommendedBy(data);
        });
    }
  }, [focusedPlace, listData]);

  return (
    <>
      {focusedPlace && <>
        <div className={styles.container}>
          <h5>{focusedPlace.name}</h5>
          <i className={`bi bi-star-fill ${styles.starIcon}`} />
          <span>
            <span className="fw-bold">{recommendedBy.length}명</span>이 추천합니다
          </span>
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
            {listData && listData.isGroup &&
              <div className={`${styles.buttonWrap} ${styles.rightBorder}`}>
                <i className="bi bi-people" />
                <span className={styles.btnText}>추천인</span>
              </div>
            }
            <div onClick={() => setIsAdding(true)} className={`${styles.buttonWrap} ${styles.rightBorder}`}>
              <i className="bi bi-bookmark-plus" />
              <span className={styles.btnText}>저장</span>
            </div>
            <a
              href={`tel:${focusedPlace.phoneNumber}`}
              className={`${styles.buttonWrap} ${styles.rightBorder} ${styles.btnLink}`}
            >
              <i className="bi bi-telephone-outbound" />
              <span className={styles.btnText}>전화</span>
            </a>
            <a href={focusedPlace.googleMapsUrl} target="_blank" rel="noreferrer" className={`${styles.buttonWrap} ${styles.btnLink}`}>
              <img src={GoogleMapsIcon} alt="" height={"20px"} />
              <span className={styles.btnText}>구글 지도</span>
            </a>
          </div>
        </div>
        {isAdding && <PlaceAddList />}
      </>}
    </>
  );
}
 
export default PlaceInfoCard;