import { DiscoverActionTypes } from "./discover";
import { PlayerActionTypes } from "./player";
import { NavigationTab } from "types/Navigation";
import { LibraryActionTypes } from "./library";
import { Playlist } from "types/Playlist";
import { Song } from "types/Song";
import { ToastType } from "types/ToastType";

export const CHANGE_TAB = "CHANGE_TAB";
export const SHOW_TOAST = "SHOW_TOAST";
export const VIEW_PLAYLIST = "VIEW_PLAYLIST";
export const ADDING_TO_PLAYLIST = "ADDING_TO_PLAYLIST";

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
  playlistViewing: Playlist;
}
export interface AddingToPlaylistAction {
  type: typeof ADDING_TO_PLAYLIST;
  songAdding: Song;
}

export type AppActionTypes =
  | ChangeTabAction
  | ShowToastAction
  | ViewPlaylistAction
  | AddingToPlaylistAction;

export type AllActions =
  | AppActionTypes
  | DiscoverActionTypes
  | PlayerActionTypes
  | LibraryActionTypes;
