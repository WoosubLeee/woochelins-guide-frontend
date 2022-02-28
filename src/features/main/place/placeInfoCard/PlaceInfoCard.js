import styles from "./PlaceInfoCard.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { requestGetGroupPlaceRecommenders } from "../../../../apis/placeApi";
import { createPath } from "../../../../utils/functions/common";
import GoogleMapsIcon from "../../../../utils/images/google-maps-icon.svg"

const PlaceInfoCard = () => {
  const location = useLocation();
  
  const { googleMapsId } = useParams();
  
  const listData = useSelector(state => state.map.listData);
  const focusedPlace = useSelector(state => state.place.focusedPlace);

  const [recommenders, setRecommenders] = useState([]);

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
    <div className={styles.container}>
      {(focusedPlace && listData) ? (<>
        <h5>{focusedPlace.name}</h5>
        {listData.isGroup && <>
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