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

export const CHANGE_TAB = "CHANGE_TAB";
export const SHOW_TOAST = "SHOW_TOAST";

export const VIEW_PLAYLIST = "VIEW_PLAYLIST";
export const ADDING_TO_PLAYLIST = "ADDING_TO_PLAYLIST";
export const SAVING_PLAYLIST = "SAVING_PLAYLIST";

export const SET_POPUP_MENU = "SET_POPUP_MENU";
export const SET_OVERLAY = "SET_OVERLAY";
export const SET_OPTION = "SET_OPTION";

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
  playlistIndex?: number;
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

export interface SetOptionAction {
  type: typeof SET_OPTION;
  show: boolean;
  item?: any;
  optionList?: OptionActionType[];
  position?: XY;
}

export type AppActionTypes =
  | ChangeTabAction
  | ShowToastAction
  | ViewPlaylistAction
  | SetPopupMenuAction
  | SetOverlayAction
  | SetOptionAction;

export type AllActions =
  | AppActionTypes
  | DiscoverActionTypes
  | PlayerActionTypes
  | LibraryActionTypes;
