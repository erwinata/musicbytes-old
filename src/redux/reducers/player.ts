import { Song } from "types/Song";
import { Repeat } from "types/Repeat";
import { PlayState } from "types/PlayState";
import { PlayerActionTypes } from "redux/types/player";
import {
  arrayGetIndexByAttr,
  arrayGetObjectByAttr,
  arrayRemoveObjectAtIndex,
} from "helpers/array";
import { shuffle, orderBy, indexOf, findIndex } from "lodash";

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
const samplePlaylist: Song[] = [
  {
    index: 0,
    playOrder: 0,
    id: "BWf-eARnf6U",
    title: "Michael Jackson - Heal The World (Official Video)",
    channel: "michaeljacksonVEVO",
    thumbnails: {
      default: "https://i.ytimg.com/vi/BWf-eARnf6U/default.jpg",
      medium: "https://i.ytimg.com/vi/BWf-eARnf6U/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/BWf-eARnf6U/hqdefault.jpg",
    },
    duration: 383,
  },
  {
    index: 1,
    playOrder: 1,
    id: "h_D3VFfhvs4",
    title: "Michael Jackson - Smooth Criminal (Official Video)",
    channel: "michaeljacksonVEVO",
    thumbnails: {
      default: "https://i.ytimg.com/vi/h_D3VFfhvs4/default.jpg",
      medium: "https://i.ytimg.com/vi/h_D3VFfhvs4/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/h_D3VFfhvs4/hqdefault.jpg",
    },
    duration: 566,
  },
  {
    index: 2,
    playOrder: 2,
    id: "pAyKJAtDNCw",
    title: "Michael Jackson - You Are Not Alone (Official Video)",
    channel: "michaeljacksonVEVO",
    thumbnails: {
      default: "https://i.ytimg.com/vi/pAyKJAtDNCw/default.jpg",
      medium: "https://i.ytimg.com/vi/pAyKJAtDNCw/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/pAyKJAtDNCw/hqdefault.jpg",
    },
    duration: 336,
  },
  {
    index: 3,
    playOrder: 3,
    id: "F2AitTPI5U0",
    title:
      "Michael Jackson - Black Or White (Official Video - Shortened Version)",
    channel: "michaeljacksonVEVO",
    thumbnails: {
      default: "https://i.ytimg.com/vi/F2AitTPI5U0/default.jpg",
      medium: "https://i.ytimg.com/vi/F2AitTPI5U0/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/F2AitTPI5U0/hqdefault.jpg",
    },
    duration: 383,
  },
];
const sampleSongPlaying: Song = {
  index: 0,
  playOrder: 0,
  id: "BWf-eARnf6U",
  title: "Michael Jackson - Heal The World (Official Video)",
  channel: "michaeljacksonVEVO",
  thumbnails: {
    default: "https://i.ytimg.com/vi/BWf-eARnf6U/default.jpg",
    medium: "https://i.ytimg.com/vi/BWf-eARnf6U/mqdefault.jpg",
    high: "https://i.ytimg.com/vi/BWf-eARnf6U/hqdefault.jpg",
  },
  duration: 383,
};

const playerReducerDefaultState: PlayerState = {
  // showPlayer: false,
  showPlayer: true,
  songs: samplePlaylist,
  songPlaying: sampleSongPlaying,
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
      let songs = state.songs;
      if (action.resetPlaylist) {
        action.song.playOrder = 0;
        songs = [action.song];
      }
      return {
        ...state,
        songs: songs,
        songPlaying: action.song,
        timeCurrent: 0,
        timeTotal: action.song.duration,
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

    case "NEXT_SONG":
      var index =
        findIndex(state.songs, (el) => el.id == state.songPlaying!.id) + 1;

      return {
        ...state,
        songPlaying: state.songs[index],
        timeCurrent: 0,
        timeTotal: state.songs[index].duration,
      };

    case "PREV_SONG":
      var index =
        findIndex(state.songs, (el) => el.id == state.songPlaying!.id) - 1;

      return {
        ...state,
        songPlaying: state.songs[index],
        timeCurrent: 0,
        timeTotal: state.songs[index].duration,
      };

    case "REMOVE_SONG":
      var playOrder = action.song.playOrder;

      var updatedSongs = state.songs.filter(
        (song) => song.playOrder !== action.song.playOrder
      );

      updatedSongs.forEach((song) => {
        if (song.playOrder > playOrder) {
          song.playOrder -= 1;
        }
      });

      return {
        ...state,
        songs: updatedSongs,
      };

    case "TOGGLE_SHUFFLE":
      var shuffledSongs;
      shuffledSongs = state.shuffle
        ? orderBy(state.songs, ["index"], ["asc"])
        : shuffle(state.songs);

      return {
        ...state,
        shuffle: !state.shuffle,
        songs: shuffledSongs,
      };

    case "TOGGLE_REPEAT":
      return {
        ...state,
        repeat: state.repeat + 1 > 2 ? Repeat.NO_REPEAT : state.repeat + 1,
      };

    case "ADD_TO_NOW_PLAYING":
      action.song.playOrder = state.songs.length;

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
    default:
      return state;
  }
};
