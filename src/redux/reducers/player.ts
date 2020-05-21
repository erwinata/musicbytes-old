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
import { seekTo } from "redux/actions/player";
import { Playlist } from "types/Playlist";
import { settings } from "cluster";

export interface PlayerState {
  showPlayer: boolean;
  playState: PlayState;
  playlist?: {
    index: number;
    data: Playlist;
  };
  songs?: {
    list: Song[];
    playing: Song;
  };
  setting: {
    shuffle: boolean;
    repeat: Repeat;
  };
  time: {
    current: number;
    total: number;
    seeking: boolean;
  };
}
const samplePlaylist: Song[] = [
  //   {
  //     index: 0,
  //     playOrder: 0,
  //     id: "BWf-eARnf6U",
  //     title: "Michael Jackson - Heal The World (Official Video)",
  //     channel: "michaeljacksonVEVO",
  //     thumbnails: {
  //       default: "https://i.ytimg.com/vi/BWf-eARnf6U/default.jpg",
  //       medium: "https://i.ytimg.com/vi/BWf-eARnf6U/mqdefault.jpg",
  //       high: "https://i.ytimg.com/vi/BWf-eARnf6U/hqdefault.jpg",
  //     },
  //     duration: 383,
  //   },
  //   {
  //     index: 1,
  //     playOrder: 1,
  //     id: "h_D3VFfhvs4",
  //     title: "Michael Jackson - Smooth Criminal (Official Video)",
  //     channel: "michaeljacksonVEVO",
  //     thumbnails: {
  //       default: "https://i.ytimg.com/vi/h_D3VFfhvs4/default.jpg",
  //       medium: "https://i.ytimg.com/vi/h_D3VFfhvs4/mqdefault.jpg",
  //       high: "https://i.ytimg.com/vi/h_D3VFfhvs4/hqdefault.jpg",
  //     },
  //     duration: 566,
  //   },
  //   {
  //     index: 2,
  //     playOrder: 2,
  //     id: "pAyKJAtDNCw",
  //     title: "Michael Jackson - You Are Not Alone (Official Video)",
  //     channel: "michaeljacksonVEVO",
  //     thumbnails: {
  //       default: "https://i.ytimg.com/vi/pAyKJAtDNCw/default.jpg",
  //       medium: "https://i.ytimg.com/vi/pAyKJAtDNCw/mqdefault.jpg",
  //       high: "https://i.ytimg.com/vi/pAyKJAtDNCw/hqdefault.jpg",
  //     },
  //     duration: 336,
  //   },
  //   {
  //     index: 3,
  //     playOrder: 3,
  //     id: "F2AitTPI5U0",
  //     title:
  //       "Michael Jackson - Black Or White (Official Video - Shortened Version)",
  //     channel: "michaeljacksonVEVO",
  //     thumbnails: {
  //       default: "https://i.ytimg.com/vi/F2AitTPI5U0/default.jpg",
  //       medium: "https://i.ytimg.com/vi/F2AitTPI5U0/mqdefault.jpg",
  //       high: "https://i.ytimg.com/vi/F2AitTPI5U0/hqdefault.jpg",
  //     },
  //     duration: 383,
  //   },
  {
    index: 0,
    playOrder: -1,
    id: "je9okpHFZp0",
    title: "HIVI! - Bumi dan Bulan (Official Music Video)",
    channel: "HIVI!",
    thumbnails: {
      default: "https://i.ytimg.com/vi/je9okpHFZp0/default.jpg",
      medium: "https://i.ytimg.com/vi/je9okpHFZp0/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/je9okpHFZp0/hqdefault.jpg",
    },
    duration: 0,
  },
  {
    index: 1,
    playOrder: -1,
    id: "kX1O93X77d4",
    title: "HIVI! - Siapkah Kau 'Tuk Jatuh Cinta Lagi (Official Lyric Video)",
    channel: "HIVI!",
    thumbnails: {
      default: "https://i.ytimg.com/vi/kX1O93X77d4/default.jpg",
      medium: "https://i.ytimg.com/vi/kX1O93X77d4/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/kX1O93X77d4/hqdefault.jpg",
    },
    duration: 0,
  },
  {
    index: 2,
    playOrder: -1,
    id: "tUJAxxm1y1I",
    title: "HIVI! - Remaja (Official Lyric Video)",
    channel: "HIVI!",
    thumbnails: {
      default: "https://i.ytimg.com/vi/tUJAxxm1y1I/default.jpg",
      medium: "https://i.ytimg.com/vi/tUJAxxm1y1I/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/tUJAxxm1y1I/hqdefault.jpg",
    },
    duration: 0,
  },
];
const sampleSongPlaying: Song = {
  index: 0,
  playOrder: -1,
  id: "tUJAxxm1y1I",
  title: "HIVI! - Remaja (Official Lyric Video)",
  channel: "HIVI!",
  thumbnails: {
    default: "https://i.ytimg.com/vi/tUJAxxm1y1I/default.jpg",
    medium: "https://i.ytimg.com/vi/tUJAxxm1y1I/mqdefault.jpg",
    high: "https://i.ytimg.com/vi/tUJAxxm1y1I/hqdefault.jpg",
  },
  duration: 0,
};

