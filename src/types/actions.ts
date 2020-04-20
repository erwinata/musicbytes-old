import { Song } from "./Song";
import { PlayState } from "./PlayState";

export const SONG_SEARCH = "SONG_SEARCH";

export interface SongSearchAction {
  type: typeof SONG_SEARCH;
  query: string;
  songs: Song[];
}

export const SHOW_PLAYER = "SHOW_PLAYER";
export const PLAY_SONG = "PLAY_SONG";
export const TOGGLE_PLAYING = "TOGGLE_PLAYING";
export const DURATION_INCREMENT = "DURATION_INCREMENT";
export const SEEK_TO = "SEEK_TO";
export const SEEK_DONE = "SEEK_DONE";
export const ADD_TO_NOW_PLAYING = "ADD_TO_NOW_PLAYING";

export interface ShowPlayerAction {
  type: typeof SHOW_PLAYER;
  show: boolean;
}
export interface PlaySongAction {
  type: typeof PLAY_SONG;
  song: Song;
}
export interface DurationIncrementAction {
  type: typeof DURATION_INCREMENT;
}
export interface SeekToAction {
  type: typeof SEEK_TO;
  to: number;
}
export interface SeekDoneAction {
  type: typeof SEEK_DONE;
}
export interface TogglePlayingAction {
  type: typeof TOGGLE_PLAYING;
  state?: PlayState;
}
export interface AddToNowPlayingAction {
  type: typeof ADD_TO_NOW_PLAYING;
  song: Song;
}

export type DiscoverActionTypes = SongSearchAction;
export type PlayerActionTypes =
  | ShowPlayerAction
  | PlaySongAction
  | DurationIncrementAction
  | TogglePlayingAction
  | SeekToAction
  | SeekDoneAction
  | AddToNowPlayingAction;

export type AppActions = DiscoverActionTypes | PlayerActionTypes;
