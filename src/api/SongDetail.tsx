import React from "react";
import { YoutubeDataAPI } from "youtube-v3-api";
import { Song } from "types/Song";

export const SongDetail = (song: Song): Promise<Song> => {
  const API_KEY = "AIzaSyAMh_GjYIGO20KiaxYR9-eCAk2ROY8vxk0";
  const api = new YoutubeDataAPI(API_KEY);

  var result: Song;

  return new Promise((resolve, reject) => {
    api
      .searchVideo(song.id, {
        part: "contentDetails"
      })
      .then((data: any) => {
        var durationRaw = data.items[0].contentDetails.duration;
        var durationRaw = durationRaw.split("M");
        var minute = parseInt(durationRaw[0].toString().replace(/\D/g, ""));
        var second = parseInt(durationRaw[1].toString().replace(/\D/g, ""));
        var duration = minute * 60 + second;
        result = {
          ...song,
          duration: duration
        };
        resolve(result);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};
