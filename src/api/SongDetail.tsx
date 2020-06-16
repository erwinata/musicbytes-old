import axios from "axios";
import { ConvertDurationToNumber } from "helpers/duration";
import { convertSongFromDB } from "helpers/song";
import { decodeText, getTitleAndArtist, normalizeTitle } from "helpers/string";
import { filter, find, uniq } from "lodash";
import { actionSetAPIKey } from "redux/actions/app";
import { store } from "redux/store/configureStore";
import { Song } from "types/Song";
import { YoutubeDataAPI } from "youtube-v3-api";

export const SongDetail = (
  ids: string,
  forceApiKey?: number
): Promise<Song[]> => {
  if (ids.split(",").length === 0 || ids === "") return Promise.resolve([]);

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

  const rawIds = ids;

  let resultSongs: Song[] = [];
  let cachedSong: Song[] = [];

  if (localStorage.getItem("song")) {
    let songIdArray = ids.split(",");
    let reducedIds = "";

    cachedSong = JSON.parse(localStorage.getItem("song")!);

    songIdArray.map((id, index) => {
      let song: Song | undefined = find(cachedSong, { id: id });
      if (song) {
        resultSongs.push(song);
        // remove(songIdArray, id);
      } else {
        reducedIds += id;
        if (index < songIdArray.length - 1) {
          reducedIds += ",";
        }
      }
    });

    ids = reducedIds;
  }

  return new Promise(async (resolve, reject) => {
    if (ids.trim() === "") {
      resultSongs = SortSongByIds(resultSongs, rawIds);
      resolve(uniq(resultSongs));
    } else {
      await axios
        .get(`${store.getState().app.apiBaseURL}v1/song/` + ids)
        .then((response: any) => {
          response.data.songs.map((song: any) => {
            let songItem: Song = convertSongFromDB(song);
            cachedSong.push(songItem);
            resultSongs.push(songItem);
            ids = ids.replace("," + song.id, "");
            ids = ids.replace(song.id, "");
          });
        });

      if (ids.trim() === "") {
        localStorage.setItem("song", JSON.stringify(cachedSong));
        resultSongs = SortSongByIds(resultSongs, rawIds);
        resolve(uniq(resultSongs));
      } else {
        api
          .searchVideo(ids, {
            // access_token: state.app.user?.token.google
            //   ? state.app.user!.token.google
            //   : "",
          })
          .then(async (data: any) => {
            await Promise.all(
              data.items.map(async (video: any) => {
                let snippet: any = video.snippet;
                let duration = ConvertDurationToNumber(
                  video.contentDetails.duration
                );

                let titleArtist = getTitleAndArtist(snippet.title);
                let title = decodeText(normalizeTitle(titleArtist[1]));
                let artist = decodeText(normalizeTitle(titleArtist[0]));

                let song: Song = {
                  id: video.id,
                  title: title,
                  channel: artist,
                  thumbnails: {
                    default: snippet.thumbnails.default.url,
                    medium: snippet.thumbnails.medium.url,
                    high: snippet.thumbnails.high.url,
                  },
                  duration: duration,
                  tags: snippet.tags ? snippet.tags : [],
                };

                cachedSong.push(song);
                resultSongs.push(song);
              })
            );

            localStorage.setItem("song", JSON.stringify(cachedSong));

            resultSongs = SortSongByIds(resultSongs, rawIds);
            resolve(uniq(resultSongs));
          })
          .catch((err: any) => {
            // .then(async (data: any) => {
            const status = err.response ? err.response.status : null;

            if (status === 403 && store.getState().app.apiKey == 1) {
              store.dispatch(actionSetAPIKey(2));

              return SongDetail(ids, 2);
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
            //         resolve(SongDetail(ids));
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
    }
  });
};

export const SortSongByIds = (songs: Song[], ids: string) => {
  let idArray = ids.split(",");
  let result: Song[] = [];

  idArray.map((id) => {
    let song = filter(songs, { id: id })[0];
    result.push(song);
  });

  return result;
};
