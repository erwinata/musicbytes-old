import PlaylistViewHeader from "components/PlaylistViewHeader/PlaylistViewHeader";
import SongList from "components/SongList/SongList";
import React from "react";
import { connect } from "react-redux";
import { animated, useSpring } from "react-spring";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { addToNowPlaying } from "redux/actions/player";
import { AppState } from "redux/store/configureStore";
import { AppActionTypes } from "redux/types/app";
import { OptionActionType } from "types/Option";
import { Playlist } from "types/Playlist";
import { Song } from "types/Song";
import "./PlaylistView.scss";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {}
interface StateProps {
  playlistViewing?: Playlist;
  collection: Song[];
  deviceInfo: {
    isLandscape: boolean;
    isTouch: boolean;
  };
}
interface DispatchProps {
  addToNowPlaying: (song: Song) => any;
}

const PlaylistView: React.FC<Props> = ({
  playlistViewing,
  collection,
  deviceInfo,
  addToNowPlaying,
}) => {
  const optionList: OptionActionType[] = [
    OptionActionType.ADD_TO_NOW_PLAYING,
    OptionActionType.ADD_TO_PLAYLIST,
    OptionActionType.LIKE_SONG,
    OptionActionType.REMOVE_FROM_PLAYLIST,
  ];

  const slide = useSpring({
    left: playlistViewing ? "0vw" : "100vw",
    opacity: playlistViewing ? 1 : 0,
  });

  if (playlistViewing === undefined) return null;
  return (
    <animated.div
      className={`PlaylistView ${deviceInfo.isLandscape ? "desktop" : ""}`}
      style={slide}
    >
      <div>
        <PlaylistViewHeader playlistViewing={playlistViewing} />

        <div className="songListWrapper">
          <SongList
            songs={playlistViewing!.songs}
            optionList={optionList}
            resetPlaylist={true}
          />
        </div>
      </div>
    </animated.div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    playlistViewing: state.app.playlistViewing,
    collection: state.library.collection,
    deviceInfo: state.app.deviceInfo,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  addToNowPlaying: bindActionCreators(addToNowPlaying, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistView);
