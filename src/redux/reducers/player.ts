import { Song } from "types/Song";
import { Repeat } from "types/Repeat";
import { PlayState } from "types/PlayState";
import { PlayerActionTypes } from "redux/types/player";
import {
  arrayGetIndexByAttr,
  arrayGetObjectByAttr,
  arrayRemoveObjectAtIndex,
} from "helpers/array";
import { shuffle, orderBy, remove, findIndex } from "lodash";
import { seekTo } from "redux/actions/player";
import { Playlist } from "types/Playlist";

export interface PlayerState {
  showPlayer: boolean;
  playerState: {
    playState: PlayState;
    videoIsRunning: boolean;
  };
  playlist?: Playlist;
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
    id: "je9okpHFZp0",
    title: "HIVI! - Bumi dan Bulan (Official Music Video)",
    channel: "HIVI!",
    thumbnails: {
      default: "https://i.ytimg.com/vi/je9okpHFZp0/default.jpg",
      medium: "https://i.ytimg.com/vi/je9okpHFZp0/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/je9okpHFZp0/hqdefault.jpg",
    },
    duration: 268,
  },
  {
    id: "kX1O93X77d4",
    title: "HIVI! - Siapkah Kau 'Tuk Jatuh Cinta Lagi (Official Lyric Video)",
    channel: "HIVI!",
    thumbnails: {
      default: "https://i.ytimg.com/vi/kX1O93X77d4/default.jpg",
      medium: "https://i.ytimg.com/vi/kX1O93X77d4/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/kX1O93X77d4/hqdefault.jpg",
    },
    duration: 280,
  },
  {
    id: "tUJAxxm1y1I",
    title: "HIVI! - Remaja (Official Lyric Video)",
    channel: "HIVI!",
    thumbnails: {
      default: "https://i.ytimg.com/vi/tUJAxxm1y1I/default.jpg",
      medium: "https://i.ytimg.com/vi/tUJAxxm1y1I/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/tUJAxxm1y1I/hqdefault.jpg",
    },
    duration: 216,
  },
];
const sampleSongPlaying: Song = {
  id: "tUJAxxm1y1I",
  title: "HIVI! - Remaja (Official Lyric Video)",
  channel: "HIVI!",
  thumbnails: {
    default: "https://i.ytimg.com/vi/tUJAxxm1y1I/default.jpg",
    medium: "https://i.ytimg.com/vi/tUJAxxm1y1I/mqdefault.jpg",
    high: "https://i.ytimg.com/vi/tUJAxxm1y1I/hqdefault.jpg",
  },
  duration: 216,
};

