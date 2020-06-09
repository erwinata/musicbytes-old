import { Playlist } from "types/Playlist";
import { Song } from "types/Song";

export const arrayGetIndexByAttr = (array: any[], attr: string, value: any) => {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
};

export const arrayGetObjectByAttr = (
  array: any[],
  attr: string,
  value: any
) => {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return array[i];
    }
  }
  return null;
};

export const arrayRemoveObjectByAttr = (
  array: any[],
  attr: string,
  value: any
) => {
  var targetRemove = null;
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      targetRemove = array[i];
    }
  }
  if (targetRemove != null) {
    array[i].pop();
    return true;
  }
  return null;
};

export const arrayRemoveObjectAtIndex = (array: any[], index: number) => {
  var firstSlice = array.slice(0, index);
  var secondSlice = array.slice(index + 1, array.length);
  return [...firstSlice, ...secondSlice];
};

export const convertToSongGridItems = (
  songs?: Song[],
  playlists?: Playlist[]
) => {
  let result: { song?: Song; playlist?: Playlist }[] = [];

  if (songs) {
    songs.map((song) => {
      result.push({
        song: song,
      });
    });
  }
  if (playlists) {
    playlists.map((playlist) => {
      result.push({
        playlist: playlist,
      });
    });
  }

  return result;
};
