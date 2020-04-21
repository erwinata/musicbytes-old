import { DiscoverActionTypes, SONG_SEARCH } from "redux/types/discover";
import { Song } from "types/Song";

export interface IDiscoverState {
  songs: Song[];
  loading: boolean;
  query: string;
}

const discoverReducerDefaultState: IDiscoverState = {
  songs: [],
  loading: true,
  query: "take on me aha",
};

export const discoverReducer = (
  state = discoverReducerDefaultState,
  action: DiscoverActionTypes
): IDiscoverState => {
  switch (action.type) {
    case SONG_SEARCH:
      // console.log("REDUCER" + action.query);
      return {
        ...state,
        query: action.query,
        songs: action.songs,
      };
    default:
      return state;
  }
};
