import React from "react";
import { Header } from "components/Header/Header";
import { CategoryTitle } from "components/CategoryTitle/CategoryTitle";
import SongGrid from "components/SongGrid/SongGrid";
import { Navbar } from "components/Navbar/Navbar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActionTypes } from "redux/types/app";
import { AppState } from "redux/store/configureStore";
import SongList from "components/SongList/SongList";
import { Song } from "types/Song";
import { OptionItemData } from "types/Option";
import { addToNowPlaying } from "redux/actions/player";
import { Playlist } from "types/Playlist";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {}
interface StateProps {
  playlists: Playlist[];
  collection: Song[];
}
interface DispatchProps {
  addToNowPlaying: (song: Song) => any;
}

const Library: React.FC<Props> = ({
  playlists,
  collection,
  addToNowPlaying,
}) => {
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
    <div className="Library">
      <Header />

      {/* <h1>Library</h1>

      <PlaylistList/> */}

      <CategoryTitle text="Your Playlist" />
      <SongGrid playlists={playlists} />

      <CategoryTitle text="Liked Songs" />
      <SongList
        songs={collection}
        optionList={optionList}
        resetPlaylist={true}
      />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    playlists: state.library.playlists,
    collection: state.library.collection,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  addToNowPlaying: bindActionCreators(addToNowPlaying, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Library);
