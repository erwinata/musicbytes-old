import { AllActions } from "redux/types/app";
import { Dispatch } from "redux";
import { AppState } from "redux/store/configureStore";
import { SearchSong } from "api/Search";
import { Song } from "types/Song";
import { find } from "lodash";
import { SongDetail } from "api/SongDetail";

export const actionSetQuery = (query: string): AllActions => ({
  type: "SET_QUERY",
  query,
});

export const actionSearchSong = (
  query: string,
  nextPageToken: string,
  songs: Song[],
  addSongs?: boolean
): AllActions => ({
  type: "SONG_SEARCH",
  query,
  nextPageToken,
  songs,
  addSongs,
});

export const setQuery = (query: string) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    actionSetQuery(query);
  };
};

export const searchSong = (query: string, nextPage?: boolean) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    if (!nextPage) {
      let total = 40;
      let result = await SearchSong(query, total);
      let resultSongs = await SongDetail(result.ids);

      dispatch(actionSearchSong(query, result.nextPageToken, resultSongs));
    } else {
      let total = 40;
      let result = await SearchSong(
        query,
        total,
        getState().discover.nextPageToken
      );
      let resultSongs = await SongDetail(result.ids);

      dispatch(
        actionSearchSong(query, result.nextPageToken, resultSongs, true)
      );
    }
  };
};
