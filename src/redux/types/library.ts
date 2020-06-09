import { Song } from "types/Song";
import { Playlist } from "types/Playlist";

export const CLEAR_ALL_LIBRARY = "CLEAR_ALL_LIBRARY";
export const LOAD_PLAYLISTS = "LOAD_PLAYLISTS";
export const LOAD_COLLECTION = "LOAD_COLLECTION";

export const ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST";
export const REMOVE_FROM_PLAYLIST = "REMOVE_FROM_PLAYLIST";
export const SAVE_PLAYLIST = "SAVE_PLAYLIST";
export const RENAME_PLAYLIST = "RENAME_PLAYLIST";
export const DELETE_PLAYLIST = "DELETE_PLAYLIST";
export const NEW_PLAYLIST = "NEW_PLAYLIST";

export const MERGE_TO_PLAYLIST = "MERGE_TO_PLAYLIST";

export const LIKE_SONG = "LIKE_SONG";

export interface ClearAllLibraryAction {
  type: typeof CLEAR_ALL_LIBRARY;
}
export interface LoadPlaylistsAction {
  type: typeof LOAD_PLAYLISTS;
  playlists: Playlist[];
}
export interface LoadCollectionAction {
  type: typeof LOAD_COLLECTION;
  collection: Song[];
}
export interface AddToPlaylistAction {
  type: typeof ADD_TO_PLAYLIST;
  songs: Song[];
  playlist: Playlist;
  isMergeTo?: boolean;
}
export interface RemoveFromPlaylistAction {
  type: typeof REMOVE_FROM_PLAYLIST;
  playlist: Playlist;
  song: Song;
}
export interface SavePlaylistAction {
  type: typeof SAVE_PLAYLIST;
  playlist: Playlist;
  songs: Song[];
}
export interface RenamePlaylistAction {
  type: typeof RENAME_PLAYLIST;
  playlist: Playlist;
  title: string;
}
export interface DeletePlaylistAction {
  type: typeof DELETE_PLAYLIST;
  playlist: Playlist;
}
export interface NewPlaylistAction {
  type: typeof NEW_PLAYLIST;
  playlist: Playlist;
  isMergeTo?: boolean;
}

export interface LikeSongAction {
  type: typeof LIKE_SONG;
  song: Song;
  isExist: boolean;
}

export type LibraryActionTypes =
  | ClearAllLibraryAction
  | LoadPlaylistsAction
  | LoadCollectionAction
  | AddToPlaylistAction
  | RemoveFromPlaylistAction
  | SavePlaylistAction
  | RenamePlaylistAction
  | DeletePlaylistAction
  | NewPlaylistAction
  | LikeSongAction;
