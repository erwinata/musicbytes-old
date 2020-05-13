import { DiscoverActionTypes } from "./discover";
import { PlayerActionTypes } from "./player";
import { NavigationTab } from "types/Navigation";
import { LibraryActionTypes } from "./library";
import { Playlist } from "types/Playlist";

export const CHANGE_TAB = "CHANGE_TAB";
export const VIEW_PLAYLIST = "VIEW_PLAYLIST";

export interface ChangeTabAction {
  type: typeof CHANGE_TAB;
  to: NavigationTab;
}
export interface ViewPlaylistAction {
  type: typeof VIEW_PLAYLIST;
  playlistViewing: Playlist;
}

export type AppActionTypes = ChangeTabAction | ViewPlaylistAction;

export type AllActions =
  | AppActionTypes
  | DiscoverActionTypes
  | PlayerActionTypes
  | LibraryActionTypes;
