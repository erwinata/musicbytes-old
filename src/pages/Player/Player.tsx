import React from "react";
import { Navbar } from "components/Navbar/Navbar";
import PlayerThumbnail from "components/PlayerThumbnail/PlayerThumbnail";
import { PlayerControl } from "components/PlayerControl/PlayerControl";
import { PlayerPlaylist } from "components/PlayerPlaylist/PlayerPlaylist";

export const Player = () => {
  return (
    <div className="Player">
      <PlayerThumbnail />
      <PlayerControl />
      <PlayerPlaylist />

      <Navbar />
    </div>
  );
};
