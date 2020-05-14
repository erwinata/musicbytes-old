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

export const actionLikeSong = (song: Song, like: boolean): AllActions => ({
  type: "LIKE_SONG",
  song,
  like,
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

export const likeSong = (song: Song, like: boolean) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionLikeSong(song, like));
    dispatch(actionShowToast("Added to Liked songs"));
  };
};
