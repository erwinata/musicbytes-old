import { filter, findIndex } from "lodash";
import {
  ADD_COMMON_RECOMMENDATION,
  ADD_RECENT,
  ADD_RECOMMENDATION,
  ADD_SONG_SEARCHED,
  FILL_RECOMMENDATION,
  ListenActionTypes,
  REMOVE_RECOMMENDATION,
  SET_LOADING_RECOMMENDATION,
} from "redux/types/listen";
import { Playlist } from "types/Playlist";
import { CommonRecommendation, Recommendation } from "types/Recommendation";
import { Song } from "types/Song";

export interface IListenState {
  playlist: Playlist[];
  recommendation: Recommendation[];
  recommendationState: {
    loading: boolean;
    songSearched: string[];
    isEnded: boolean;
  };
  commonRecommendation: CommonRecommendation[];
  recent: {
    song?: Song;
    playlist?: Playlist;
  }[];
}

const listenReducerDefaultState: IListenState = {
  playlist: [],
  recommendation: [],
  recommendationState: {
    loading: false,
    songSearched: [],
    isEnded: false,
  },
  commonRecommendation: [],
  recent: [],
};

export const listenReducer = (
  state = listenReducerDefaultState,
  action: ListenActionTypes
): IListenState => {
  switch (action.type) {
    case ADD_COMMON_RECOMMENDATION:
      return {
        ...state,
        commonRecommendation: [
          ...state.commonRecommendation,
          action.recommendation,
        ],
      };
    case ADD_RECOMMENDATION:
      return {
        ...state,
        recommendation: [...state.recommendation, action.recommendation],
      };
    case FILL_RECOMMENDATION:
      let indexTarget = findIndex(state.recommendation, {
        reference: action.reference,
      });
      console.log("indexTarget");
      console.log(indexTarget);
      if (indexTarget === -1) return state;
      else
        return {
          ...state,
          recommendation: state.recommendation.map((item, index) => {
            if (index === indexTarget) {
              return { ...item, song: action.song };
            }
            return item;
          }),
        };
    case REMOVE_RECOMMENDATION:
      let recommendation = state.recommendation;
      recommendation = filter(recommendation, (recommendationItem) => {
        return (
          recommendationItem.reference.song.id !== action.reference.song.id
        );
      });
      return {
        ...state,
        recommendation: recommendation,
      };
    case ADD_SONG_SEARCHED:
      return {
        ...state,
        recommendationState: {
          ...state.recommendationState,
          songSearched: [
            ...state.recommendationState.songSearched,
            action.songId,
          ],
          isEnded: action.isEnded,
        },
      };
    case SET_LOADING_RECOMMENDATION:
      return {
        ...state,
        recommendationState: {
          ...state.recommendationState,
          loading: action.loading,
        },
      };
    case ADD_RECENT:
      return {
        ...state,
        recent: action.recent,
      };
    default:
      return state;
  }
};
