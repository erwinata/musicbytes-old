import {
  AppActionTypes,
  CHANGE_TAB,
  VIEW_PLAYLIST,
  ADDING_TO_PLAYLIST,
} from "redux/types/app";
import { Song } from "types/Song";
import { NavigationTab } from "types/Navigation";
import { Playlist } from "types/Playlist";
import { ToastType } from "types/ToastType";

export interface IAppState {
  currentTab: NavigationTab;
  transitionDirection: number;
  playlistViewing?: Playlist;
  songAdding?: Song;
  toastState: {
    text: string;
    toastType: ToastType;
  };
}

const samplePlaylist = [
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
  // {
  //   index: 3,
  //   playOrder: 3,
  //   id: "F2AitTPI5U0",
  //   title:
  //     "Michael Jackson - Black Or White (Official Video - Shortened Version)",
  //   channel: "michaeljacksonVEVO",
  //   thumbnails: {
  //     default: "https://i.ytimg.com/vi/F2AitTPI5U0/default.jpg",
  //     medium: "https://i.ytimg.com/vi/F2AitTPI5U0/mqdefault.jpg",
  //     high: "https://i.ytimg.com/vi/F2AitTPI5U0/hqdefault.jpg",
  //   },
  //   duration: 383,
  // },
  // {
  //   index: 4,
  //   playOrder: -1,
  //   id: "je9okpHFZp0",
  //   title: "HIVI! - Bumi dan Bulan (Official Music Video)",
  //   channel: "HIVI!",
  //   thumbnails: {
  //     default: "https://i.ytimg.com/vi/je9okpHFZp0/default.jpg",
  //     medium: "https://i.ytimg.com/vi/je9okpHFZp0/mqdefault.jpg",
  //     high: "https://i.ytimg.com/vi/je9okpHFZp0/hqdefault.jpg",
  //   },
  //   duration: 0,
  // },
  // {
  //   index: 5,
  //   playOrder: -1,
  //   id: "kX1O93X77d4",
  //   title: "HIVI! - Siapkah Kau 'Tuk Jatuh Cinta Lagi (Official Lyric Video)",
  //   channel: "HIVI!",
  //   thumbnails: {
  //     default: "https://i.ytimg.com/vi/kX1O93X77d4/default.jpg",
  //     medium: "https://i.ytimg.com/vi/kX1O93X77d4/mqdefault.jpg",
  //     high: "https://i.ytimg.com/vi/kX1O93X77d4/hqdefault.jpg",
  //   },
  //   duration: 0,
  // },
  // {
  //   index: 6,
  //   playOrder: -1,
  //   id: "tUJAxxm1y1I",
  //   title: "HIVI! - Remaja (Official Lyric Video)",
  //   channel: "HIVI!",
  //   thumbnails: {
  //     default: "https://i.ytimg.com/vi/tUJAxxm1y1I/default.jpg",
  //     medium: "https://i.ytimg.com/vi/tUJAxxm1y1I/mqdefault.jpg",
  //     high: "https://i.ytimg.com/vi/tUJAxxm1y1I/hqdefault.jpg",
  //   },
  //   duration: 0,
  // },
];

const appReducerDefaultState: IAppState = {
  currentTab: NavigationTab.LISTEN,
  transitionDirection: 1,
  // playlistViewing: {
  //   title: "Lagu saya",
  //   songs: samplePlaylist,
  //   createdAt: 1589043600000,
  //   updatedAt: 1589205857159,
  // },
  playlistViewing: undefined,
  songAdding: undefined,
  toastState: {
    text: "Song added to playlist",
    toastType: ToastType.NORMAL,
  },
};

export const appReducer = (
  state = appReducerDefaultState,
  action: AppActionTypes
): IAppState => {
  switch (action.type) {
    case "CHANGE_TAB":
      // console.log("REDUCER" + action.query);
      let transitionDirection = 1;
      if (action.to == NavigationTab.LIBRARY) {
        transitionDirection = -1;
      } else if (action.to == NavigationTab.DISCOVER) {
        transitionDirection = 1;
      } else {
        transitionDirection =
          state.currentTab == NavigationTab.DISCOVER ? -1 : 1;
      }

      return {
        ...state,
        currentTab: action.to,
        transitionDirection: transitionDirection,
      };
    case "SHOW_TOAST":
      const toastType = action.toastType ? action.toastType : ToastType.NORMAL;
      return {
        ...state,
        toastState: {
          text: action.text,
          toastType: toastType,
        },
      };
    case "VIEW_PLAYLIST":
      return {
        ...state,
        playlistViewing:
          action.playlistViewing !== null ? action.playlistViewing : undefined,
      };
    case "ADDING_TO_PLAYLIST":
      return {
        ...state,
        songAdding: action.songAdding !== null ? action.songAdding : undefined,
      };
    default:
      return state;
  }
};
