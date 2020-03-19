import React, { useState } from "react";
import { Header } from "components/Header/Header";
import { Navbar } from "components/Navbar/Navbar";
import { MiniPlayer } from "components/MiniPlayer/MiniPlayer";
import SearchBar from "components/SearchBar/SearchBar";
import { SongList } from "components/SongList/SongList";
import { Tooltip } from "components/Tooltip/Tooltip";
import { Popup } from "components/Popup/Popup";
import { SearchSong } from "api/Search";
import { Song } from "types/Song";
import { useDispatch, useSelector, connect } from "react-redux";
import { AppState } from "store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "types/actions";
import { startSearchSong } from "actions/discover";
import { bindActionCreators } from "redux";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {}
interface StateProps {
  query: string;
  songs: Song[];
}
interface DispatchProps {
  // startSearchSong: (query: string) => any;
}

interface DiscoverState {}

export const Discover: React.FC<Props> = ({ query, songs }: Props) => {
  console.log(query);

  return (
    <div className="Discover">
      <Header />
      <Navbar />

      <SearchBar />
      <SongList songs={songs} />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    query: state.discover.query,
    songs: state.discover.songs
  };
};

// const mapDispatchToProps = (
//   dispatch: ThunkDispatch<any, any, AppActions>,
//   ownProps: DiscoverProps
// ) => ({
//   startSearchSong: bindActionCreators(startSearchSong, dispatch)
// });

export default connect(mapStateToProps)(Discover);
