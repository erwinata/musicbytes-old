import React from "react";
import "./SongList.scss";
import { SongListItem } from "./SongListItem";

export const SongList = () => {
  return (
    <div className="SongList">
      <SongListItem />
      <SongListItem />
      <SongListItem />
      <SongListItem />
      <SongListItem />
    </div>
  );
};
