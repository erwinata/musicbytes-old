import { getSongPlayed } from "helpers/localStorage";
import { Dispatch } from "redux";
import { AppState } from "redux/store/configureStore";
import { AllActions } from "redux/types/app";
import { Playlist } from "types/Playlist";
import {
  CommonRecommendation,
  Recommendation,
  RecommendationType,
} from "types/Recommendation";
import { Song } from "types/Song";

export const actionAddCommonRecommendation = (
  recommendation: CommonRecommendation
): AllActions => ({
  type: "ADD_COMMON_RECOMMENDATION",
  recommendation,
});

export const actionAddRecommendation = (
  recommendation: Recommendation
): AllActions => ({
  type: "ADD_RECOMMENDATION",
  recommendation,
});

export const actionFillRecommendation = (
  song: Song[],
  reference: { song: Song; type: RecommendationType }
): AllActions => ({
  type: "FILL_RECOMMENDATION",
  song,
  reference,
});

export const actionRemoveRecommendation = (reference: {
  song: Song;
  type: RecommendationType;
}): AllActions => ({
  type: "REMOVE_RECOMMENDATION",
  reference,
});

export const actionAddSongSearched = (
  songId: string,
  isEnded: boolean
): AllActions => ({
  type: "ADD_SONG_SEARCHED",
  songId,
  isEnded,
});

export const actionSetLoadingRecommendation = (
  loading: boolean
): AllActions => ({
  type: "SET_LOADING_RECOMMENDATION",
  loading,
});

export const actionSetRecent = (
  recent: {
    song?: Song;
    playlist?: Playlist;
  }[]
): AllActions => ({
  type: "ADD_RECENT",
  recent,
});

export const addCommonRecommendation = (
  recommendation: CommonRecommendation
) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionAddCommonRecommendation(recommendation));
  };
};

export const addRecommendation = (recommendation: Recommendation) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionAddRecommendation(recommendation));
  };
};

export const fillRecommendation = (
  song: Song[],
  reference: { song: Song; type: RecommendationType }
) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionFillRecommendation(song, reference));
  };
};

export const removeRecommendation = (reference: {
  song: Song;
  type: RecommendationType;
}) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionRemoveRecommendation(reference));
  };
};

export const addSongSearched = (songId: string) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    let cachedSongPlayed = getSongPlayed();
    let isEnded = false;

    if (
      getState().listen.recommendationState.songSearched.length ===
      cachedSongPlayed.length - 1
    ) {
      isEnded = true;
    }

    dispatch(actionAddSongSearched(songId, isEnded));
  };
};

export const setLoadingRecommendation = (loading: boolean) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionSetLoadingRecommendation(loading));
  };
};

export const setRecent = (recent: { song?: Song; playlist?: Playlist }[]) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionSetRecent(recent));
  };
};
