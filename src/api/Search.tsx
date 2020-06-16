import { getSearchSongIds, storeSearchSongIds } from "helpers/localStorage";
import { remove } from "lodash";
import { actionSetAPIKey } from "redux/actions/app";
import { store } from "redux/store/configureStore";
import { YoutubeDataAPI } from "youtube-v3-api";

export const SearchSong = (
  query: string,
  total: number,
  nextPageToken?: string,
  songListenedException?: boolean,
  forceApiKey?: number
): Promise<{ nextPageToken: string; ids: string }> => {
  const state = store.getState();

  // const API_KEY = state.app.user?.token.google ? "" : state.app.defaultKey;
  let API_KEY = "";
  let keyIndex = forceApiKey ? forceApiKey : state.app.apiKey;
  switch (keyIndex) {
    case 1:
      API_KEY = process.env.REACT_APP_API_KEY_GOOGLE_1!;
      break;
    case 2:
      API_KEY = process.env.REACT_APP_API_KEY_GOOGLE_2!;
      break;
    default:
      API_KEY = process.env.REACT_APP_API_KEY_GOOGLE_1!;
      break;
  }
  const api = new YoutubeDataAPI(API_KEY);
  // const api = new YoutubeDataAPI("");

  return new Promise((resolve, reject) => {
    const cacheSearch = getSearchSongIds(query);

    if (cacheSearch && nextPageToken === undefined) {
      resolve(cacheSearch);
    } else {
      api
        .searchAll(query, total, {
          type: "video",
          videoCategoryId: 10,
          part: "snippet",
          pageToken: nextPageToken,
          // access_token: state.app.user?.token.google
          //   ? state.app.user!.token.google
          //   : "",
        })
        .then(async (data: any) => {
          let cachedSongPlayed: { song: string; total: number }[] = [];
          if (localStorage.getItem("song_played")) {
            cachedSongPlayed = JSON.parse(localStorage.getItem("song_played")!);
          }

          if (songListenedException) {
            cachedSongPlayed.map((songId) => {
              remove(data.items, (o: any) => {
                return o.id.videoId === songId.song;
              });
            });
          }

          let ids = "";

          data.items.map((video: any, index: number) => {
            ids += video.id.videoId;
            if (index < data.items.length - 1) ids += ",";
          });

          storeSearchSongIds(query, ids, data.nextPageToken);

          resolve({
            nextPageToken: data.nextPageToken,
            ids: ids,
          });
        })
        .catch((err: any) => {
          const status = err.response ? err.response.status : null;

          if (status === 403 && store.getState().app.apiKey == 1) {
            store.dispatch(actionSetAPIKey(2));

            return SearchSong(
              query,
              total,
              nextPageToken,
              songListenedException,
              2
            );
          }

          // if (status === 401) {
          //   axiosIntercept()
          //     .post(`${store.getState().app.apiBaseURL}v1/refreshgoogletoken`)
          //     .then(
          //       (response: any) => {
          //         const token = { google: response.data.access_token };
          //         storeUpdateToken(token);
          //         store.dispatch(actionUpdateToken(token));
          //         store.dispatch(actionShowToast("Token Refreshed"));
          //         console.log(response);
          //         resolve(
          //           SearchSong(query, total, nextPageToken, songListenedException)
          //         );
          //       },
          //       (error) => {
          //         console.log(error);
          //         reject(err);
          //       }
          //     );
          // }
          reject(err);
        });
    }
  });
};
