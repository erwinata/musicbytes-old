import { DiscoverActionTypes } from "./discover";
import { PlayerActionTypes } from "./player";
import { NavigationTab } from "types/Navigation";
import { LibraryActionTypes } from "./library";
import { Playlist } from "types/Playlist";
import { Song } from "types/Song";
import { ToastType } from "types/ToastType";
import { PopupMenuType } from "types/PopupMenuType";
import { OptionActionType } from "types/Option";
import { XY } from "types/XY";
import { UserData } from "types/UserData";

export const LOGIN_USER = "LOGIN_USER";
export const SET_API_BASE_URL = "SET_API_BASE_URL";

export const CHANGE_TAB = "CHANGE_TAB";
export const SHOW_TOAST = "SHOW_TOAST";

export const VIEW_PLAYLIST = "VIEW_PLAYLIST";
export const ADDING_TO_PLAYLIST = "ADDING_TO_PLAYLIST";
export const SAVING_PLAYLIST = "SAVING_PLAYLIST";

export const SET_POPUP_MENU = "SET_POPUP_MENU";
export const SET_OVERLAY = "SET_OVERLAY";
export const SET_CLICK_OVERLAY = "SET_CLICK_OVERLAY";
export const SET_OPTION = "SET_OPTION";

export interface SetAPIBaseURLAction {
  type: typeof SET_API_BASE_URL;
  url: string;
}

export interface LoginUserAction {
  type: typeof LOGIN_USER;
  userData: UserData;
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

export type AppActionTypes =
  | SetAPIBaseURLAction
  | LoginUserAction
  | ChangeTabAction
  | ShowToastAction
  | ViewPlaylistAction
  | SetPopupMenuAction
  | SetOverlayAction
  | SetClickOverlayAction
  | SetOptionAction;

export type AllActions =
  | AppActionTypes
  | DiscoverActionTypes
  | PlayerActionTypes
  | LibraryActionTypes;
