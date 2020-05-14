import React, { useState } from "react";
import "./PlaylistNaming.scss";
import { animated, useSpring } from "react-spring";
import { AppState } from "redux/store/configureStore";
import { AppActionTypes } from "redux/types/app";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {
  playlistNamingStyle: any;
  saveNewPlaylist: (title: string) => any;
}
interface StateProps {
  // songAdding?: Song;
}
interface DispatchProps {
  // playPlaylist: (playlist: Playlist) => any;
}
const PlaylistNaming: React.FC<Props> = ({
  playlistNamingStyle,
  saveNewPlaylist,
}) => {
  const [playlistTitle, setPlaylistTitle] = useState("");

  const handleSaveNewPlaylist = () => {
    saveNewPlaylist(playlistTitle);
  };

  const handleChange = (e: any) => {
    setPlaylistTitle(e.target.value);
  };

  return (
    <animated.div className="PlaylistNaming" style={playlistNamingStyle}>
      <h2>Playlist Name</h2>
      <input type="text" defaultValue={playlistTitle} onChange={handleChange} />
      <button onClick={handleSaveNewPlaylist}>Save Playlist</button>
    </animated.div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    // songAdding: state.app.songAdding,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  // playPlaylist: bindActionCreators(playPlaylist, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistNaming);
