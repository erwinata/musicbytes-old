import { Song } from "types/Song";

export const SONG_SEARCH = "SONG_SEARCH";

export interface SongSearchAction {
  type: typeof SONG_SEARCH;
  query: string;
  songs: Song[];
}

export type DiscoverActionTypes = SongSearchAction;
