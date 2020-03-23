import { DiscoverActionTypes, PlayerActionTypes } from "types/actions";
import { Song } from "types/Song";
import { Repeat } from "types/Repeat";
import { PlayState } from "types/PlayState";

export interface PlayerState {
  songs: Song[];
  songPlaying: Song | null;
  playState: PlayState;
  shuffle: boolean;
  repeat: Repeat;
  timeCurrent: number;
  timeTotal: number;
  seeking: boolean;
}
const playerReducerDefaultState: PlayerState = {
  songs: [],
  songPlaying: null,
  // songPlaying: {
  //   id: "fLexgOxsZu0",
  //   title: "Bruno Mars - The Lazy Song (Official Video)",
  //   channel: "Bruno Mars",
  //   thumbnails: {
  //     default: "https://i.ytimg.com/vi/fLexgOxsZu0/default.jpg",
  //     medium: "https://i.ytimg.com/vi/fLexgOxsZu0/mqdefault.jpg",
  //     high: "https://i.ytimg.com/vi/fLexgOxsZu0/hqdefault.jpg"
  //   }
  // },
  playState: PlayState.ENDED,
  shuffle: false,
  repeat: Repeat.NO_REPEAT,
  timeCurrent: 0,
  timeTotal: 180,
  seeking: false
};

export const playerReducer = (
  state = playerReducerDefaultState,
  action: PlayerActionTypes
): PlayerState => {
  switch (action.type) {
    case "PLAY_SONG":
      return {
        ...state,
        songs: [action.song],
        songPlaying: action.song,
        timeCurrent: 0,
        timeTotal: action.song.duration
      };
    case "DURATION_INCREMENT":
      return {
        ...state,
        timeCurrent: state.timeCurrent + 1
      };
    case "SEEK_TO":
      return {
        ...state,
        seeking: true,
        timeCurrent: action.to
      };
    case "SEEK_DONE":
      return {
        ...state,
        seeking: false
      };
    case "TOGGLE_PLAYING":
      var newPlayState = state.playState;
      if (action.state !== undefined) {
        newPlayState = action.state!;
      } else {
        if (newPlayState == PlayState.PLAYING) {
          newPlayState = PlayState.PAUSED;
        } else if (newPlayState == PlayState.PAUSED) {
          newPlayState = PlayState.PLAYING;
        }
      }
      return {
        ...state,
        playState: newPlayState
      };
    default:
      return state;
  }
};
