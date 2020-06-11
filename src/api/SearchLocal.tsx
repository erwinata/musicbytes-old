import React from "react";
import { YoutubeDataAPI } from "youtube-v3-api";
import { Song } from "types/Song";
import { decodeText } from "helpers/string";
import { ConvertDurationToNumber } from "helpers/duration";
import { store } from "redux/store/configureStore";
import { SongDetail } from "./SongDetail";
import { find, remove } from "lodash";
import { axiosIntercept } from "./Connection";
import {
  storeUpdateToken,
  getSearchSongIds,
  storeSearchSongIds,
} from "helpers/localStorage";
import {
  actionUpdateToken,
  actionShowToast,
  actionSetAPIKey,
} from "redux/actions/app";
import axios from "axios";
import { convertSongFromDB } from "helpers/song";

export const SearchSongLocal = (
  query: string,
  reference: string
): Promise<Song[]> => {
  const state = store.getState();

  return new Promise((resolve, reject) => {
    axios
      .get(
        `${state.app.apiBaseURL}v1/search?reference=` +
          reference +
          `&` +
          `query=` +
          query
      )
      // .get(`${state.app.apiBaseURL}v1/search?query=` + query)
      .then((response) => {
        console.log(response);
        let resultSongs: Song[] = [];
        response.data.songs.map((song: any) => {
          let songItem: Song = convertSongFromDB(song);
          resultSongs.push(songItem);
        });
        resolve(resultSongs);
      });
  });
};
