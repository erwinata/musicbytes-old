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
import { UserData } from "types/UserData";

export const actionSetAPIBaseURL = (url: string): AllActions => ({
  type: "SET_API_BASE_URL",
  url,
});
export const actionLoginUser = (userData: UserData): AllActions => ({
  type: "LOGIN_USER",
  userData,
});
export const actionLogoutUser = (): AllActions => ({
  type: "LOGOUT_USER",
});
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
export const actionViewPlaylist = (playlist: Playlist): AllActions => ({
  type: "VIEW_PLAYLIST",
  playlist,
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
export const actionSetClickOverlay = (show: boolean): AllActions => ({
  type: "SET_CLICK_OVERLAY",
  show,
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

export const actionSetDevice = (isDesktop: boolean): AllActions => ({
  type: "SET_DEVICE",
  isDesktop,
});

export const setAPIBaseURL = (url: string) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionSetAPIBaseURL(url));
  };
};
export const loginUser = (userData: UserData) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionLoginUser(userData));
  };
};
export const logoutUser = () => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionLogoutUser());
  };
};
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
export const viewPlaylist = (playlist: Playlist) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionViewPlaylist(playlist));
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
export const setClickOverlay = (show: boolean) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionSetClickOverlay(show));
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
export const setDevice = (isDekstop: boolean) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionSetDevice(isDekstop));
  };
};
