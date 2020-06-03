import { Song } from "types/Song";
import { Playlist } from "types/Playlist";

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
  playlistIndex: number;
  songs: Song[];
  isMergeTo?: boolean;
}
export interface RemoveFromPlaylistAction {
  type: typeof REMOVE_FROM_PLAYLIST;
  playlistIndex: number;
  song: Song;
}
export interface SavePlaylistAction {
  type: typeof SAVE_PLAYLIST;
  playlistIndex: number;
  songs: Song[];
}
export interface RenamePlaylistAction {
  type: typeof RENAME_PLAYLIST;
  playlistIndex: number;
  title: string;
}
export interface DeletePlaylistAction {
  type: typeof DELETE_PLAYLIST;
  playlistIndex: number;
}
export interface NewPlaylistAction {
  type: typeof NEW_PLAYLIST;
  title: string;
  songs: Song[];
  isMergeTo?: boolean;
}

export interface LikeSongAction {
  type: typeof LIKE_SONG;
  song: Song;
  isExist: boolean;
}

export type LibraryActionTypes =
  | LoadPlaylistsAction
  | LoadCollectionAction
  | AddToPlaylistAction
  | RemoveFromPlaylistAction
  | SavePlaylistAction
  | RenamePlaylistAction
  | DeletePlaylistAction
  | NewPlaylistAction
  | LikeSongAction;
