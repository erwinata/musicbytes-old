import axios from "axios";
import { convertSongFromDB } from "helpers/song";
import { store } from "redux/store/configureStore";
import { Song } from "types/Song";

export const SearchSongLocal = (
  query: string,
  reference: string
): Promise<Song[]> => {
  const state = store.getState();

  return new Promise((resolve, reject) => {
    axios
      .get(
        `${state.app.apiBaseURL}v1/recommendation/search?reference=` +
          reference +
          `&` +
          `query=` +
          query
      )
      // .get(`${state.app.apiBaseURL}v1/search?query=` + query)
      .then((response) => {
        let resultSongs: Song[] = [];
        response.data.songs.map((song: any) => {
          let songItem: Song = convertSongFromDB(song);
          resultSongs.push(songItem);
        });
        resolve(resultSongs);
      });
  });
};

export const SearchPeopleFavorites = (): Promise<Song[]> => {
  const state = store.getState();

  return new Promise((resolve, reject) => {
    axios
      .get(`${state.app.apiBaseURL}v1/recommendation/peoplefavorites`)
      // .get(`${state.app.apiBaseURL}v1/search?query=` + query)
      .then((response) => {
        let resultSongs: Song[] = [];
        response.data.songs.map((song: any) => {
          let songItem: Song = convertSongFromDB(song);
          resultSongs.push(songItem);
        });
        resolve(resultSongs);
      });
  });
};
