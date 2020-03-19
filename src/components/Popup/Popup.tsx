import React from "react";
import "./Popup.scss";
import { PlaylistList } from "components/PlaylistList/PlaylistList";
import { PlaylistNaming } from "components/PlaylistNaming/PlaylistNaming";

// interface TooltipDataType {
//   index: number;
//   label: string;
// }

// const tooltipList: TooltipDataType[] = [
//   {
//     index: 1,
//     label: "Add to Now Playing"
//   },
//   {
//     index: 2,
//     label: "Add to Playlist"
//   },
//   {
//     index: 3,
//     label: "Like Songs"
//   }
// ];

export const Popup = () => {
  return (
    <div className="Popup">
      <BlackOverlay />
      <div className="container">
        <h1>Add to Playlist</h1>
        <div className="content">
          {/* <PlaylistList /> */}
          <PlaylistNaming />
        </div>
      </div>
    </div>
  );
};

export const BlackOverlay = () => {
  return <div className="BlackOverlay"></div>;
};
