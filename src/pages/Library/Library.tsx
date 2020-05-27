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
import { addToNowPlaying } from "redux/actions/player";
import { Playlist } from "types/Playlist";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {}
interface StateProps {
  playlists: Playlist[];
  collection: Song[];
  songPlaying?: Song;
}
interface DispatchProps {
  addToNowPlaying: (song: Song) => any;
}

const Library: React.FC<Props> = ({
  playlists,
  collection,
  songPlaying,
  addToNowPlaying,
}) => {
  const optionList: OptionActionType[] = [
    OptionActionType.ADD_TO_NOW_PLAYING,
    OptionActionType.ADD_TO_PLAYLIST,
    OptionActionType.LIKE_SONG,
  ];

  return (
    <div className="Library">
      <CategoryTitle text="Your Playlist" />
      <SongGrid playlists={playlists} />

      <CategoryTitle text="Liked Songs" />
      <SongList
        songs={collection}
        optionList={optionList}
        resetPlaylist={true}
        miniPlayerShown={songPlaying ? true : false}
      />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    playlists: state.library.playlists,
    collection: state.library.collection,
    songPlaying: state.player.songs?.playing,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  addToNowPlaying: bindActionCreators(addToNowPlaying, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Library);
