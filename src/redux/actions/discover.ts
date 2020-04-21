import { AllActions } from "redux/types/app";
import { Dispatch } from "redux";
import { AppState } from "redux/store/configureStore";
import { SearchSong } from "api/Search";
import { Song } from "types/Song";

export const actionSearchSong = (query: string, songs: Song[]): AllActions => ({
  type: "SONG_SEARCH",
  query,
  songs,
});

export const searchSong = (query: string) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    console.log("ACT" + query);

    var total = 2;
    var songs = await SearchSong(query, total);

    dispatch(actionSearchSong(query, songs));
  };
};
