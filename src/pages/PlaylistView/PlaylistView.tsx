import React from "react";
import { Header } from "components/Header/Header";
import { CategoryTitle } from "components/CategoryTitle/CategoryTitle";
import SongGrid from "components/SongGrid/SongGrid";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActionTypes } from "redux/types/app";
import { AppState } from "redux/store/configureStore";
import SongList from "components/SongList/SongList";
import { Song } from "types/Song";
import { OptionAction, OptionActionType } from "types/Option";
import { addToNowPlaying, playSong } from "redux/actions/player";
import { Playlist } from "types/Playlist";
import "./PlaylistView.scss";
import { useSpring, animated } from "react-spring";
import PlaylistViewHeader from "components/PlaylistViewHeader/PlaylistViewHeader";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {}
interface StateProps {
  playlistViewing?: number;
  collection: Song[];
}
interface DispatchProps {
  addToNowPlaying: (song: Song) => any;
}

const PlaylistView: React.FC<Props> = ({
  playlistViewing,
  collection,
  addToNowPlaying,
}) => {
  const optionList: OptionActionType[] = [
    OptionActionType.ADD_TO_NOW_PLAYING,
    OptionActionType.ADD_TO_PLAYLIST,
    OptionActionType.LIKE_SONG,
  ];

  const slide = useSpring({
    left: playlistViewing ? "0vw" : "100vw",
    opacity: playlistViewing ? 1 : 0,
  });

  return (
    <animated.div className="PlaylistView" style={slide}>
      {playlistViewing !== undefined ? (
        <div>
          <PlaylistViewHeader />

          {/* <SongList
            songs={playlistViewing!.songs}
            optionList={optionList}
            resetPlaylist={true}
          /> */}
        </div>
      ) : null}
    </animated.div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    playlistViewing: state.app.playlistViewing,
    collection: state.library.collection,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  addToNowPlaying: bindActionCreators(addToNowPlaying, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistView);
