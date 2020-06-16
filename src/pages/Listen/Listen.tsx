import { generateRecommendation } from "api/Listen";
import { CategoryTitle } from "components/CategoryTitle/CategoryTitle";
import { InfoImage } from "components/InfoImage/InfoImage";
import { Loading } from "components/Loading/Loading";
import { RecommendationItem } from "components/RecommendationItem/RecommendationItem";
import SongGrid from "components/SongGrid/SongGrid";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { addRecommendation, setRecent } from "redux/actions/listen";
import { AppState } from "redux/store/configureStore";
import { AppActionTypes } from "redux/types/app";
import { InfoImageType } from "types/InfoImage";
import { LoadingType } from "types/LoadingType";
import { OptionActionType } from "types/Option";
import { Playlist } from "types/Playlist";
import { CommonRecommendation, Recommendation } from "types/Recommendation";
import { Song } from "types/Song";
import "./Listen.scss";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {}
interface StateProps {
  recent: {
    song?: Song;
    playlist?: Playlist;
  }[];
  recommendation: Recommendation[];
  recommendationState: {
    loading: boolean;
    songSearched: string[];
    isEnded: boolean;
  };
  commonRecommendation: CommonRecommendation[];
  deviceInfo: {
    isLandscape: boolean;
    isTouch: boolean;
  };
  songs?: {
    playing: Song;
    list: Song[];
  };
}
interface DispatchProps {
  addRecommendation: (recommendation: Recommendation) => any;
  setRecent: (recent: { song?: Song; playlist?: Playlist }[]) => any;
}

const Listen: React.FC<Props> = ({
  recent,
  recommendation,
  recommendationState,
  commonRecommendation,
  deviceInfo,
  songs,
  addRecommendation,
  setRecent,
}: Props) => {
  const optionList: OptionActionType[] = [
    OptionActionType.ADD_TO_NOW_PLAYING,
    OptionActionType.ADD_TO_PLAYLIST,
    OptionActionType.LIKE_SONG,
  ];

  const [loadingMore, setLoadingMore] = useState(false);

  const handleScroll = (e: any) => {
    const target = e.target;

    let pos = target.scrollHeight - target.scrollTop;

    if (pos >= target.clientHeight - 5 && pos <= target.clientHeight) {
      if (!loadingMore) {
        setLoadingMore(true);
        generateRecommendation(2);
      }
    }
  };

  return (
    <div
      className={`Listen ${!deviceInfo.isTouch ? "desktop" : ""}`}
      onScroll={handleScroll}
    >
      {/* <div className={`outer-wrapper ${!deviceInfo.isTouch ? "desktop" : ""}`}>
        <div className={`wrapperr ${!deviceInfo.isTouch ? "desktop" : ""}`}>
          <div className={`HorizonItem`}>
            <div
              className="image"
              style={{
                backgroundImage:
                  "url('https://i.ytimg.com/vi/7dNrO7TSZdU/hqdefault.jpg')",
              }}
            ></div>
            <h1>Judul</h1>
            <h2>artis</h2>
          </div>
          <div className={`HorizonItem`}>
            <div
              className="image"
              style={{
                backgroundImage:
                  "url('https://i.ytimg.com/vi/7dNrO7TSZdU/hqdefault.jpg')",
              }}
            ></div>
            <h1>Judul</h1>
            <h2>artis</h2>
          </div>
          <div className={`HorizonItem`}>
            <div
              className="image"
              style={{
                backgroundImage:
                  "url('https://i.ytimg.com/vi/7dNrO7TSZdU/hqdefault.jpg')",
              }}
            ></div>
            <h1>Judul</h1>
            <h2>artis</h2>
          </div>
          <div className={`HorizonItem`}>
            <div
              className="image"
              style={{
                backgroundImage:
                  "url('https://i.ytimg.com/vi/7dNrO7TSZdU/hqdefault.jpg')",
              }}
            ></div>
            <h1>Judul</h1>
            <h2>artis</h2>
          </div>
          <div className={`HorizonItem`}>
            <div
              className="image"
              style={{
                backgroundImage:
                  "url('https://i.ytimg.com/vi/7dNrO7TSZdU/hqdefault.jpg')",
              }}
            ></div>
            <h1>Judul</h1>
            <h2>artis</h2>
          </div>
        </div>
      </div> */}

      {/* <div className="tesHorizontal">
        <div className="tesHorizontalItem">
          <img src="https://i.ytimg.com/vi/7dNrO7TSZdU/hqdefault.jpg" alt="a" />
        </div>
        <div className="tesHorizontalItem">
          <img src="https://i.ytimg.com/vi/7dNrO7TSZdU/hqdefault.jpg" alt="a" />
        </div>
        <div className="tesHorizontalItem">
          <img src="https://i.ytimg.com/vi/7dNrO7TSZdU/hqdefault.jpg" alt="a" />
        </div>
        <div className="tesHorizontalItem">
          <img src="https://i.ytimg.com/vi/7dNrO7TSZdU/hqdefault.jpg" alt="a" />
        </div>
        <div className="tesHorizontalItem">
          <img src="https://i.ytimg.com/vi/7dNrO7TSZdU/hqdefault.jpg" alt="a" />
        </div>
        <div className="tesHorizontalItem">
          <img src="https://i.ytimg.com/vi/7dNrO7TSZdU/hqdefault.jpg" alt="a" />
        </div>
      </div> */}

      {recent.length > 0 ? (
        <>
          <CategoryTitle text="Recently Played" />
          <SongGrid items={recent} optionList={optionList} />{" "}
        </>
      ) : null}

      {commonRecommendation.length > 0 ? (
        <>
          <CategoryTitle text="Musicbytes Recommendation" />

          {commonRecommendation.map((recommendationItem, index) => {
            return (
              <RecommendationItem
                recommendation={recommendationItem}
                optionList={optionList}
                key={index}
              />
            );
          })}
        </>
      ) : null}

      <CategoryTitle text="You might like these" />

      {recommendation.length > 0 || !recommendationState.isEnded ? (
        <>
          {recommendation.map((recommendationItem) => {
            return (
              <RecommendationItem
                recommendation={recommendationItem}
                optionList={optionList}
                key={recommendationItem.reference.song.id}
              />
            );
          })}
        </>
      ) : (
        <InfoImage
          show={true}
          type={InfoImageType.NODATA}
          text="There is no recommendation right now"
        />
      )}

      <Loading show={recommendationState.loading} type={LoadingType.Scale} />

      {recommendationState.isEnded ? (
        <div className="end">
          <h1>Wanna see more recommendation?</h1>
          <h2>Play more songs so we can tune your preferences :)</h2>
        </div>
      ) : null}

      {songs?.playing && !deviceInfo.isLandscape ? (
        <div className="miniPlayerPadding"></div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    recent: state.listen.recent,
    recommendation: state.listen.recommendation,
    recommendationState: state.listen.recommendationState,
    commonRecommendation: state.listen.commonRecommendation,
    deviceInfo: state.app.deviceInfo,
    songs: state.player.songs,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  addRecommendation: bindActionCreators(addRecommendation, dispatch),
  setRecent: bindActionCreators(setRecent, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Listen);
