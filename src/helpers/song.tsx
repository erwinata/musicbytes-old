import { Song } from "types/Song";

export const convertSongFromDB = (song: any) => {
  let songItem: Song = {
    id: song.id,
    title: song.title,
    channel: song.artist,
    duration: song.duration,
    tags: song.tags.split(","),
    thumbnails: {
      default: "https://i.ytimg.com/vi/" + song.id + "/default.jpg",
      medium: "https://i.ytimg.com/vi/" + song.id + "/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/" + song.id + "/hqdefault.jpg",
    },
  };

  return songItem;
};
