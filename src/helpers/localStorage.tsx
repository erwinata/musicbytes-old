import { UserData } from "types/UserData";
import { find } from "lodash";

export const storeUser = (user: UserData) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem("song_played");
  localStorage.removeItem("scheduler");
  localStorage.removeItem("user");
};

export const storeUpdateToken = (token: {
  google?: string;
  musicbytes?: string;
}) => {
  let user: UserData;

  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user")!);
    user = {
      ...user,
      token: {
        google: token.google ? token.google : user.token.google,
        musicbytes: token.musicbytes ? token.musicbytes : user.token.musicbytes,
      },
    };

    console.log("STORE UP " + token.google);

    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const loadUser = () => {
  if (localStorage.getItem("user")) {
    let user = JSON.parse(localStorage.getItem("user")!);
    return user;
  }
  return undefined;
};

export const getSongPlayed = () => {
  let result: {
    song: string;
    total: number;
  }[] = [];
  if (localStorage.getItem("song_played")) {
    result = JSON.parse(localStorage.getItem("song_played")!);
  }
  return result;
};

export const storeSearchSongIds = (
  query: string,
  songIds: string,
  nextPageToken: string
) => {
  query = query.trim();
  let search = [];

  if (localStorage.getItem("search")) {
    let search = JSON.parse(localStorage.getItem("search")!);
    if (find(search, { query: query })) return false;
  }

  search.push({
    query: query,
    songs: songIds,
    nextPageToken: nextPageToken,
  });
  localStorage.setItem("search", JSON.stringify(search));
};

export const getSearchSongIds = (query: string) => {
  if (localStorage.getItem("search")) {
    let search = JSON.parse(localStorage.getItem("search")!);

    query = query.trim();

    let result;
    if ((result = find(search, { query: query })))
      return { nextPageToken: result.nextPageToken, ids: result.songs };
  }
  return undefined;
};

export const scheduleTask = (syncSongPlayedMinute: number) => {
  let scheduler = {
    syncSongPlayed: Date.now() + syncSongPlayedMinute * 60 * 1000,
  };
  if (localStorage.getItem("scheduler")) {
    scheduler = JSON.parse(localStorage.getItem("scheduler")!);
    if (scheduler.syncSongPlayed) {
      if (scheduler.syncSongPlayed <= Date.now()) {
        scheduler.syncSongPlayed =
          Date.now() + syncSongPlayedMinute * 60 * 1000;
      }
    }
  }

  localStorage.setItem("scheduler", JSON.stringify(scheduler));
};
