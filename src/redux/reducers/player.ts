import { Song } from "types/Song";
import { Repeat } from "types/Repeat";
import { PlayState } from "types/PlayState";
import { PlayerActionTypes } from "redux/types/player";

export interface PlayerState {
  showPlayer: boolean;
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
  showPlayer: false,
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
  seeking: false,
};

export const playerReducer = (
  state = playerReducerDefaultState,
  action: PlayerActionTypes
): PlayerState => {
  switch (action.type) {
    case "SHOW_PLAYER":
      return {
        ...state,
        showPlayer: action.show,
      };
    case "PLAY_SONG":
      return {
        ...state,
        songs: [action.song],
        songPlaying: action.song,
        timeCurrent: 0,
        timeTotal: action.song.duration,
      };
    case "ADD_TO_NOW_PLAYING":
      return {
        ...state,
        songs: [...state.songs, action.song],
      };
    case "DURATION_INCREMENT":
      return {
        ...state,
        timeCurrent: state.timeCurrent + 1,
      };
    case "SEEK_TO":
      return {
        ...state,
        seeking: true,
        timeCurrent: action.to,
      };
    case "SEEK_DONE":
      return {
        ...state,
        seeking: false,
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
        playState: newPlayState,
      };
    default:
      return state;
  }
};
