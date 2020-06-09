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
import { addRecommendation } from "redux/actions/listen";
import { bindActionCreators } from "redux";
import { Recommendation, RecommendationType } from "types/Recommendation";
import { RecommendationItem } from "components/RecommendationItem/RecommendationItem";
import { Playlist } from "types/Playlist";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {}
interface StateProps {
  recent: {
    song?: Song;
    playlist?: Playlist;
  }[];
  recommendation: Recommendation[];
  isDesktop: boolean;
}
interface DispatchProps {
  addRecommendation: (recommendation: Recommendation) => any;
}

interface SongListen {
  title: string;
  songs: Song[];
}

const Listen: React.FC<Props> = ({
  recent,
  recommendation,
  isDesktop,
  addRecommendation,
}: Props) => {
  const optionList: OptionActionType[] = [
    OptionActionType.ADD_TO_NOW_PLAYING,
    OptionActionType.ADD_TO_PLAYLIST,
    OptionActionType.LIKE_SONG,
  ];

  const getRandomSongReference = (
    cachedSongPlayed: { song: string; total: number }[]
  ) => {
    let resultIndex: number[] = [];
    let indexPool: number[] = [];
    for (let i = 0; i < cachedSongPlayed.length; i++) {
      indexPool = indexPool.concat(Array(cachedSongPlayed[i].total).fill(i));
    }
    for (let i = 0; i < Math.min(5, cachedSongPlayed.length); i++) {
      let randomIndex = Math.floor(
        Math.random() * Math.floor(indexPool.length)
      );
      let indexSong = indexPool[randomIndex];
      resultIndex.push(indexSong);
      remove(indexPool, (indexPoolItem) => indexPoolItem === indexSong);
    }
    return resultIndex;
  };

  const retrieveRecommendation = async (songSelected: Song) => {
    let totalTags = Math.round(
      clamp(
        songSelected!.tags.length / 6,
        Math.min(songSelected!.tags.length, 6),
        10
      )
    );
    let tags = shuffle(songSelected!.tags);
    let tagsQuery = "";
    for (let i = 0; i < totalTags; i++) {
      tagsQuery += tags[i] + " ";
    }

    let songsResult = await SearchSong(tagsQuery, 10, undefined, true);

    let recommendationAdd: Recommendation = {
      title: "Related to " + songSelected?.title,
      song: songsResult.songs,
      reference: {
        song: songSelected!,
        type: RecommendationType.TAGS,
      },
    };

    addRecommendation(recommendationAdd);
  };

  const generateRecommendation = async () => {
    let cachedSongPlayed: { song: string; total: number }[] = [];

    if (localStorage.getItem("song_played")) {
      cachedSongPlayed = JSON.parse(localStorage.getItem("song_played")!);
      // let songSelectedId = cachedSongPlayed[0].song;

      let songSelectedIndexes = getRandomSongReference(cachedSongPlayed);

      if (localStorage.getItem("song")) {
        let cachedSong: Song[] = JSON.parse(localStorage.getItem("song")!);

        Promise.all(
          songSelectedIndexes.map((songSelectedIndex) => {
            let songSelectedId = cachedSongPlayed[songSelectedIndex].song;
            let songSelected = find(cachedSong, { id: songSelectedId });
            retrieveRecommendation(songSelected!);
          })
        );
      }
    }
  };

  useEffect(() => {
    if (recommendation.length === 0) {
      generateRecommendation();
    }
  }, []);

  return (
    <div className={`Listen ${isDesktop ? "desktop" : ""}`}>
      {recent.length > 0 ? (
        <>
          <CategoryTitle text="Recently Played" />
          <SongGrid items={recent} optionList={optionList} />{" "}
        </>
      ) : null}
      <CategoryTitle text="You might like these" />

      {recommendation.length > 0
        ? recommendation.map((recommendationItem) => {
            return (
              <RecommendationItem
                recommendation={recommendationItem}
                optionList={optionList}
              />
            );
          })
        : null}

      <div className="end">
        <h1>Wanna see more recommendation?</h1>
        <h2>Play more songs so we can tune your preferences :)</h2>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    recent: state.listen.recent,
    recommendation: state.listen.recommendation,
    isDesktop: state.app.isDesktop,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  addRecommendation: bindActionCreators(addRecommendation, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Listen);
