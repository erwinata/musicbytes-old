import React, { useEffect, useState } from "react";
import { Header } from "components/Header/Header";
import { CategoryTitle } from "components/CategoryTitle/CategoryTitle";
import SongGrid from "components/SongGrid/SongGrid";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActionTypes } from "redux/types/app";
import { AppState, store } from "redux/store/configureStore";
import SongList from "components/SongList/SongList";
import { Song } from "types/Song";
import { OptionAction, OptionActionType } from "types/Option";
import { addToNowPlaying } from "redux/actions/player";
import { Playlist } from "types/Playlist";
import Login from "components/Login/Login";
import axios from "axios";
import { SongDetail } from "api/SongDetail";
import { loadPlaylists } from "redux/actions/library";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Loading } from "components/Loading/Loading";
import { LoadingType } from "types/LoadingType";

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
}
interface DispatchProps {
  loadPlaylists: (playlists: Playlist[]) => any;
  addToNowPlaying: (song: Song) => any;
}

const Library: React.FC<Props> = ({
  user,
  playlists,
  collection,
  songPlaying,
  loadPlaylists,
  addToNowPlaying,
}) => {
  const optionList: OptionActionType[] = [
    OptionActionType.ADD_TO_NOW_PLAYING,
    OptionActionType.ADD_TO_PLAYLIST,
    OptionActionType.LIKE_SONG,
  ];

  const [libraryState, setLibraryState] = useState({
    loadingPlaylist: false,
  });

  useEffect(() => {
    if (user && playlists.length == 0) {
      setLibraryState({
        ...libraryState,
        loadingPlaylist: true,
      });

      axios
        .get(
          `${store.getState().app.apiBaseURL}api/v1/playlist?token=${
            user.token.musicbytes
          }`
        )
        .then(
          async (response: any) => {
            const playlistsRaw = response.data.playlists;

            async function getSongsData(item: any) {
              let playlistsNewItem = {
                title: item.title,
                songs: await SongDetail(item.song),
                createdAt: 0,
                updatedAt: 0,
              };
              return playlistsNewItem;
            }
            const playlistsNew = await Promise.all<Playlist>(
              playlistsRaw.map(getSongsData)
            );

            loadPlaylists(playlistsNew);
            setLibraryState({
              ...libraryState,
              loadingPlaylist: false,
            });

            console.log(playlistsNew);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      setLibraryState({
        ...libraryState,
        loadingPlaylist: false,
      });
    }
  }, [user]);

  return (
    <div className="Library">
      {user ? (
        <>
          <CategoryTitle text="Your Playlist" />

          <Loading
            show={libraryState.loadingPlaylist}
            type={LoadingType.Moon}
            text="Fetching your playlist"
          />
          <SongGrid playlists={playlists} />

          <CategoryTitle text="Liked Songs" />
          <SongList
            songs={collection}
            optionList={optionList}
            resetPlaylist={true}
            miniPlayerShown={songPlaying ? true : false}
          />
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
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  loadPlaylists: bindActionCreators(loadPlaylists, dispatch),
  addToNowPlaying: bindActionCreators(addToNowPlaying, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Library);
