import React from "react";
import { Header } from "components/Header/Header";
import { CategoryTitle } from "components/CategoryTitle/CategoryTitle";
import { SongGrid } from "components/SongGrid/SongGrid";
import { Navbar } from "components/Navbar/Navbar";
import { MiniPlayer } from "components/MiniPlayer/MiniPlayer";

export const Listen = () => {
  return (
    <div className="Listen">
      <Header />
      <MiniPlayer />
      <Navbar />

      <CategoryTitle />
      <SongGrid />

      <CategoryTitle />
      <SongGrid />

      {/* <CategoryTitle />
      <SongGrid /> */}
    </div>
  );
};
