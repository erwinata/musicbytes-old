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
import { PopupMenuType } from "types/PopupMenuType";
import { OptionActionType } from "types/Option";
import { XY } from "types/XY";

export interface IAppState {
  user?: {
    name: string;
    email: string;
    token: {
      google: string;
      musicbytes: string;
    };
  };
  defaultKey: string;
  apiBaseURL: string;
  tabState: {
    currentTab: NavigationTab;
    transitionDirection: number;
  };
  playlistViewing?: {
    playlist: Playlist;
    playlistIndex?: number;
  };
  popupState: {
    menuState: PopupMenuType;
    songAdding?: Song;
  };
  overlayState: {
    show: boolean;
    dismissAction?: () => any;
    transparent?: boolean;
  };
  clickOverlayState: {
    show: boolean;
  };
  toastState: {
    text: string;
    toastType: ToastType;
  };
  optionState: {
    show: boolean;
    item?: any;
    optionList?: OptionActionType[];
    position?: XY;
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
  user: undefined,
  defaultKey: "AIzaSyBQ5KGEWWK9-A0O87RLepRrmX3yz7kU4iA",
  apiBaseURL: "",
  tabState: {
    currentTab: NavigationTab.LISTEN,
    transitionDirection: 1,
  },
  // playlistViewing: {
  //   title: "Lagu saya",
  //   songs: samplePlaylist,
  //   createdAt: 1589043600000,
  //   updatedAt: 1589205857159,
  // },
  popupState: {
    menuState: PopupMenuType.NONE,
  },
  overlayState: {
    show: false,
  },
  clickOverlayState: {
    show: true,
  },
  toastState: {
    text: "",
    toastType: ToastType.NORMAL,
  },
  optionState: {
    show: false,
  },
};

export const appReducer = (
  state = appReducerDefaultState,
  action: AppActionTypes
): IAppState => {
  switch (action.type) {
    case "SET_API_BASE_URL":
      return {
        ...state,
        apiBaseURL: action.url,
      };
    case "LOGIN_USER":
      return {
        ...state,
        user: {
          name: action.name,
          email: action.email,
          token: action.token,
        },
      };
    case "CHANGE_TAB":
      // console.log("REDUCER" + action.query);
      let transitionDirection = 1;
      if (action.to == NavigationTab.LIBRARY) {
        transitionDirection = -1;
      } else if (action.to == NavigationTab.DISCOVER) {
        transitionDirection = 1;
      } else {
        transitionDirection =
          state.tabState.currentTab == NavigationTab.DISCOVER ? -1 : 1;
      }

      return {
        ...state,
        tabState: {
          ...state.tabState,
          currentTab: action.to,
          transitionDirection: transitionDirection,
        },
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
          action.playlist === undefined
            ? undefined
            : {
                playlist: action.playlist,
                playlistIndex: action.playlistIndex,
              },
      };
    case "SET_POPUP_MENU":
      var songAdding = state.popupState.songAdding;
      if (action.menuState === PopupMenuType.NONE) {
        songAdding = undefined;
      } else if (action.songAdding !== undefined) {
        songAdding = action.songAdding;
      }
      return {
        ...state,
        popupState: {
          menuState: action.menuState,
          songAdding: songAdding,
        },
      };
    case "SET_OVERLAY":
      return {
        ...state,
        overlayState: {
          show: action.show,
          dismissAction: action.dismissAction,
          transparent: action.transparent,
        },
      };
    case "SET_CLICK_OVERLAY":
      return {
        ...state,
        clickOverlayState: {
          show: action.show,
        },
      };
    case "SET_OPTION":
      return {
        ...state,
        optionState: {
          show: action.show,
          item: action.item,
          optionList: action.optionList,
          position: action.position,
        },
      };
    default:
      return state;
  }
};
