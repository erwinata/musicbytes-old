import React from "react";
import { YoutubeDataAPI } from "youtube-v3-api";
import { Song } from "types/Song";
import { decodeText } from "helpers/decode";

export const SearchSong = (query: string, total: number): Promise<Song[]> => {
  const API_KEY = "AIzaSyBQ5KGEWWK9-A0O87RLepRrmX3yz7kU4iA";
  const api = new YoutubeDataAPI(API_KEY);

  var result: Song[] = [];

  return new Promise((resolve, reject) => {
    api
      .searchAll(query, total, {
        type: "video",
        videoCategoryId: 10,
        part: "snippet",
      })
      .then((data: any) => {
        data.items.map((video: any) => {
          var snippet: any = video.snippet;

          var item: Song = {
            id: video.id.videoId,
            title: decodeText(snippet.title),
            channel: decodeText(snippet.channelTitle),
            thumbnails: {
              default: snippet.thumbnails.default.url,
              medium: snippet.thumbnails.medium.url,
              high: snippet.thumbnails.high.url,
            },
            duration: 0,
          };
          result.push(item);
        });
        console.log(result);
        resolve(result);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};
