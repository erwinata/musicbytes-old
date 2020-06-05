import React from "react";
import { YoutubeDataAPI } from "youtube-v3-api";
import { Song } from "types/Song";
import { decodeText } from "helpers/string";
import { ConvertDurationToNumber } from "helpers/duration";
import { store } from "redux/store/configureStore";
import { SongDetail } from "./SongDetail";

export const SearchSong = (
  query: string,
  total: number,
  nextPageToken?: string
): Promise<{ nextPageToken: string; songs: Song[] }> => {
  const state = store.getState();

  const API_KEY = state.app.user?.token.google ? "" : state.app.defaultKey;
  const api = new YoutubeDataAPI(API_KEY);
  // const api = new YoutubeDataAPI("");

  return new Promise((resolve, reject) => {
    api
      .searchAll(query, total, {
        type: "video",
        videoCategoryId: 10,
        part: "snippet",
        pageToken: nextPageToken,
        access_token: state.app.user?.token.google
          ? state.app.user!.token.google
          : "",
      })
      .then(async (data: any) => {
        var ids = "";

        data.items.map((video: any) => {
          ids += video.id.videoId + ",";
        });

        resolve({
          nextPageToken: data.nextPageToken,
          songs: await SongDetail(ids),
        });
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};
