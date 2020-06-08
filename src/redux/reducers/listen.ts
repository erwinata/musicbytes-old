import {
  ListenActionTypes,
  ADD_RECOMMENDATION,
  ADD_RECENT,
} from "redux/types/listen";
import { Song } from "types/Song";
import { concat, uniqBy } from "lodash";
import { Recommendation } from "types/Recommendation";
import { Playlist } from "types/Playlist";

export interface IListenState {
  playlist: Playlist[];
  recommendation: Recommendation[];
  recent: {
    song?: Song;
    playlist?: Playlist;
  }[];
}

const listenReducerDefaultState: IListenState = {
  playlist: [],
  recommendation: [],
  recent: [],
};

export const listenReducer = (
  state = listenReducerDefaultState,
  action: ListenActionTypes
): IListenState => {
  switch (action.type) {
    case ADD_RECOMMENDATION:
      return {
        ...state,
        recommendation: [...state.recommendation, action.recommendation],
      };
    case ADD_RECENT:
      let recent = [action.item, ...state.recent];

      if (state.recent.length > 10) {
        recent.pop();
      }

      return {
        ...state,
        recent: recent,
      };
    default:
      return state;
  }
};
