import React, { useEffect, useState } from "react";
import "./Listen.scss";
import { CategoryTitle } from "components/CategoryTitle/CategoryTitle";
import SongGrid from "components/SongGrid/SongGrid";
import { AppState } from "redux/store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActionTypes } from "redux/types/app";
import { connect } from "react-redux";
import { CategorySubtitle } from "components/CategorySubtitle/CategorySubtitle";
import { find, shuffle, remove } from "lodash";
import { SearchSong } from "api/Search";
import { Song } from "types/Song";
import { clamp } from "helpers/math";
import { OptionActionType } from "types/Option";
import { addRecommendation, setRecent } from "redux/actions/listen";
import { bindActionCreators } from "redux";
import {
  Recommendation,
  RecommendationType,
  CommonRecommendation,
} from "types/Recommendation";
import { RecommendationItem } from "components/RecommendationItem/RecommendationItem";
import { Playlist } from "types/Playlist";
import { resolve } from "url";
import { SongDetail } from "api/SongDetail";
import { SearchSongLocal } from "api/SearchLocal";
import { InfoImage } from "components/InfoImage/InfoImage";
import { InfoImageType } from "types/InfoImage";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {}
interface StateProps {
  recent: {
    song?: Song;
    playlist?: Playlist;
  }[];
  recommendation: Recommendation[];
  commonRecommendation: CommonRecommendation[];
  isDesktop: boolean;
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
  commonRecommendation,
  isDesktop,
  songs,
  addRecommendation,
  setRecent,
}: Props) => {
  const optionList: OptionActionType[] = [
    OptionActionType.ADD_TO_NOW_PLAYING,
    OptionActionType.ADD_TO_PLAYLIST,
    OptionActionType.LIKE_SONG,
  ];

  useEffect(() => {
    console.log("recommendation");
    console.log(recommendation);
  }, [recommendation]);

  return (
    <div className={`Listen ${isDesktop ? "desktop" : ""}`}>
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

      {recommendation.length > 0 ? (
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

      <div className="end">
        <h1>Wanna see more recommendation?</h1>
        <h2>Play more songs so we can tune your preferences :)</h2>
      </div>

      {songs?.playing && !isDesktop ? (
        <div className="miniPlayerPadding"></div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    recent: state.listen.recent,
    recommendation: state.listen.recommendation,
    commonRecommendation: state.listen.commonRecommendation,
    isDesktop: state.app.isDesktop,
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
