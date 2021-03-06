import { CategoryTitle } from "components/CategoryTitle/CategoryTitle";
import { Loading } from "components/Loading/Loading";
import Login from "components/Login/Login";
import SongGrid from "components/SongGrid/SongGrid";
import SongList from "components/SongList/SongList";
import { convertToSongGridItems } from "helpers/array";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { loadCollection, loadPlaylists } from "redux/actions/library";
import { addToNowPlaying } from "redux/actions/player";
import { AppState } from "redux/store/configureStore";
import { AppActionTypes } from "redux/types/app";
import { LoadingType } from "types/LoadingType";
import { OptionActionType } from "types/Option";
import { Playlist } from "types/Playlist";
import { Song } from "types/Song";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {}
interface StateProps {
  user?: {
    name: string;
    email: string;
    token: {
      google: string;
      musicbytes: string;
    };
  };
  playlists: Playlist[];
  collection: Song[];
  songPlaying?: Song;
  deviceInfo: {
    isLandscape: boolean;
    isTouch: boolean;
  };
}
interface DispatchProps {
  loadPlaylists: (playlists: Playlist[]) => any;
  loadCollection: (collection: Song[]) => any;
  addToNowPlaying: (song: Song) => any;
}

const Library: React.FC<Props> = ({
  user,
  playlists,
  collection,
  songPlaying,
  deviceInfo,
  loadPlaylists,
  loadCollection,
  addToNowPlaying,
}) => {
  const optionList: OptionActionType[] = [
    OptionActionType.ADD_TO_NOW_PLAYING,
    OptionActionType.ADD_TO_PLAYLIST,
    OptionActionType.LIKE_SONG,
  ];

  const [loadingPlaylist, setLoadingPlaylist] = useState(false);
  const [loadingCollection, setLoadingCollection] = useState(false);

  useEffect(() => {
    // if (user) {
    //   const loadLibraryData = async () => {
    //     await Promise.all([
    //       setTimeout(() => {
    //         // checkLoadCollection(user);
    //       }, 150),
    //       checkLoadPlaylist(user),
    //     ]);
    //   };
    //   loadLibraryData();
    // }
  }, [user]);

  return (
    <div className={`Library ${deviceInfo.isLandscape ? "desktop" : ""}`}>
      {user ? (
        <>
          <CategoryTitle text="Your Playlist" />

          <Loading
            show={loadingPlaylist}
            type={LoadingType.Moon}
            text="Fetching your playlist"
            once={true}
          />
          <SongGrid
            items={convertToSongGridItems(undefined, playlists)}
            optionList={optionList}
            textNodata="You don't have any playlist yet"
          />

          <CategoryTitle text="Liked Songs" />
          <Loading
            show={loadingCollection}
            type={LoadingType.Moon}
            text="Fetching your collection"
            once={true}
          />
          <SongList
            songs={collection}
            optionList={optionList}
            resetPlaylist={true}
            textNodata="You don't have any liked songs"
          />
          {songPlaying && !deviceInfo.isLandscape ? (
            <div className="miniPlayerPadding"></div>
          ) : null}
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    user: state.app.user,
    playlists: state.library.playlists,
    collection: state.library.collection,
    songPlaying: state.player.songs?.playing,
    deviceInfo: state.app.deviceInfo,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  loadPlaylists: bindActionCreators(loadPlaylists, dispatch),
  loadCollection: bindActionCreators(loadCollection, dispatch),
  addToNowPlaying: bindActionCreators(addToNowPlaying, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Library);
