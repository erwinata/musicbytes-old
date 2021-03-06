import { Playlist } from "types/Playlist";
import { PlayState } from "../../types/PlayState";
import { Song } from "../../types/Song";

export const SHOW_PLAYER = "SHOW_PLAYER";

export const PLAY_SONG = "PLAY_SONG";
export const SET_VIDEO_IS_RUNNING = "SET_VIDEO_IS_RUNNING";
export const PLAY_PLAYLIST = "PLAY_PLAYLIST";
export const CLEAR_PLAYER = "CLEAR_PLAYER";
export const CLEAR_PLAYLIST = "CLEAR_PLAYLIST";
export const TOGGLE_PLAYING = "TOGGLE_PLAYING";

export const AUTO_NEXT_SONG = "AUTO_NEXT_SONG";
export const NEXT_SONG = "NEXT_SONG";
export const PREV_SONG = "PREV_SONG";

export const REMOVE_SONG = "REMOVE_SONG";

export const TOGGLE_SHUFFLE = "TOGGLE_SHUFFLE";
export const TOGGLE_REPEAT = "TOGGLE_REPEAT";

export const DURATION_INCREMENT = "DURATION_INCREMENT";

export const SEEK_TO = "SEEK_TO";
export const SEEK_DONE = "SEEK_DONE";

export const ADD_TO_NOW_PLAYING = "ADD_TO_NOW_PLAYING";
export const REMOVE_FROM_NOW_PLAYING = "REMOVE_FROM_NOW_PLAYING";

export interface ShowPlayerAction {
  type: typeof SHOW_PLAYER;
  show: boolean;
}
export interface PlaySongAction {
  type: typeof PLAY_SONG;
  song: Song;
  resetPlaylist: boolean;
}
export interface PlayPlaylistAction {
  type: typeof PLAY_PLAYLIST;
  playlist: Playlist;
}
export interface ClearPlaylistAction {
  type: typeof CLEAR_PLAYLIST;
}
export interface ClearPlayerAction {
  type: typeof CLEAR_PLAYER;
}
export interface TogglePlayingAction {
  type: typeof TOGGLE_PLAYING;
  state?: PlayState;
}
export interface SetVideoIsRunningAction {
  type: typeof SET_VIDEO_IS_RUNNING;
  videoIsRunning?: boolean;
}
export interface AutoNextSongAction {
  type: typeof AUTO_NEXT_SONG;
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

export interface RemoveFromNowPlayingAction {
  type: typeof REMOVE_FROM_NOW_PLAYING;
  song: Song;
}

export type PlayerActionTypes =
  | ShowPlayerAction
  | PlaySongAction
  | PlayPlaylistAction
  | ClearPlaylistAction
  | ClearPlayerAction
  | TogglePlayingAction
  | SetVideoIsRunningAction
  | AutoNextSongAction
  | NextSongAction
  | PrevSongAction
  | RemoveSongAction
  | ToggleShuffleAction
  | ToggleRepeatAction
  | DurationIncrementAction
  | SeekToAction
  | SeekDoneAction
  | AddToNowPlayingAction
  | RemoveFromNowPlayingAction;
