import { AppActions } from "types/actions";
import { Dispatch } from "redux";
import { AppState } from "store/configureStore";
import { Song } from "types/Song";

export const playSong = (song: Song): AppActions => ({
  type: "PLAY_SONG",
  song
});

export const startPlaySong = (song: Song) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    console.log(song);
    dispatch(playSong(song));
  };
};
