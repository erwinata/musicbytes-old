import { AllActions } from "redux/types/app";
import { Dispatch } from "redux";
import { AppState } from "redux/store/configureStore";
import { Song } from "types/Song";
import { NavigationTab } from "types/Navigation";
import { Playlist } from "types/Playlist";
import { ToastType } from "types/ToastType";

export const actionChangeTab = (to: NavigationTab): AllActions => ({
  type: "CHANGE_TAB",
  to,
});
export const actionShowToast = (
  text: string,
  toastType: ToastType = ToastType.NORMAL
): AllActions => ({
  type: "SHOW_TOAST",
  text,
  toastType,
});
export const actionViewPlaylist = (playlistViewing: Playlist): AllActions => ({
  type: "VIEW_PLAYLIST",
  playlistViewing,
});
export const actionAddingToPlaylist = (songAdding: Song): AllActions => ({
  type: "ADDING_TO_PLAYLIST",
  songAdding,
});

export const changeTab = (to: NavigationTab) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionChangeTab(to));
  };
};
export const showToast = (
  text: string,
  toastType: ToastType = ToastType.NORMAL
) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionShowToast(text, toastType));
  };
};
export const viewPlaylist = (playlistViewing: Playlist) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionViewPlaylist(playlistViewing));
  };
};
export const addingToPlaylist = (songAdding: Song) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionAddingToPlaylist(songAdding));
  };
};
