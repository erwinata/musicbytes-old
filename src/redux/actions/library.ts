import { AllActions } from "redux/types/app";
import { Dispatch } from "redux";
import { AppState, store } from "redux/store/configureStore";
import { SearchSong } from "api/Search";
import { Song } from "types/Song";
import { actionShowToast, actionViewPlaylist } from "./app";
import { find, findIndex } from "lodash";
import { actionPlayPlaylist, playPlaylist } from "./player";
import { Playlist } from "types/Playlist";
import axios from "axios";
import { UserData } from "types/UserData";
import { axiosIntercept } from "api/Connection";

export const actionClearAllLibrary = (): AllActions => ({
  type: "CLEAR_ALL_LIBRARY",
});
export const actionLoadPlaylists = (playlists: Playlist[]): AllActions => ({
  type: "LOAD_PLAYLISTS",
  playlists,
});
export const actionLoadCollection = (collection: Song[]): AllActions => ({
  type: "LOAD_COLLECTION",
  collection,
});

export const actionAddToPlaylist = (
  playlist: Playlist,
  songs: Song[],
  isMergeTo?: boolean
): AllActions => ({
  type: "ADD_TO_PLAYLIST",
  playlist,
  songs,
  isMergeTo,
});

export const actionRemoveFromPlaylist = (
  playlist: Playlist,
  song: Song
): AllActions => ({
  type: "REMOVE_FROM_PLAYLIST",
  playlist,
  song,
});

export const actionSavePlaylist = (
  playlist: Playlist,
  songs: Song[]
): AllActions => ({
  type: "SAVE_PLAYLIST",
  playlist,
  songs,
});

export const actionRenamePlaylist = (
  playlist: Playlist,
  title: string
): AllActions => ({
  type: "RENAME_PLAYLIST",
  playlist,
  title,
});

export const actionDeletePlaylist = (playlist: Playlist): AllActions => ({
  type: "DELETE_PLAYLIST",
  playlist,
});

export const actionNewPlaylist = (
  playlist: Playlist,
  isMergeTo?: boolean
): AllActions => ({
  type: "NEW_PLAYLIST",
  playlist,
  isMergeTo,
});

export const actionLikeSong = (song: Song, isExist: boolean): AllActions => ({
  type: "LIKE_SONG",
  song,
  isExist,
});

// ACTION SEPARATOR
// ACTION SEPARATOR
// ACTION SEPARATOR

const checkUserLogin = (dispatch: Dispatch<AllActions>, user?: UserData) => {
  if (!user) {
    dispatch(actionShowToast("Please login to use this feature"));
    return false;
  }
  return true;
};

// ACTION SEPARATOR
// ACTION SEPARATOR
// ACTION SEPARATOR

export const clearAllLibrary = () => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionClearAllLibrary());
  };
};

export const loadPlaylists = (playlists: Playlist[]) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionLoadPlaylists(playlists));
  };
};

export const loadCollection = (collection: Song[]) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionLoadCollection(collection));
  };
};

export const addToPlaylist = (
  playlist: Playlist,
  songs: Song[],
  isMergeTo?: boolean
) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    const user = getState().app.user!;
    if (!checkUserLogin(dispatch, user)) {
      return false;
    }

    if (!isMergeTo) {
      var songExist = findIndex(
        playlist!.songs,
        (item) => item.id == songs[0]!.id
      );
      if (songExist > -1) {
        dispatch(actionShowToast("Song already exists in this playlist"));
      } else {
        await axios.patch(
          getState().app.apiBaseURL +
            "v1/playlist/" +
            playlist!.id +
            "?token=" +
            user.token.musicbytes,
          {
            item: songs[0].id,
          }
        );

        dispatch(actionAddToPlaylist(playlist, songs));
        dispatch(actionShowToast("Song added to playlist"));

        let playlistNew = find(getState().library.playlists, {
          id: playlist.id,
        });

        if (getState().player.playlist?.id === playlistNew?.id) {
          dispatch(actionPlayPlaylist(playlist));
        }
      }
    } else {
      let songIds = "";
      songs.map((item, index) => {
        songIds += item.id;
        if (index < songs.length - 1) songIds += ",";
      });

      await axiosIntercept().patch(
        getState().app.apiBaseURL + "v1/playlist/" + playlist!.id,
        {
          item: songIds,
        }
      );

      dispatch(actionAddToPlaylist(playlist, songs));

      let playlistNew = find(getState().library.playlists, {
        id: playlist!.id,
      });

      dispatch(actionPlayPlaylist(playlistNew!));
      dispatch(actionShowToast("Songs merged to playlist"));
    }
  };
};

