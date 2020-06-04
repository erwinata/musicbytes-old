import { Song } from "./Song";

export interface Playlist {
  id: number;
  title: string;
  songs: Song[];
  thumbnails?: string;
  createdAt: string;
  updatedAt: string;
}
