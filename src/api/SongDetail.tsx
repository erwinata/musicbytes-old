import React from "react";
import { YoutubeDataAPI } from "youtube-v3-api";
import { Song } from "types/Song";
import { store } from "redux/store/configureStore";
import { ConvertDurationToNumber } from "helpers/duration";
import { decodeText } from "helpers/decode";

export const SongDetail = (ids: string): Promise<Song[]> => {
  const state = store.getState();

  const API_KEY = state.app.user?.token.google ? "" : state.app.defaultKey;
  const api = new YoutubeDataAPI(API_KEY);

  return new Promise((resolve, reject) => {
    api
      .searchVideo(ids, {
        access_token: state.app.user?.token.google
          ? state.app.user!.token.google
          : "",
      })
      .then((data: any) => {
        var songs: Song[] = [];

        data.items.map((video: any, index: number) => {
          var snippet: any = video.snippet;
          var duration = ConvertDurationToNumber(video.contentDetails.duration);

          var song: Song = {
            id: video.id,
            title: decodeText(snippet.title),
            channel: decodeText(snippet.channelTitle),
            thumbnails: {
              default: snippet.thumbnails.default.url,
              medium: snippet.thumbnails.medium.url,
              high: snippet.thumbnails.high.url,
            },
            duration: duration,
          };

          songs.push(song);
        });

        console.log(songs);
        resolve(songs);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};
