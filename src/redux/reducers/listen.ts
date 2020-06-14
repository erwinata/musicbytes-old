import {
  ListenActionTypes,
  ADD_RECOMMENDATION,
  ADD_RECENT,
  FILL_RECOMMENDATION,
  REMOVE_RECOMMENDATION,
  ADD_COMMON_RECOMMENDATION,
} from "redux/types/listen";
import { Song } from "types/Song";
import { concat, uniqBy, findIndex, remove, filter } from "lodash";
import { Recommendation, CommonRecommendation } from "types/Recommendation";
import { Playlist } from "types/Playlist";

export interface IListenState {
  playlist: Playlist[];
  recommendation: Recommendation[];
  commonRecommendation: CommonRecommendation[];
  recent: {
    song?: Song;
    playlist?: Playlist;
  }[];
}

const listenReducerDefaultState: IListenState = {
  playlist: [],
  recommendation: [],
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
    case ADD_RECENT:
      return {
        ...state,
        recent: action.recent,
      };
    default:
      return state;
  }
};
