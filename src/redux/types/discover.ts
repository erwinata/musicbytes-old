import { Song } from "types/Song";

export const SET_QUERY = "SET_QUERY";
export const SONG_SEARCH = "SONG_SEARCH";

export interface SetQueryAction {
  type: typeof SET_QUERY;
  query: string;
}

export interface SongSearchAction {
  type: typeof SONG_SEARCH;
  query: string;
  nextPageToken: string;
  songs: Song[];
  addSongs?: boolean;
}

export type DiscoverActionTypes = SetQueryAction | SongSearchAction;
