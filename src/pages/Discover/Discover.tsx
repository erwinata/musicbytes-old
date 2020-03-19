import React from "react";
import { Header } from "components/Header/Header";
import { Navbar } from "components/Navbar/Navbar";
import { MiniPlayer } from "components/MiniPlayer/MiniPlayer";
import { SearchBar } from "components/SearchBar/SearchBar";
import { SongList } from "components/SongList/SongList";
import { Tooltip } from "components/Tooltip/Tooltip";
import { Popup } from "components/Popup/Popup";

export const Discover = () => {
  return (
    <div className="Discover">
      <Popup />

      <Header />
      <MiniPlayer />
      <Navbar />

      <SearchBar />

      <SongList />
    </div>
  );
};
