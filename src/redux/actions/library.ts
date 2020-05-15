import { AllActions } from "redux/types/app";
import { Dispatch } from "redux";
import { AppState } from "redux/store/configureStore";
import { SearchSong } from "api/Search";
import { Song } from "types/Song";
import { actionShowToast } from "./app";
import { findIndex } from "lodash";

export const actionAddToPlaylist = (
  song: Song,
  playlistIndex: number
): AllActions => ({
  type: "ADD_TO_PLAYLIST",
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

export const addToPlaylist = (song: Song, playlistIndex: number) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    console.log();
    var a = findIndex(
      getState().library.playlists[playlistIndex].songs,
      (item) => item.id == song!.id
    );
    console.log(a);
    if (a > -1) {
      dispatch(actionShowToast("Song already exists in this playlist"));
    } else {
      dispatch(actionAddToPlaylist(song, playlistIndex));
      dispatch(actionShowToast("Song added to playlist"));
    }
  };
};

export const savePlaylist = (songs: Song[], playlistIndex: number) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionSavePlaylist(songs, playlistIndex));
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
