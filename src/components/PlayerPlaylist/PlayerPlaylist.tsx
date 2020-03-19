import React from "react";
import "./PlayerPlaylist.scss";
import { SongList } from "components/SongList/SongList";
import { ButtonSave } from "components/Buttons/Buttons";

export const PlayerPlaylist = () => {
  return (
    <div className="PlayerPlaylist">
      <PlayerPlaylistHeader />
      <SongList />
    </div>
  );
};

const PlayerPlaylistHeader = () => {
  return (
    <div className="PlayerPlaylistHeader">
      <ButtonSave />
      <h1>Untitled Playlist</h1>
    </div>
  );
};
