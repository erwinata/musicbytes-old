import React from "react";
import { YoutubeDataAPI } from "youtube-v3-api";
import { Song } from "types/Song";
import { decodeText } from "helpers/decode";
import { ConvertDurationToNumber } from "helpers/duration";

export const SearchSong = (query: string, total: number): Promise<Song[]> => {
  const API_KEY = "AIzaSyBQ5KGEWWK9-A0O87RLepRrmX3yz7kU4iA";
  const api = new YoutubeDataAPI(API_KEY);

  return new Promise((resolve, reject) => {
    api
      .searchAll(query, total, {
        type: "video",
        videoCategoryId: 10,
        part: "snippet",
      })
      .then(async (data: any) => {
        var ids = "";

        data.items.map((video: any) => {
          ids += video.id.videoId + ",";
        });

        resolve(SearchSongDetail(ids));
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

export const SearchSongDetail = (ids: string): Promise<Song[]> => {
  const API_KEY = "AIzaSyBQ5KGEWWK9-A0O87RLepRrmX3yz7kU4iA";
  const api = new YoutubeDataAPI(API_KEY);

  return new Promise((resolve, reject) => {
    api
      .searchVideo(ids)
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
