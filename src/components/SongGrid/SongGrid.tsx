import React from "react";
import "./SongGrid.scss";
import { SongGridItem } from "./SongGridItem";

export const SongGrid = () => {
  return (
    <div className="SongGrid">
      <SongGridItem />
      <SongGridItem />
      <SongGridItem />
      <SongGridItem />
    </div>
  );
};
