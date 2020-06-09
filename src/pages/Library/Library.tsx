import React, { useEffect, useState } from "react";
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
import { loadPlaylists, loadCollection } from "redux/actions/library";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Loading } from "components/Loading/Loading";
import { LoadingType } from "types/LoadingType";
import { UserData } from "types/UserData";
import { convertToSongGridItems } from "helpers/array";
import { axiosIntercept } from "api/Connection";

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
  isDesktop: boolean;
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
  isDesktop,
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

  const checkLoadPlaylist = (userData: UserData) => {
    if (playlists.length == 0) {
      setLoadingPlaylist(true);

      axiosIntercept()
        .get(`${store.getState().app.apiBaseURL}v1/playlist`)
        .then(
          async (response: any) => {
            const playlistsRaw = response.data.playlists;

            async function getSongsData(item: any) {
              let playlistsNewItem = {
                id: item.id,
                title: item.title,
                songs: await SongDetail(item.song),
                createdAt: item.created_at,
                updatedAt: item.updated_at,
              };
              return playlistsNewItem;
            }
            const playlistsNew = await Promise.all<Playlist>(
              playlistsRaw.map(getSongsData)
            );

            loadPlaylists(playlistsNew);
            setLoadingPlaylist(false);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  const checkLoadCollection = (userData: UserData) => {
    if (collection.length == 0) {
      setLoadingCollection(true);
      axiosIntercept()
        .get(`${store.getState().app.apiBaseURL}v1/collection`)
        .then(
          async (response: any) => {
            const collectionRaw = response.data.collection;

            const collectionNew = await new Promise<Song[]>(
              (resolve, reject) => {
                resolve(SongDetail(collectionRaw));
              }
            );

            loadCollection(collectionNew);
            setLoadingCollection(false);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  useEffect(() => {
    if (user) {
      const asd = async () => {
        await Promise.all([
          setTimeout(() => {
            checkLoadCollection(user);
          }, 150),
          checkLoadPlaylist(user),
        ]);
        // await Promise.all([checkLoadPlaylist(user)]);
      };
      asd();
    }
  }, [user]);

  return (
    <div className={`Library ${isDesktop ? "desktop" : ""}`}>
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
    isDekstop: state.app.isDesktop,
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
