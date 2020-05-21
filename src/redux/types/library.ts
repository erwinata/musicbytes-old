import { Song } from "types/Song";

export const ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST";
export const SAVE_PLAYLIST = "SAVE_PLAYLIST";
export const RENAME_PLAYLIST = "RENAME_PLAYLIST";
export const NEW_PLAYLIST = "NEW_PLAYLIST";

export const MERGE_TO_PLAYLIST = "MERGE_TO_PLAYLIST";

export const LIKE_SONG = "LIKE_SONG";

export interface AddToPlaylistAction {
  type: typeof ADD_TO_PLAYLIST;
  playlistIndex: number;
  songs: Song[];
  isMergeTo?: boolean;
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
export interface NewPlaylistAction {
  type: typeof NEW_PLAYLIST;
  title: string;
  songs: Song[];
}

export interface LikeSongAction {
  type: typeof LIKE_SONG;
  song: Song;
  isExist: boolean;
}

export type LibraryActionTypes =
  | AddToPlaylistAction
  | SavePlaylistAction
  | RenamePlaylistAction
  | NewPlaylistAction
  | LikeSongAction;
