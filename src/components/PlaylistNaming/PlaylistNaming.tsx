import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { animated } from "react-spring";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "redux/store/configureStore";
import { AppActionTypes } from "redux/types/app";
import "./PlaylistNaming.scss";

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
    textInput.current!.value = "";
  };

  const handleChange = (e: any) => {
    setPlaylistTitle(e.target.value);
  };

  var textInput: React.RefObject<HTMLInputElement> = React.createRef();

  useEffect(() => {
    textInput.current!.focus();
  }, [saveNewPlaylist]);

  return (
    <animated.div className="PlaylistNaming" style={playlistNamingStyle}>
      <h2>Playlist Name</h2>
      <input
        type="text"
        defaultValue={playlistTitle}
        onChange={handleChange}
        ref={textInput}
      />
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
