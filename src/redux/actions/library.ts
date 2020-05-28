import { AllActions } from "redux/types/app";
import { Dispatch } from "redux";
import { AppState } from "redux/store/configureStore";
import { SearchSong } from "api/Search";
import { Song } from "types/Song";
import { actionShowToast, actionViewPlaylist } from "./app";
import { findIndex } from "lodash";
import { actionPlayPlaylist, playPlaylist } from "./player";

export const actionAddToPlaylist = (
  playlistIndex: number,
  songs: Song[],
  isMergeTo?: boolean
): AllActions => ({
  type: "ADD_TO_PLAYLIST",
  songs,
  playlistIndex,
  isMergeTo,
});

export const actionRemoveFromPlaylist = (
  playlistIndex: number,
  song: Song
): AllActions => ({
  type: "REMOVE_FROM_PLAYLIST",
  song,
  playlistIndex,
});

export const actionSavePlaylist = (
  songs: Song[],
  playlistIndex: number
): AllActions => ({
  type: "SAVE_PLAYLIST",
  songs,
  playlistIndex,
});

export const actionRenamePlaylist = (
  title: string,
  playlistIndex: number
): AllActions => ({
  type: "RENAME_PLAYLIST",
  title,
  playlistIndex,
});

export const actionDeletePlaylist = (playlistIndex: number): AllActions => ({
  type: "DELETE_PLAYLIST",
  playlistIndex,
});

export const actionNewPlaylist = (
  title: string,
  songs: Song[],
  isMergeTo?: boolean
): AllActions => ({
  type: "NEW_PLAYLIST",
  title,
  songs,
  isMergeTo,
});

export const actionLikeSong = (song: Song, isExist: boolean): AllActions => ({
  type: "LIKE_SONG",
  song,
  isExist,
});

export const addToPlaylist = (
  playlistIndex: number,
  songs: Song[],
  isMergeTo?: boolean
) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    if (!isMergeTo) {
      var songExist = findIndex(
        getState().library.playlists[playlistIndex].songs,
        (item) => item.id == songs[0]!.id
      );
      if (songExist > -1) {
        dispatch(actionShowToast("Song already exists in this playlist"));
      } else {
        dispatch(actionAddToPlaylist(playlistIndex, songs));
        dispatch(actionShowToast("Song added to playlist"));

        var playlist = {
          index: playlistIndex,
          data: getState().library.playlists[playlistIndex],
        };

        if (getState().player.playlist?.index === playlist.index) {
          dispatch(actionPlayPlaylist(playlist));
        }
      }
    } else {
      dispatch(actionAddToPlaylist(playlistIndex, songs));
      var playlist = {
        index: playlistIndex,
        data: getState().library.playlists[playlistIndex],
      };
      dispatch(actionPlayPlaylist(playlist));
      dispatch(actionShowToast("Songs merged to playlist"));
    }
  };
};

export const removeFromPlaylist = (playlistIndex: number, song: Song) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    if (getState().library.playlists[playlistIndex].songs.length === 1) {
      dispatch(actionDeletePlaylist(playlistIndex));
      dispatch(actionShowToast("Playlist deleted"));
      dispatch(actionViewPlaylist(undefined!));
    } else {
      dispatch(actionRemoveFromPlaylist(playlistIndex, song));
      dispatch(actionShowToast("Song removed from playlist"));
      dispatch(
        actionViewPlaylist(
          getState().library.playlists[playlistIndex],
          playlistIndex
        )
      );
    }
  };
};

export const savePlaylist = (songs: Song[], playlistIndex: number) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionSavePlaylist(songs, playlistIndex));
    var playlist = {
      index: playlistIndex,
      data: getState().library.playlists[playlistIndex],
    };
    if (getState().player.playlist?.index === playlist.index) {
      dispatch(actionPlayPlaylist(playlist));
    }
    dispatch(actionShowToast("Playlist saved"));
  };
};

export const renamePlaylist = (title: string, playlistIndex: number) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionRenamePlaylist(title, playlistIndex));
  };
};

export const deletePlaylist = (playlistIndex: number) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionDeletePlaylist(playlistIndex));
  };
};

export const newPlaylist = (
  title: string,
  songs: Song[],
  isMergeTo?: boolean
) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionNewPlaylist(title, songs));

    if (isMergeTo) {
      const newPlaylistIndex = getState().library.playlists.length - 1;
      const newPlaylist = {
        index: newPlaylistIndex,
        data: getState().library.playlists[newPlaylistIndex],
      };

      dispatch(actionPlayPlaylist(newPlaylist));
    }
    dispatch(actionShowToast("New Playlist created"));
  };
};

export const likeSong = (song: Song) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    var isExist =
      findIndex(getState().library.collection, (item) => item.id == song!.id) >
      -1;
    dispatch(actionLikeSong(song, isExist));

    dispatch(
      actionShowToast(
        !isExist ? "Added to Liked songs" : "Removed from Liked songs"
      )
    );
  };
};
