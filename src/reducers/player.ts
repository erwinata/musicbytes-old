import { DiscoverActionTypes, PlayerActionTypes } from "types/actions";
import { Song } from "types/Song";
import { Repeat } from "types/Repeat";

export interface PlayerState {
  songs: Song[];
  songPlaying: Song | null;
  playing: boolean;
  shuffle: boolean;
  repeat: Repeat;
  timeCurrent: number;
  timeTotal: number;
}
const playerReducerDefaultState: PlayerState = {
  songs: [],
  // songPlaying: null,
  songPlaying: {
    id: "fLexgOxsZu0",
    title: "Bruno Mars - The Lazy Song (Official Video)",
    channel: "Bruno Mars",
    thumbnails: {
      default: "https://i.ytimg.com/vi/fLexgOxsZu0/default.jpg",
      medium: "https://i.ytimg.com/vi/fLexgOxsZu0/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/fLexgOxsZu0/hqdefault.jpg"
    }
  },
  playing: false,
  shuffle: false,
  repeat: Repeat.NO_REPEAT,
  timeCurrent: 43,
  timeTotal: 183
};

export const playerReducer = (
  state = playerReducerDefaultState,
  action: PlayerActionTypes
): PlayerState => {
  switch (action.type) {
    case "PLAY_SONG":
      // console.log("REDUCER" + action.query);
      return {
        ...state,
        songPlaying: action.song
      };
    default:
      return state;
  }
};
