import React from "react";
import "./PlayerPlaylist.scss";
import { SongList } from "components/SongList/SongList";
import { ButtonSave } from "components/Buttons/Buttons";
import { connect } from "react-redux";
import { AppState } from "redux/store/configureStore";
import { Song } from "types/Song";
import { Repeat } from "types/Repeat";
import { OptionItemData } from "types/Option";

interface Props {
  songPlaying: Song | null;
  songs: Song[];
  shuffle: boolean;
  repeat: Repeat;
}

const optionList: OptionItemData[] = [
  {
    index: 0,
    label: "Add to Now Playing",
    action: () => {
      console.log("add now playing");
    },
  },
  {
    index: 1,
    label: "Add to Playlist",
    action: () => {
      console.log("add playlist");
    },
  },
  {
    index: 2,
    label: "Like Songs",
    action: () => {
      console.log("like songs");
    },
  },
];

const PlayerPlaylist: React.FC<Props> = ({
  songPlaying,
  songs,
  shuffle,
  repeat,
}: Props) => {
  return (
    <div className="PlayerPlaylist">
      <PlayerPlaylistHeader />
      <SongList songs={songs} optionList={optionList} resetPlaylist={false} />
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

const mapStateToProps = (state: AppState) => {
  return {
    songPlaying: state.player.songPlaying,
    songs: state.player.songs,
    shuffle: state.player.shuffle,
    repeat: state.player.repeat,
  };
};

export default connect(mapStateToProps)(PlayerPlaylist);
