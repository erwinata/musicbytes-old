import React from "react";
import { YoutubeDataAPI } from "youtube-v3-api";
import { Song } from "types/Song";
import { store } from "redux/store/configureStore";
import { ConvertDurationToNumber } from "helpers/duration";
import { decodeText, normalizeTitle, getTitleAndArtist } from "helpers/string";
import axios from "axios";
import { find, remove } from "lodash";

export const SongDetail = (ids: string): Promise<Song[]> => {
  const state = store.getState();

  const API_KEY = state.app.user?.token.google ? "" : state.app.defaultKey;
  const api = new YoutubeDataAPI(API_KEY);

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

    console.log(reducedIds);
    ids = reducedIds;
  }

  return new Promise((resolve, reject) => {
    if (ids.replace(" ", "") == "") {
      resolve(resultSongs);
    } else {
      api
        .searchVideo(ids, {
          access_token: state.app.user?.token.google
            ? state.app.user!.token.google
            : "",
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
                tags: snippet.tags,
              };

              cachedSong.push(song);

              resultSongs.push(song);

              // await axios
              //   .get(
              //     process.env.REACT_APP_API_BASE_LASTFM! +
              //       "?api_key=" +
              //       process.env.REACT_APP_API_KEY_LASTFM! +
              //       "&format=json" +
              //       "&method=track.search" +
              //       "&limit=2" +
              //       "&track=" +
              //       normalizeTitle(title)
              //   )
              //   .then((response: any) => {
              //     // resolve(response);

              //     console.log(response.data.results.trackmatches.track[0].artist);
              //     console.log(snippet.thumbnails.default.url);

              //     let artist = decodeText(
              //       response.data.results.trackmatches.track[0].artist
              //     );

              //     let song: Song = {
              //       id: video.id,
              //       title: title,
              //       channel: artist,
              //       thumbnails: {
              //         default: snippet.thumbnails.default.url,
              //         medium: snippet.thumbnails.medium.url,
              //         high: snippet.thumbnails.high.url,
              //       },
              //       duration: duration,
              //     };

              //     songs.push(song);
              //   });
            })
          );

          // var songs: Song[] = await Promise.all<Song[]>(promises);

          // data.items.map(async (video: any, index: number) => {

          // });

          localStorage.setItem("song", JSON.stringify(cachedSong));

          console.log(resultSongs);
          resolve(resultSongs);
        })
        .catch((err: any) => {
          reject(err);
        });
    }
  });
};
