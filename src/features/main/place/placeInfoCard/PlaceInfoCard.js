import styles from "./PlaceInfoCard.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { routeTo } from "../../../../utils/functions/routes";
import GoogleMapsIcon from "../../../../utils/images/google-maps-icon.svg"

const PlaceInfoCard = () => {
  const location = useLocation();
  
  const currentGroup = useSelector(state => state.group.currentGroup);
  const currentPlaces = useSelector(state => state.place.currentPlaces);
  const focusedPlace = useSelector(state => state.place.focusedPlace);

  const [isInPlaces, setIsInPlaces] = useState(false);
  const [recommenders, setRecommenders] = useState([]);

  useEffect(() => {
    if (focusedPlace && currentPlaces && currentGroup && currentGroup.isGroup) {
      const place = currentPlaces.find(place => place.googleMapsId === focusedPlace.googleMapsId);
      if (place) {
          setRecommenders(place.recommendedBy);
          setIsInPlaces(true);
      } else {
        setIsInPlaces(false);
      }
    }
  }, [focusedPlace, currentPlaces, currentGroup]);

  return (
    <div className={styles.container}>
      {(focusedPlace && currentGroup) ? (<>
        <h5>{focusedPlace.name}</h5>
        {isInPlaces && <>
          <i className={`bi bi-star-fill ${styles.starIcon}`} />
          <span>
            <Link
              to={routeTo('PlaceRecommenders', { googleMapsId: focusedPlace.googleMapsId}, location)}
              className="fw-bold text-success"
            >
              {recommenders.length}명
            </Link>이 추천합니다
          </span>
        </>}
        <p className={styles.address}>{focusedPlace.address}</p>
        
        {/* 사진은 임시 comment 조치(WG-32) */}
        {/* {focusedPlace.photos &&
          <div className={`d-flex ${styles.photoContainer}`}>
            {focusedPlace.photos.map((photo, i) => {
              return (
                <img key={i} src={photo} className={`img-thumbnail ${styles.img}`} alt="" />
              )
            })}
          </div>
        } */}

        {/* 하단 버튼들 */}
        <div className={styles.buttonsContainer}>
          {/* 추천인 */}
          {isInPlaces &&
            <Link
              to={routeTo('PlaceRecommenders', { googleMapsId: focusedPlace.googleMapsId}, location)}
              className={`link-black ${styles.buttonWrap} ${styles.rightBorder}`}
            >
              <i className="bi bi-people text-success" />
              <span className={styles.btnText}>추천인</span>
            </Link>
          }
          {/* 장소 추천 */}
          <Link
            to={routeTo('PlaceAddList', { googleMapsId: focusedPlace.googleMapsId}, location)}
            className={`${styles.buttonWrap} ${styles.rightBorder}`}
          >
            <i className="bi bi-bookmark-plus text-success" />
            <span className={styles.btnText}>저장</span>
          </Link>
          {/* 전화 */}
          {focusedPlace.phoneNumber &&
            <a
              href={`tel:${focusedPlace.phoneNumber}`}
              className={`link-black ${styles.buttonWrap} ${styles.rightBorder}`}
            >
              <i className="bi bi-telephone-outbound text-success" />
              <span className={styles.btnText}>전화</span>
            </a>
          }
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
      </>) : (

        // 로딩 스피너
        <div className={styles.loadingWrap}>
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
 
export default PlaceInfoCard;