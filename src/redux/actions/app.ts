import { AllActions } from "redux/types/app";
import { Dispatch } from "redux";
import { AppState } from "redux/store/configureStore";
import { Song } from "types/Song";
import { NavigationTab } from "types/Navigation";
import { Playlist } from "types/Playlist";
import { ToastType } from "types/ToastType";
import { PopupMenuType } from "types/PopupMenuType";
import { OptionActionType } from "types/Option";
import { XY } from "types/XY";

export const actionChangeTab = (to: NavigationTab): AllActions => ({
  type: "CHANGE_TAB",
  to,
});
export const actionShowToast = (
  text: string,
  toastType: ToastType = ToastType.NORMAL
): AllActions => ({
  type: "SHOW_TOAST",
  text,
  toastType,
});
export const actionViewPlaylist = (playlistViewing: Playlist): AllActions => ({
  type: "VIEW_PLAYLIST",
  playlistViewing,
});
export const actionSetPopupMenu = (
  menuState: PopupMenuType,
  songAdding?: Song
): AllActions => ({
  type: "SET_POPUP_MENU",
  menuState,
  songAdding,
});
export const actionSetOverlay = (
  show: boolean,
  dismissAction?: () => any,
  transparent?: boolean
): AllActions => ({
  type: "SET_OVERLAY",
  show,
  dismissAction,
  transparent,
});
export const actionSetOption = (
  show: boolean,
  item?: any,
  optionList?: OptionActionType[],
  position?: XY
): AllActions => ({
  type: "SET_OPTION",
  show,
  item,
  optionList,
  position,
});

export const changeTab = (to: NavigationTab) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionChangeTab(to));
  };
};
export const showToast = (
  text: string,
  toastType: ToastType = ToastType.NORMAL
) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionShowToast(text, toastType));
  };
};
export const viewPlaylist = (playlistViewing: Playlist) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionViewPlaylist(playlistViewing));
  };
};
export const setPopupMenu = (menuState: PopupMenuType, songAdding?: Song) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionSetPopupMenu(menuState, songAdding));
  };
};
export const setOverlay = (
  show: boolean,
  dismissAction?: () => any,
  transparent?: boolean
) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionSetOverlay(show, dismissAction, transparent));
  };
};
export const setOption = (
  show: boolean,
  item?: any,
  optionList?: OptionActionType[],
  position?: XY
) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionSetOption(show, item, optionList, position));
  };
};
