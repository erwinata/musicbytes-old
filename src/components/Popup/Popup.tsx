import React, { useState, useEffect } from "react";
import "./Popup.scss";
import PlaylistList from "components/PlaylistList/PlaylistList";
import PlaylistNaming from "components/PlaylistNaming/PlaylistNaming";
import { AppState } from "redux/store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActionTypes } from "redux/types/app";
import { connect } from "react-redux";
import { Song } from "types/Song";
import { animated, useSpring } from "react-spring";
import { useMeasure } from "react-use";
import { bindActionCreators } from "redux";
import { addingToPlaylist, showToast } from "redux/actions/app";
import { addToPlaylist, newPlaylist } from "redux/actions/library";
import { ToastType } from "types/ToastType";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {}
interface StateProps {
  songAdding?: Song;
}
interface DispatchProps {
  addingToPlaylist: (song: Song) => any;
  addToPlaylist: (song: Song, playlistIndex: number) => any;
  newPlaylist: (title: string, songs: Song[]) => any;
  showToast: (text: string, toastType?: ToastType) => any;
}

const Popup: React.FC<Props> = ({
  songAdding,
  addingToPlaylist,
  addToPlaylist,
  newPlaylist,
  showToast,
}) => {
  console.log(songAdding);

  const [viewNewPlaylist, setViewNewPlaylist] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const [ref, { height }] = useMeasure();

  const closePopup = () => {
    setViewNewPlaylist(false);
    addingToPlaylist(undefined!);
  };

  useEffect(() => {
    //Sets initial height
    setContentHeight(height);

    //Adds resize event listener
    // window.addEventListener("resize", setContentHeight(height));

    // Clean-up
    // return window.removeEventListener("resize", setContentHeight(height));
  }, [height]);

  const slide = useSpring({
    top: songAdding ? "0vh" : "100vh",
    // opacity: songAdding ? 1 : 0,
  });
  const overlayStyle = useSpring({
    opacity: songAdding ? 1 : 0,
  });
  const contentStyle = useSpring({
    height: `${contentHeight + 75}px`,
    opacity: songAdding ? 1 : 0,
    // left: !newPlaylist ? "0vw" : "-80vw",
  });
  const playlistListStyle = useSpring({
    // left: !newPlaylist ? "0vw" : "-100vw",
    display: !viewNewPlaylist ? "block" : "none",
    opacity: !viewNewPlaylist ? 1 : 0,
  });
  const playlistNamingStyle = useSpring({
    // left: newPlaylist ? "0vw" : "100vw",
    display: viewNewPlaylist ? "block" : "none",
    opacity: viewNewPlaylist ? 1 : 0,
  });

  const handleClickPlaylist = (playlistIndex: number) => {
    addToPlaylist(songAdding!, playlistIndex);
    closePopup();
  };

  const handleClickNewPlaylist = () => {
    setViewNewPlaylist(true);
  };

  const saveNewPlaylist = (title: string) => {
    newPlaylist(title, [songAdding!]);
    closePopup();
  };

  return (
    <div className="Popup" style={{ top: songAdding ? "0vh" : "100vh" }}>
      <animated.div
        className="BlackOverlay"
        style={overlayStyle}
        onClick={closePopup}
      ></animated.div>
      <animated.div className="container" style={contentStyle}>
        <h1>{newPlaylist ? "Create New Playlist" : "Add to Playlist"}</h1>
        <div className="content" ref={ref}>
          <PlaylistList
            playlistListStyle={playlistListStyle}
            onClickPlaylist={handleClickPlaylist}
            onClickNewPlaylist={handleClickNewPlaylist}
          />
          <PlaylistNaming
            playlistNamingStyle={playlistNamingStyle}
            saveNewPlaylist={saveNewPlaylist}
          />
        </div>
      </animated.div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    songAdding: state.app.songAdding,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  addingToPlaylist: bindActionCreators(addingToPlaylist, dispatch),
  addToPlaylist: bindActionCreators(addToPlaylist, dispatch),
  newPlaylist: bindActionCreators(newPlaylist, dispatch),
  showToast: bindActionCreators(showToast, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
