import React, { useState } from "react";
import { Header } from "components/Header/Header";
import { Navbar } from "components/Navbar/Navbar";
import SearchBar from "components/SearchBar/SearchBar";
import SongList from "components/SongList/SongList";
import { Popup } from "components/Popup/Popup";
import { SearchSong } from "api/Search";
import { Song } from "types/Song";
import { useDispatch, useSelector, connect } from "react-redux";
import { AppState } from "redux/store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AllActions, AppActionTypes } from "redux/types/app";
import { searchSong } from "redux/actions/discover";
import { bindActionCreators } from "redux";
import { OptionItemData } from "types/Option";
import { addToNowPlaying } from "redux/actions/player";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {}
interface StateProps {
  query: string;
  songs: Song[];
}
interface DispatchProps {
  addToNowPlaying: (song: Song) => any;
}

interface DiscoverState {}

export const Discover: React.FC<Props> = ({
  query,
  songs,
  addToNowPlaying,
}: Props) => {
  const optionList: OptionItemData[] = [
    {
      index: 0,
      label: "Add to Now Playing",
      action: (item: Song) => {
        console.log("plaaaaa");
        console.log(item);
        addToNowPlaying(item);
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
