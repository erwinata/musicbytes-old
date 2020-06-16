import { axiosIntercept } from "api/Connection";
import { find, findIndex, remove } from "lodash";
import { bindActionCreators, Dispatch } from "redux";
import { AppState } from "redux/store/configureStore";
import { AllActions } from "redux/types/app";
import { Playlist } from "types/Playlist";
import { PlayState } from "types/PlayState";
import { Song } from "types/Song";
import { actionShowToast } from "./app";
import { actionSetRecent } from "./listen";

export const actionShowPlayer = (show: boolean): AllActions => ({
  type: "SHOW_PLAYER",
  show,
});
export const actionPlaySong = (
  song: Song,
  resetPlaylist: boolean
): AllActions => ({
  type: "PLAY_SONG",
  song,
  resetPlaylist,
});
export const actionPlayPlaylist = (playlist: Playlist): AllActions => ({
  type: "PLAY_PLAYLIST",
  playlist,
});
export const actionClearPlaylist = (): AllActions => ({
  type: "CLEAR_PLAYLIST",
});
export const actionClearPlayer = (): AllActions => ({
  type: "CLEAR_PLAYER",
});
export const actionDurationIncrement = (): AllActions => ({
  type: "DURATION_INCREMENT",
});
export const actionTogglePlaying = (state?: PlayState): AllActions => ({
  type: "TOGGLE_PLAYING",
  state,
});
export const actionSetVideoIsRunning = (
  videoIsRunning?: boolean
): AllActions => ({
  type: "SET_VIDEO_IS_RUNNING",
  videoIsRunning,
});

export const actionAutoNextSong = (): AllActions => ({
  type: "AUTO_NEXT_SONG",
});
export const actionNextSong = (): AllActions => ({
  type: "NEXT_SONG",
});
export const actionPrevSong = (): AllActions => ({
  type: "PREV_SONG",
});

export const actionRemoveSong = (song: Song): AllActions => ({
  type: "REMOVE_SONG",
  song,
});

export const actionToggleShuffle = (): AllActions => ({
  type: "TOGGLE_SHUFFLE",
});
export const actionToggleRepeat = (): AllActions => ({
  type: "TOGGLE_REPEAT",
});

export const actionSeekTo = (to: number): AllActions => ({
  type: "SEEK_TO",
  to,
});
export const actionSeekDone = (): AllActions => ({
  type: "SEEK_DONE",
});
export const actionAddToNowPlaying = (song: Song): AllActions => ({
  type: "ADD_TO_NOW_PLAYING",
  song,
});
export const actionRemoveFromNowPlaying = (song: Song): AllActions => ({
  type: "REMOVE_FROM_NOW_PLAYING",
  song,
});

export const showPlayer = (show: boolean) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionShowPlayer(show));
  };
};

export const playSong = (song: Song, resetPlaylist: boolean) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    let cachedSongPlayed: { song: string; total: number }[] = [];
    let existsSongPlayed = false;
    if (localStorage.getItem("song_played")) {
      cachedSongPlayed = JSON.parse(localStorage.getItem("song_played")!);
      let songCached = find(cachedSongPlayed, { song: song.id });

      if (songCached) {
        existsSongPlayed = true;
        songCached = { ...songCached, total: songCached.total++ };
      }

      if (localStorage.getItem("scheduler")) {
        let scheduler = JSON.parse(localStorage.getItem("scheduler")!);
        console.log(
          Date.now() +
            "  " +
            scheduler.syncSongPlayed +
            " " +
            (Date.now() - scheduler.syncSongPlayed)
        );
        if (parseInt(scheduler.syncSongPlayed) >= Date.now()) {
          console.log("SYNC SONG PLAYED");
          axiosIntercept().post(
            `${getState().app.apiBaseURL}v1/userdata/songplayed`,
            {
              song_played: localStorage.getItem("song_played"),
            }
          );
        }
      }
    }
    if (!existsSongPlayed) cachedSongPlayed.push({ song: song.id, total: 1 });
    localStorage.setItem("song_played", JSON.stringify(cachedSongPlayed));

    let cachedHistory: { song?: Song; playlist?: Playlist }[] = [];
    let existsHistory = false;
    if (localStorage.getItem("history")) {
      cachedHistory = JSON.parse(localStorage.getItem("history")!);
      existsHistory = find(cachedHistory, { song: song }) ? true : false;
    }
    if (existsHistory) {
      remove(cachedHistory, { song: song });
      cachedHistory.unshift({ song: song });
    } else {
      cachedHistory.unshift({ song: song });
      if (cachedHistory.length > 10) {
        cachedHistory.pop();
      }
    }
    localStorage.setItem("history", JSON.stringify(cachedHistory));
    dispatch(actionSetRecent(cachedHistory));

    if (resetPlaylist) {
      dispatch(actionClearPlayer());
    }
    dispatch(actionPlaySong(song, resetPlaylist));
    dispatch(actionTogglePlaying(PlayState.PLAYING));
    dispatch(actionShowPlayer(true));
  };
};

