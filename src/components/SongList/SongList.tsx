import React from "react";
import "./SongList.scss";
import SongListItem from "./SongListItem";
import { Song } from "types/Song";

interface Props {
  songs: Song[];
}

export const SongList: React.FC<Props> = ({ songs }: Props) => {
  return (
    <div className="SongList">
      {songs.map(song => (
        <SongListItem song={song} key={song.id} />
      ))}
    </div>
  );
};
