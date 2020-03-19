import { Song } from "./Song";

export const SONG_SEARCH = "SONG_SEARCH";
export const PLAY_SONG = "PLAY_SONG";

export interface SongSearchAction {
  type: typeof SONG_SEARCH;
  query: string;
  songs: Song[];
}

export interface PlaySongAction {
  type: typeof PLAY_SONG;
  song: Song;
}

export type DiscoverActionTypes = SongSearchAction; //Add more action
export type PlayerActionTypes = PlaySongAction; //Add more action

export type AppActions = DiscoverActionTypes | PlayerActionTypes; //Add more action types
