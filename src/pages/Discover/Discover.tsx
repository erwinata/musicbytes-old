import React, { useState } from "react";
import { Header } from "components/Header/Header";
import SearchBar from "components/SearchBar/SearchBar";
import SongList from "components/SongList/SongList";
import { SearchSong } from "api/Search";
import { Song } from "types/Song";
import { useDispatch, useSelector, connect } from "react-redux";
import { AppState } from "redux/store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AllActions, AppActionTypes } from "redux/types/app";
import { searchSong } from "redux/actions/discover";
import { bindActionCreators } from "redux";
import { OptionAction, OptionActionType } from "types/Option";
import { addToNowPlaying } from "redux/actions/player";
import { setPopupMenu } from "redux/actions/app";
import { likeSong } from "redux/actions/library";
import { PopupMenuType } from "types/PopupMenuType";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {}
interface StateProps {
  query: string;
  songs: Song[];
}
interface DispatchProps {
  addToNowPlaying: (song: Song) => any;
  setPopupMenu: (menuState: PopupMenuType, songAdding?: Song) => any;
  likeSong: (song: Song) => any;
}

interface DiscoverState {}

export const Discover: React.FC<Props> = ({
  query,
  songs,
  addToNowPlaying,
  setPopupMenu,
  likeSong,
}: Props) => {
  const optionList: OptionActionType[] = [
    OptionActionType.ADD_TO_NOW_PLAYING,
    OptionActionType.ADD_TO_PLAYLIST,
    OptionActionType.LIKE_SONG,
  ];

  return (
    <div className="Discover">
      <Header />

      <SearchBar />
      <SongList songs={songs} optionList={optionList} resetPlaylist={true} />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    query: state.discover.query,
    songs: state.discover.songs,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  addToNowPlaying: bindActionCreators(addToNowPlaying, dispatch),
  setPopupMenu: bindActionCreators(setPopupMenu, dispatch),
  likeSong: bindActionCreators(likeSong, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
