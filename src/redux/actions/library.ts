import { AllActions } from "redux/types/app";
import { Dispatch } from "redux";
import { AppState } from "redux/store/configureStore";
import { SearchSong } from "api/Search";
import { Song } from "types/Song";
import { actionShowToast } from "./app";
import { findIndex } from "lodash";
import { actionPlayPlaylist, playPlaylist } from "./player";

export const actionAddToPlaylist = (
  songs: Song[],
  playlistIndex: number
): AllActions => ({
  type: "ADD_TO_PLAYLIST",
  songs,
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

export const actionNewPlaylist = (
  title: string,
  songs: Song[]
): AllActions => ({
  type: "NEW_PLAYLIST",
  title,
  songs,
});

export const actionLikeSong = (song: Song, isExist: boolean): AllActions => ({
  type: "LIKE_SONG",
  song,
  isExist,
});

export const addToPlaylist = (songs: Song[], playlistIndex: number) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    if (songs.length == 1) {
      var songExist = findIndex(
        getState().library.playlists[playlistIndex].songs,
        (item) => item.id == songs[0]!.id
      );
      if (songExist > -1) {
        dispatch(actionShowToast("Song already exists in this playlist"));
      } else {
        dispatch(actionAddToPlaylist(songs, playlistIndex));
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
      dispatch(actionAddToPlaylist(songs, playlistIndex));
      var playlist = {
        index: playlistIndex,
        data: getState().library.playlists[playlistIndex],
      };
      dispatch(actionPlayPlaylist(playlist));
      dispatch(actionShowToast("Songs merged to playlist"));
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

export const newPlaylist = (title: string, songs: Song[]) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionNewPlaylist(title, songs));

    if (songs.length > 1) {
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