export const removeFromPlaylist = (playlist: Playlist, song: Song) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    const user = getState().app.user!;
    if (!checkUserLogin(dispatch, user)) {
      return false;
    }

    if (playlist.songs.length === 1) {
      await axios.delete(
        getState().app.apiBaseURL +
          "v1/playlist/" +
          playlist!.id +
          "?token=" +
          user.token.musicbytes
      );

      dispatch(actionDeletePlaylist(playlist));
      dispatch(actionShowToast("Playlist deleted"));
      dispatch(actionViewPlaylist(undefined!));
    } else {
      await axiosIntercept().patch(
        getState().app.apiBaseURL + "v1/playlist/" + playlist!.id,
        {
          item: song.id,
        }
      );

      dispatch(actionRemoveFromPlaylist(playlist, song));
      dispatch(actionShowToast("Song removed from playlist"));
      let playlistNew = find(getState().library.playlists, {
        id: playlist!.id,
      });
      dispatch(actionViewPlaylist(playlistNew!));
    }
  };
};

export const savePlaylist = (playlist: Playlist, songs: Song[]) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    const user = getState().app.user!;
    if (!checkUserLogin(dispatch, user)) {
      return false;
    }

    await axiosIntercept().patch(
      getState().app.apiBaseURL + "v1/playlist/" + playlist!.id,
      {
        song: songs,
      }
    );

    dispatch(actionSavePlaylist(playlist, songs));
    var playlistNew = getState().library.playlists[playlist.id];

    if (getState().player.playlist?.id === playlist.id) {
      dispatch(actionPlayPlaylist(playlistNew));
    }
    dispatch(actionShowToast("Playlist saved"));
  };
};

export const renamePlaylist = (playlist: Playlist, title: string) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    const user = getState().app.user!;
    if (!checkUserLogin(dispatch, user)) {
      return false;
    }

    await axiosIntercept().patch(
      getState().app.apiBaseURL + "v1/playlist/" + playlist!.id,
      {
        title: title,
      }
    );

    dispatch(actionRenamePlaylist(playlist, title));
  };
};

export const deletePlaylist = (playlist: Playlist) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    const user = getState().app.user!;
    if (!checkUserLogin(dispatch, user)) {
      return false;
    }

    await axiosIntercept().delete(
      getState().app.apiBaseURL + "v1/playlist/" + playlist!.id
    );

    dispatch(actionDeletePlaylist(playlist));
  };
};

export const newPlaylist = (
  title: string,
  songs: Song[],
  isMergeTo?: boolean
) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    const user = getState().app.user!;
    if (!checkUserLogin(dispatch, user)) {
      return false;
    }

    let songIds = "";
    songs.map((item, index) => {
      songIds += item.id;
      if (index < songs.length - 1) songIds += ",";
    });

    const response = await axiosIntercept().post(
      getState().app.apiBaseURL + "v1/playlist",
      {
        title: title,
        song: songIds,
      }
    );

    const playlist: Playlist = {
      id: response.data.id,
      title: title,
      songs: songs,
      createdAt: response.data.created_at,
      updatedAt: response.data.updated_at,
    };

    dispatch(actionNewPlaylist(playlist));

    if (isMergeTo) {
      const newPlaylistIndex = getState().library.playlists.length - 1;
      const newPlaylist = getState().library.playlists[newPlaylistIndex];

      dispatch(actionPlayPlaylist(newPlaylist));
    }
    dispatch(actionShowToast("New Playlist created"));
  };
};

export const likeSong = (song: Song) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    const user = getState().app.user!;
    if (!checkUserLogin(dispatch, user)) {
      return false;
    }

    var isExist =
      findIndex(getState().library.collection, (item) => item.id == song!.id) >
      -1;

    await axiosIntercept().post(
      getState().app.apiBaseURL + "v1/userdata/collection",
      {
        item: song!.id,
      }
    );

    dispatch(actionLikeSong(song, isExist));

    dispatch(
      actionShowToast(
        !isExist ? "Added to Liked songs" : "Removed from Liked songs"
      )
    );
  };
};
