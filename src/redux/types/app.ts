import { NavigationTab } from "types/Navigation";
import { OptionActionType } from "types/Option";
import { Playlist } from "types/Playlist";
import { PopupMenuType } from "types/PopupMenuType";
import { Song } from "types/Song";
import { ToastType } from "types/ToastType";
import { UserData } from "types/UserData";
import { XY } from "types/XY";
import { DiscoverActionTypes } from "./discover";
import { LibraryActionTypes } from "./library";
import { ListenActionTypes } from "./listen";
import { PlayerActionTypes } from "./player";

export const LOGIN_USER = "LOGIN_USER";
export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_API_BASE_URL = "SET_API_BASE_URL";
export const SET_API_KEY = "SET_API_KEY";

export const CHANGE_TAB = "CHANGE_TAB";
export const SHOW_TOAST = "SHOW_TOAST";

export const VIEW_PLAYLIST = "VIEW_PLAYLIST";
export const ADDING_TO_PLAYLIST = "ADDING_TO_PLAYLIST";
export const SAVING_PLAYLIST = "SAVING_PLAYLIST";

export const SET_POPUP_MENU = "SET_POPUP_MENU";
export const SET_OVERLAY = "SET_OVERLAY";
export const SET_CLICK_OVERLAY = "SET_CLICK_OVERLAY";
export const SET_OPTION = "SET_OPTION";

export const SET_DEVICE = "SET_DEVICE";

export interface SetAPIKeyAction {
  type: typeof SET_API_KEY;
  index: number;
}

export interface SetAPIBaseURLAction {
  type: typeof SET_API_BASE_URL;
  url: string;
}

export interface LoginUserAction {
  type: typeof LOGIN_USER;
  userData: UserData;
}
export interface UpdateTokenAction {
  type: typeof UPDATE_TOKEN;
  token: {
    google?: string;
    musicbytes?: string;
  };
}
export interface LogoutUserAction {
  type: typeof LOGOUT_USER;
}

export interface ChangeTabAction {
  type: typeof CHANGE_TAB;
  to: NavigationTab;
}
export interface ShowToastAction {
  type: typeof SHOW_TOAST;
  text: string;
  toastType?: ToastType;
}
export interface ViewPlaylistAction {
  type: typeof VIEW_PLAYLIST;
  playlist: Playlist;
}

export interface SetPopupMenuAction {
  type: typeof SET_POPUP_MENU;
  menuState: PopupMenuType;
  songAdding?: Song;
}

export interface SetOverlayAction {
  type: typeof SET_OVERLAY;
  show: boolean;
  dismissAction?: () => any;
  transparent?: boolean;
}

export interface SetClickOverlayAction {
  type: typeof SET_CLICK_OVERLAY;
  show: boolean;
}

export interface SetOptionAction {
  type: typeof SET_OPTION;
  show: boolean;
  item?: any;
  optionList?: OptionActionType[];
  position?: XY;
}

export interface SetDeviceAction {
  type: typeof SET_DEVICE;
  isDesktop: boolean;
}

export type AppActionTypes =
  | LoginUserAction
  | UpdateTokenAction
  | LogoutUserAction
  | SetAPIKeyAction
  | SetAPIBaseURLAction
  | ChangeTabAction
  | ShowToastAction
  | ViewPlaylistAction
  | SetPopupMenuAction
  | SetOverlayAction
  | SetClickOverlayAction
  | SetOptionAction
  | SetDeviceAction;

export type AllActions =
  | AppActionTypes
  | DiscoverActionTypes
  | ListenActionTypes
  | PlayerActionTypes
  | LibraryActionTypes;