const playerReducerDefaultState: PlayerState = {
  showPlayer: false,
  playState: PlayState.ENDED,
  // showPlayer: true,
  playlist: undefined,
  songs: { list: samplePlaylist, playing: sampleSongPlaying },
  setting: {
    shuffle: false,
    repeat: Repeat.NO_REPEAT,
  },
  time: {
    current: 0,
    total: 180,
    seeking: false,
  },
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
      let songs = state.songs!.list;
      if (action.resetPlaylist) {
        action.song.playOrder = 0;
        songs = [action.song];
      }
      return {
        ...state,
        songs: { ...state.songs, list: songs, playing: action.song },
        time: {
          ...state.time,
          current: 0,
          total: action.song.duration,
        },
      };
    case "PLAY_PLAYLIST":
      var resetPlaying = true;

      var songExistInPlaylist = findIndex(
        action.playlist.data.songs,
        (item) => item.id == state.songs!.playing.id
      );

      if (songExistInPlaylist > -1) {
        resetPlaying = false;
      }

      return {
        ...state,
        playlist: action.playlist,
        songs: {
          playing: resetPlaying
            ? action.playlist.data.songs[0]
            : state.songs!.playing,
          list: action.playlist.data.songs,
        },
        time: {
          ...state.time,
          current: resetPlaying ? 0 : state.time.current,
          total: resetPlaying ? 0 : state.time.total,
        },
      };
    case "CLEAR_PLAYLIST":
      return {
        ...state,
        songs: undefined,
        playlist: undefined,
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

    case "AUTO_NEXT_SONG":
      var index = -1;
      var seeking = false;
      switch (state.setting.repeat) {
        case Repeat.NO_REPEAT:
          index =
            findIndex(
              state.songs!.list,
              (song) => song.id == state.songs!.playing!.id
            ) + 1;
          break;
        case Repeat.REPEAT_ALL:
          index =
            findIndex(
              state.songs!.list,
              (song) => song.id == state.songs!.playing!.id
            ) + 1;
          break;
        case Repeat.REPEAT_ONE:
          index = findIndex(
            state.songs!.list,
            (el) => el.id == state.songs!.playing!.id
          );
          seeking = true;
          break;
      }

      return {
        ...state,
        songs: { ...state.songs!, playing: state.songs!.list[index] },
        time: {
          current: 0,
          total: state.songs!.list[index].duration,
          seeking: seeking,
        },
      };

    case "NEXT_SONG":
      var index =
        findIndex(
          state.songs!.list,
          (el) => el.id == state.songs!.playing!.id
        ) + 1;

      return {
        ...state,
        songs: { ...state.songs!, playing: state.songs!.list[index] },
        time: {
          ...state.time,
          current: 0,
          total: state.songs!.list[index].duration,
        },
      };

    case "PREV_SONG":
      var index =
        findIndex(
          state.songs!.list,
          (el) => el.id == state.songs!.playing!.id
        ) - 1;

      return {
        ...state,
        songs: { ...state.songs!, playing: state.songs!.list[index] },
        time: {
          ...state.time,
          current: 0,
          total: state.songs!.list[index].duration,
        },
      };

    case "REMOVE_SONG":
      var playOrder = action.song.playOrder;

      var updatedSongs = state.songs!.list.filter(
        (song) => song.playOrder !== action.song.playOrder
      );

      updatedSongs.forEach((song) => {
        if (song.playOrder > playOrder) {
          song.playOrder -= 1;
        }
      });

      return {
        ...state,
        songs: { ...state.songs!, list: updatedSongs },
      };

    case "TOGGLE_SHUFFLE":
      var shuffledSongs;
      shuffledSongs = state.setting.shuffle
        ? orderBy(state.songs!.list, ["index"], ["asc"])
        : shuffle(state.songs!.list);

      return {
        ...state,
        setting: {
          ...state.setting,
          shuffle: !state.setting.shuffle,
        },
        songs: { ...state.songs!, list: shuffledSongs },
      };

    case "TOGGLE_REPEAT":
      return {
        ...state,
        setting: {
          ...state.setting,
          repeat:
            state.setting.repeat + 1 > 2
              ? Repeat.NO_REPEAT
              : state.setting.repeat + 1,
        },
      };

    case "ADD_TO_NOW_PLAYING":
      // action.song.playOrder = state.songs.length;

      return {
        ...state,
        songs: { ...state.songs!, list: [...state.songs!.list, action.song] },
      };
    case "DURATION_INCREMENT":
      return {
        ...state,
        time: { ...state.time, current: state.time.current + 1 },
      };
    case "SEEK_TO":
      return {
        ...state,
        time: { ...state.time, seeking: true, current: action.to },
      };
    case "SEEK_DONE":
      return {
        ...state,
        time: { ...state.time, seeking: false },
      };
    default:
      return state;
  }
};
