import { AppActions } from "types/actions";
import { Dispatch } from "redux";
import { AppState } from "redux/store/configureStore";
import { Song } from "types/Song";
import { SongDetail } from "api/SongDetail";
import { PlayState } from "types/PlayState";

export const actionPlaySong = (song: Song): AppActions => ({
  type: "PLAY_SONG",
  song
});
export const actionDurationIncrement = (): AppActions => ({
  type: "DURATION_INCREMENT"
});
export const actionTogglePlaying = (state?: PlayState): AppActions => ({
  type: "TOGGLE_PLAYING",
  state
});
export const actionSeekTo = (to: number): AppActions => ({
  type: "SEEK_TO",
  to
});
export const actionSeekDone = (): AppActions => ({
  type: "SEEK_DONE"
});

export const playSong = (song: Song) => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    console.log(song);
    song = await SongDetail(song);

    dispatch(actionPlaySong(song));
  };
};

export const durationIncrement = () => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(actionDurationIncrement());
  };
};

export const togglePlaying = (state?: PlayState) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(actionTogglePlaying(state));
  };
};

export const seekTo = (to: number) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(actionSeekTo(to));
  };
};

export const seekDone = () => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(actionSeekDone());
  };
};
