import { Song } from "../../types/Song";
import { PlayState } from "../../types/PlayState";

export const SHOW_PLAYER = "SHOW_PLAYER";

export const PLAY_SONG = "PLAY_SONG";
export const TOGGLE_PLAYING = "TOGGLE_PLAYING";
export const NEXT_SONG = "NEXT_SONG";
export const PREV_SONG = "PREV_SONG";

export const REMOVE_SONG = "REMOVE_SONG";

export const TOGGLE_SHUFFLE = "TOGGLE_SHUFFLE";
export const TOGGLE_REPEAT = "TOGGLE_REPEAT";

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
  resetPlaylist: boolean;
}
export interface TogglePlayingAction {
  type: typeof TOGGLE_PLAYING;
  state?: PlayState;
}
export interface NextSongAction {
  type: typeof NEXT_SONG;
}
export interface PrevSongAction {
  type: typeof PREV_SONG;
}

export interface RemoveSongAction {
  type: typeof REMOVE_SONG;
  song: Song;
}

export interface ToggleShuffleAction {
  type: typeof TOGGLE_SHUFFLE;
}
export interface ToggleRepeatAction {
  type: typeof TOGGLE_REPEAT;
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

export interface AddToNowPlayingAction {
  type: typeof ADD_TO_NOW_PLAYING;
  song: Song;
}

export type PlayerActionTypes =
  | ShowPlayerAction
  | PlaySongAction
  | TogglePlayingAction
  | NextSongAction
  | PrevSongAction
  | RemoveSongAction
  | ToggleShuffleAction
  | ToggleRepeatAction
  | DurationIncrementAction
  | SeekToAction
  | SeekDoneAction
  | AddToNowPlayingAction;
