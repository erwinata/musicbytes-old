import { Song } from "./Song";

export interface Playlist {
  title: string;
  songs: Song[];
  thumbnails?: string;
  createdAt: number;
  updatedAt: number;
}