export const playPlaylist = (playlist: Playlist) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    const songs = playlist.songs;

    dispatch(actionClearPlayer());

    songs.forEach((song) => {
      dispatch(actionAddToNowPlaying(song));
    });

    let cachedHistory: { song?: Song; playlist?: Playlist }[] = [];
    let existsHistory = false;
    if (localStorage.getItem("history")) {
      cachedHistory = JSON.parse(localStorage.getItem("history")!);
      existsHistory = find(cachedHistory, { playlist: playlist })
        ? true
        : false;
    }
    if (existsHistory) {
      remove(cachedHistory, { playlist: playlist });
      cachedHistory.unshift({ playlist: playlist });
    } else {
      cachedHistory.unshift({ playlist: playlist });
      if (cachedHistory.length > 10) {
        cachedHistory.pop();
      }
    }
    localStorage.setItem("history", JSON.stringify(cachedHistory));
    dispatch(actionSetRecent(cachedHistory));

    // dispatch(actionSetRecent({ playlist: playlist }));

    dispatch(actionPlayPlaylist(playlist));
    dispatch(actionPlaySong(songs[0], false));
    dispatch(actionSeekTo(0));
    dispatch(actionShowPlayer(true));
  };
};

export const clearPlaylist = () => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionClearPlaylist());
  };
};

export const clearPlayer = () => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionClearPlayer());
  };
};

export const addToNowPlaying = (song: Song) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    let songExist = findIndex(
      getState().player.songs?.list,
      (item) => item.id == song.id
    );
    let songlistEmpty = !getState().player.songs;
    if (songExist > -1) {
      dispatch(actionShowToast("Song already exists in player"));
    } else {
      dispatch(actionAddToNowPlaying(song));
      if (songlistEmpty) {
        bindActionCreators(playSong, dispatch)(song, false);
      }
      dispatch(actionShowToast("Songs added to Now Playing"));
    }
  };
};

export const removeFromNowPlaying = (song: Song) => {
  return async (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    // if (getState().player.songs!.list.length > 1) {
    if (song.id === getState().player.songs?.playing.id) {
      dispatch(actionNextSong());
    }
    dispatch(actionRemoveFromNowPlaying(song));
    // } else {
    //   dispatch(actionRemoveFromNowPlaying(song));
    // }
    dispatch(actionShowToast("Song removed from Now Playing"));
  };
};

export const durationIncrement = () => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionDurationIncrement());
  };
};

export const togglePlaying = (state?: PlayState) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionTogglePlaying(state));
  };
};

export const setVideoIsRunning = (videoIsRunning?: boolean) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionSetVideoIsRunning(videoIsRunning));
  };
};

export const autoNextSong = () => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionAutoNextSong());
  };
};

export const nextSong = () => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionNextSong());
  };
};

export const prevSong = () => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionPrevSong());
  };
};

export const removeSong = (song: Song) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionRemoveSong(song));
    dispatch(actionShowToast("Song removed"));
  };
};

export const toggleShuffle = () => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionToggleShuffle());
  };
};

export const toggleRepeat = () => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionToggleRepeat());
  };
};

export const seekTo = (to: number) => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionSeekTo(to));
  };
};

export const seekDone = () => {
  return (dispatch: Dispatch<AllActions>, getState: () => AppState) => {
    dispatch(actionSeekDone());
  };
};
