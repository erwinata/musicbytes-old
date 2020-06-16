import { concat, find, remove } from "lodash";
import { bindActionCreators } from "redux";
import { loadCollection, loadPlaylists } from "redux/actions/library";
import { store } from "redux/store/configureStore";
import { Playlist } from "types/Playlist";
import { Song } from "types/Song";
import { UserData } from "types/UserData";
import { axiosIntercept } from "./Connection";
import { SongDetail } from "./SongDetail";

export const checkLoadPlaylist = (userData: UserData) => {
  const state = store.getState();
  const dispatch = store.dispatch;

  if (state.library.playlists.length == 0) {
    // setLoadingPlaylist(true);

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

          bindActionCreators(loadPlaylists, dispatch)(playlistsNew);

          // loadPlaylists(playlistsNew);
          // setLoadingPlaylist(false);
        },
        (error) => {
          console.log(error);
        }
      );
  }
};

export const checkLoadCollection = (userData: UserData) => {
  const state = store.getState();
  const dispatch = store.dispatch;

  if (state.library.collection.length == 0) {
    // setLoadingCollection(true);
    axiosIntercept()
      .get(`${store.getState().app.apiBaseURL}v1/userdata/collection`)
      .then(
        async (response: any) => {
          const collectionRaw = response.data.collection;

          if (collectionRaw !== "") {
            const collectionNew = await new Promise<Song[]>(
              (resolve, reject) => {
                resolve(SongDetail(collectionRaw));
              }
            );
            bindActionCreators(loadCollection, dispatch)(collectionNew);
          }
          // setLoadingCollection(false);
        },
        (error) => {
          console.log(error);
        }
      );
  }
};

export const checkLoadSongPlayed = async (merge?: boolean) => {
  const state = store.getState();
  const dispatch = store.dispatch;

  axiosIntercept()
    .get(`${store.getState().app.apiBaseURL}v1/userdata/songplayed`)
    .then(
      async (response: any) => {
        if (response.data.song_played !== "") {
          let songPlayedDB = JSON.parse(response.data.song_played);

          if (merge) {
            if (localStorage.getItem("song_played")) {
              let songPlayedOld = JSON.parse(
                localStorage.getItem("song_played")!
              );
              songPlayedOld.map((songPlayedOldItem: any) => {
                let songPlayedDBItem: any = find(songPlayedDB, {
                  song: songPlayedOldItem.song,
                });
                if (songPlayedDBItem) {
                  songPlayedDBItem.total += songPlayedOldItem.total;
                }
                remove(songPlayedOld, { song: songPlayedOldItem.song });
              });
              console.log("songPlayedOld");
              console.log(songPlayedOld);
              songPlayedDB = concat(songPlayedDB, songPlayedOld);
            }
          }

          localStorage.setItem("song_played", JSON.stringify(songPlayedDB));
        }
      },
      (error) => {
        console.log(error);
      }
    );
};
