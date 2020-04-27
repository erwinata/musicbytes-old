import { AllActions } from "redux/types/app";
import { Dispatch } from "redux";
import { AppState } from "redux/store/configureStore";
import { Song } from "types/Song";
import { SongDetail } from "api/SongDetail";
import { PlayState } from "types/PlayState";

export const actionShowPlayer = (show: boolean): AllActions => ({
  type: "SHOW_PLAYER",
  show,
});
export const actionPlaySong = (
  song: Song,
  resetPlaylist: boolean
): AllActions => ({
  type: "PLAY_SONG",
  song,
  resetPlaylist,
});
export const actionDurationIncrement = (): AllActions => ({
  type: "DURATION_INCREMENT",
});
export const actionTogglePlaying = (state?: PlayState): AllActions => ({
  type: "TOGGLE_PLAYING",
  state,
});

export const actionNextSong = (): AllActions => ({
  type: "NEXT_SONG",
});
export const actionPrevSong = (): AllActions => ({
  type: "PREV_SONG",
});

export const actionRemoveSong = (song: Song): AllActions => ({
  type: "REMOVE_SONG",
  song,
});

export const actionToggleShuffle = (): AllActions => ({
  type: "TOGGLE_SHUFFLE",
});
export const actionToggleRepeat = (): AllActions => ({
  type: "TOGGLE_REPEAT",
});

export const actionSeekTo = (to: number): AllActions => ({
  type: "SEEK_TO",
  to,
});
export const actionSeekDone = (): AllActions => ({
  type: "SEEK_DONE",
});
export const actionAddToNowPlaying = (song: Song): AllActions => ({
  type: "ADD_TO_NOW_PLAYING",
  song,
});

export const showPlayer = (show: boolean) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionShowPlayer(show));
  };
};

export const playSong = (song: Song, resetPlaylist: boolean) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    console.log(song);
    song = await SongDetail(song);

    dispatch(actionPlaySong(song, resetPlaylist));
    dispatch(actionShowPlayer(true));
  };
};

export const addToNowPlaying = (song: Song) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    console.log(song);
    song = await SongDetail(song);

    dispatch(actionAddToNowPlaying(song));
  };
};

export const durationIncrement = () => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionDurationIncrement());
  };
};

export const togglePlaying = (state?: PlayState) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionTogglePlaying(state));
  };
};

export const nextSong = () => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionNextSong());
  };
};

export const prevSong = () => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionPrevSong());
  };
};

export const removeSong = (song: Song) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionRemoveSong(song));
  };
};

export const toggleShuffle = () => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionToggleShuffle());
  };
};

export const toggleRepeat = () => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionToggleRepeat());
  };
};

export const seekTo = (to: number) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionSeekTo(to));
  };
};

export const seekDone = () => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionSeekDone());
  };
};
