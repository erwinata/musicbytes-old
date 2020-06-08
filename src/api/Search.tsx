import React from "react";
import { YoutubeDataAPI } from "youtube-v3-api";
import { Song } from "types/Song";
import { decodeText } from "helpers/string";
import { ConvertDurationToNumber } from "helpers/duration";
import { store } from "redux/store/configureStore";
import { SongDetail } from "./SongDetail";
import { find, remove } from "lodash";

export const SearchSong = (
  query: string,
  total: number,
  nextPageToken?: string,
  songListenedException?: boolean
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
