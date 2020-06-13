import { AllActions } from "redux/types/app";
import { Dispatch } from "redux";
import { AppState } from "redux/store/configureStore";
import { SearchSong } from "api/Search";
import { Song } from "types/Song";
import { find } from "lodash";
import { Recommendation, RecommendationType } from "types/Recommendation";
import { Playlist } from "types/Playlist";

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

export const actionSetRecent = (
  recent: {
    song?: Song;
    playlist?: Playlist;
  }[]
): AllActions => ({
  type: "ADD_RECENT",
  recent,
});

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

export const setRecent = (recent: { song?: Song; playlist?: Playlist }[]) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionSetRecent(recent));
  };
};