const playerReducerDefaultState: PlayerState = {
  showPlayer: false,
  playerState: {
    playState: PlayState.ENDED,
    videoIsRunning: false,
  },
  // showPlayer: true,
  playlist: undefined,
  songs: undefined,
  // songs: { list: samplePlaylist, playing: sampleSongPlaying },
  setting: {
    shuffle: false,
    repeat: Repeat.NO_REPEAT,
  },
  time: {
    current: 0,
    total: 0,
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
      let playSongs: Song[] = [];
      if (state.songs) {
        playSongs = [...state.songs!.list];
      }

      if (action.resetPlaylist) {
        playSongs = [action.song];
      }
      return {
        ...state,
        songs: { ...state.songs, list: playSongs, playing: action.song },
        time: {
          ...state.time,
          current: 0,
          total: action.song.duration,
        },
      };
    case "PLAY_PLAYLIST":
      let resetPlaying = true;

      let songExistInPlaylist = findIndex(
        action.playlist.songs,
        (item) => item.id == state.songs?.playing.id
      );

      if (songExistInPlaylist > -1) {
        resetPlaying = false;
      }

      return {
        ...state,
        playlist: action.playlist,
        songs: {
          playing: resetPlaying
            ? action.playlist.songs[0]
            : state.songs!.playing,
          list: action.playlist.songs,
        },
        time: {
          ...state.time,
          current: resetPlaying ? 0 : state.time.current,
          total: resetPlaying ? 0 : state.time.total,
          // seeking: true,
        },
      };
    case "CLEAR_PLAYLIST":
      return {
        ...state,
        songs: undefined,
        playlist: undefined,
      };

    case "TOGGLE_PLAYING":
      let newPlayState = state.playerState.playState;
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
        playerState: {
          ...state.playerState,
          playState: newPlayState,
        },
      };

    case "SET_VIDEO_IS_RUNNING":
      let newVideoIsRunning: boolean;
      if (action.videoIsRunning !== undefined) {
        newVideoIsRunning = action.videoIsRunning!;
      } else {
        newVideoIsRunning = !state.playerState.videoIsRunning;
      }
      return {
        ...state,
        playerState: {
          ...state.playerState,
          videoIsRunning: newVideoIsRunning,
        },
      };

    case "AUTO_NEXT_SONG":
      let autoNextIndex = -1;
      let seeking = false;
      switch (state.setting.repeat) {
        case Repeat.NO_REPEAT:
          autoNextIndex =
            findIndex(
              state.songs!.list,
              (song) => song.id == state.songs!.playing!.id
            ) + 1;
          if (autoNextIndex >= state.songs!.list.length) {
            autoNextIndex = -1;
          }
          break;
        case Repeat.REPEAT_ALL:
          autoNextIndex =
            findIndex(
              state.songs!.list,
              (song) => song.id == state.songs!.playing!.id
            ) + 1;
          if (autoNextIndex >= state.songs!.list.length) {
            autoNextIndex = 0;
          }
          break;
        case Repeat.REPEAT_ONE:
          autoNextIndex = findIndex(
            state.songs!.list,
            (el) => el.id == state.songs!.playing!.id
          );
          seeking = true;
          break;
      }

      if (autoNextIndex !== -1) {
        return {
          ...state,
          songs: { ...state.songs!, playing: state.songs!.list[autoNextIndex] },
          time: {
            current: 0,
            total: state.songs!.list[autoNextIndex].duration,
            seeking: seeking,
          },
        };
      }
      return {
        ...state,
        playerState: {
          ...state.playerState,
          playState: PlayState.PAUSED,
        },
        time: {
          ...state.time,
          current: 0,
          seeking: true,
        },
      };

    case "NEXT_SONG":
      let nextIndex =
        findIndex(
          state.songs!.list,
          (el) => el.id == state.songs!.playing!.id
        ) + 1;
      if (nextIndex >= state.songs!.list.length) {
        nextIndex = 0;
      }

      return {
        ...state,
        songs: { ...state.songs!, playing: state.songs!.list[nextIndex] },
        time: {
          ...state.time,
          current: 0,
          total: state.songs!.list[nextIndex].duration,
        },
      };

    case "PREV_SONG":
      let prevIndex =
        findIndex(
          state.songs!.list,
          (el) => el.id == state.songs!.playing!.id
        ) - 1;
      if (prevIndex <= state.songs!.list.length) {
        nextIndex = state.songs!.list.length - 1;
      }

      return {
        ...state,
        songs: { ...state.songs!, playing: state.songs!.list[prevIndex] },
        time: {
          ...state.time,
          current: 0,
          total: state.songs!.list[prevIndex].duration,
        },
      };

    case "REMOVE_SONG":
    // let playOrder = action.song.playOrder;

    // let updatedSongs = state.songs!.list.filter(
    //   (song) => song.playOrder !== action.song.playOrder
    // );

    // updatedSongs.forEach((song) => {
    //   if (song.playOrder > playOrder) {
    //     song.playOrder -= 1;
    //   }
    // });

    // return {
    //   ...state,
    //   songs: { ...state.songs!, list: updatedSongs },
    // };

    case "TOGGLE_SHUFFLE":
      let shuffledSongs;
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
      let addedSongs;
      if (state.songs) {
        addedSongs = {
          ...state.songs!,
          list: [...state.songs.list, action.song],
        };
      } else {
        addedSongs = {
          list: [action.song],
          playing: action.song,
        };
      }

      return {
        ...state,
        songs: addedSongs,
      };

    case "REMOVE_FROM_NOW_PLAYING":
      // action.song.playOrder = state.songs.length;
      let removedSongs;

      if (state.songs!.list.length === 1) {
        removedSongs = undefined!;
      } else {
        let removedSongsList = state.songs!.list;
        remove(removedSongsList, { id: action.song.id });
        removedSongs = {
          ...state.songs!,
          list: removedSongsList,
        };
      }

      return {
        ...state,
        songs: removedSongs,
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
