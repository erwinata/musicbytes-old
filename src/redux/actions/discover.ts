import { AllActions } from "redux/types/app";
import { Dispatch } from "redux";
import { AppState } from "redux/store/configureStore";
import { SearchSong } from "api/Search";
import { Song } from "types/Song";
import { find } from "lodash";

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

export const searchSong = (query: string, nextPage?: boolean) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    if (!nextPage) {
      let total = 10;
      let result = await SearchSong(query, total);

      // result.songs.map((song) => {
      // 	var songExist = find(
      // 		getState().discover.songs,
      // 		(item) => item.id == song.id
      // 	);
      // 	if (songExist) {

      // 	}
      // })

      dispatch(actionSearchSong(query, result.nextPageToken, result.songs));
    } else {
      let total = 5;
      let result = await SearchSong(
        query,
        total,
        getState().discover.nextPageToken
      );
      dispatch(
        actionSearchSong(query, result.nextPageToken, result.songs, true)
      );
    }
  };
};
