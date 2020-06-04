import React from "react";
import { CategoryTitle } from "components/CategoryTitle/CategoryTitle";
import SongGrid from "components/SongGrid/SongGrid";

export const Listen = () => {
  return (
    <div className="Listen">
      <CategoryTitle text="Recent Playlist" />
      {/* <SongGrid /> */}

      <CategoryTitle text="You might like these" />
      {/* <SongGrid /> */}

      {/* <CategoryTitle />
      <SongGrid /> */}
    </div>
  );
};
