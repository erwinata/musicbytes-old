import {
  LibraryActionTypes,
  ADD_TO_PLAYLIST,
  SAVE_PLAYLIST,
} from "redux/types/library";
import { Song } from "types/Song";
import { Playlist } from "types/Playlist";
import { now, filter, concat, uniqBy, remove } from "lodash";

export interface ILibraryState {
  playlists: Playlist[];
  collection: Song[];
}

const samplePlaylist = [
  {
    index: 0,
    playOrder: 0,
    id: "BWf-eARnf6U",
    title: "Michael Jackson - Heal The World (Official Video)",
    channel: "michaeljacksonVEVO",
    thumbnails: {
      default: "https://i.ytimg.com/vi/BWf-eARnf6U/default.jpg",
      medium: "https://i.ytimg.com/vi/BWf-eARnf6U/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/BWf-eARnf6U/hqdefault.jpg",
    },
    duration: 383,
  },
  {
    index: 1,
    playOrder: 1,
    id: "h_D3VFfhvs4",
    title: "Michael Jackson - Smooth Criminal (Official Video)",
    channel: "michaeljacksonVEVO",
    thumbnails: {
      default: "https://i.ytimg.com/vi/h_D3VFfhvs4/default.jpg",
      medium: "https://i.ytimg.com/vi/h_D3VFfhvs4/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/h_D3VFfhvs4/hqdefault.jpg",
    },
    duration: 566,
  },
  {
    index: 2,
    playOrder: 2,
    id: "pAyKJAtDNCw",
    title: "Michael Jackson - You Are Not Alone (Official Video)",
    channel: "michaeljacksonVEVO",
    thumbnails: {
      default: "https://i.ytimg.com/vi/pAyKJAtDNCw/default.jpg",
      medium: "https://i.ytimg.com/vi/pAyKJAtDNCw/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/pAyKJAtDNCw/hqdefault.jpg",
    },
    duration: 336,
  },
  {
    index: 3,
    playOrder: 3,
    id: "F2AitTPI5U0",
    title:
      "Michael Jackson - Black Or White (Official Video - Shortened Version)",
    channel: "michaeljacksonVEVO",
    thumbnails: {
      default: "https://i.ytimg.com/vi/F2AitTPI5U0/default.jpg",
      medium: "https://i.ytimg.com/vi/F2AitTPI5U0/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/F2AitTPI5U0/hqdefault.jpg",
    },
    duration: 383,
  },
  {
    index: 4,
    playOrder: -1,
    id: "je9okpHFZp0",
    title: "HIVI! - Bumi dan Bulan (Official Music Video)",
    channel: "HIVI!",
    thumbnails: {
      default: "https://i.ytimg.com/vi/je9okpHFZp0/default.jpg",
      medium: "https://i.ytimg.com/vi/je9okpHFZp0/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/je9okpHFZp0/hqdefault.jpg",
    },
    duration: 0,
  },
  {
    index: 5,
    playOrder: -1,
    id: "kX1O93X77d4",
    title: "HIVI! - Siapkah Kau 'Tuk Jatuh Cinta Lagi (Official Lyric Video)",
    channel: "HIVI!",
    thumbnails: {
      default: "https://i.ytimg.com/vi/kX1O93X77d4/default.jpg",
      medium: "https://i.ytimg.com/vi/kX1O93X77d4/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/kX1O93X77d4/hqdefault.jpg",
    },
    duration: 0,
  },
  {
    index: 6,
    playOrder: -1,
    id: "tUJAxxm1y1I",
    title: "HIVI! - Remaja (Official Lyric Video)",
    channel: "HIVI!",
    thumbnails: {
      default: "https://i.ytimg.com/vi/tUJAxxm1y1I/default.jpg",
      medium: "https://i.ytimg.com/vi/tUJAxxm1y1I/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/tUJAxxm1y1I/hqdefault.jpg",
    },
    duration: 0,
  },
];

const libraryReducerDefaultState: ILibraryState = {
  playlists: [
    // {
    //   title: "Lagu saya",
    //   songs: samplePlaylist,
    //   createdAt: 1589043600000,
    //   updatedAt: 1589205857159,
    // },
    // {
    //   title: "Pop Music",
    //   songs: samplePlaylist,
    //   createdAt: 1589043600000,
    //   updatedAt: 1589205857159,
    // },
    // {
    //   title: "Chillin Dude",
    //   songs: samplePlaylist,
    //   createdAt: 1589043600000,
    //   updatedAt: 1589205857159,
    // },
  ],
  collection: [],
  // collection: samplePlaylist,
};

export const libraryReducer = (
  state = libraryReducerDefaultState,
  action: LibraryActionTypes
): ILibraryState => {
  switch (action.type) {
    case "LOAD_PLAYLISTS":
      console.log(action.playlists);
      return {
        ...state,
        playlists: action.playlists,
      };
    case "ADD_TO_PLAYLIST":
      var mergedSongs = concat(
        state.playlists[action.playlistIndex].songs,
        action.songs
      );
      mergedSongs = uniqBy(mergedSongs, "id");

      return {
        ...state,
        playlists: [
          ...state.playlists.slice(0, action.playlistIndex),
          {
            ...state.playlists[action.playlistIndex],
            songs: mergedSongs,
          },
          ...state.playlists.slice(action.playlistIndex + 1),
        ],
      };
    case "REMOVE_FROM_PLAYLIST":
      let removedSongsList = state.playlists[action.playlistIndex].songs;
      remove(removedSongsList, { id: action.song.id });
      console.log(removedSongsList);

      return {
        ...state,
        playlists: [
          ...state.playlists.slice(0, action.playlistIndex),
          {
            ...state.playlists[action.playlistIndex],
            songs: removedSongsList,
          },
          ...state.playlists.slice(action.playlistIndex + 1),
        ],
      };
    case "SAVE_PLAYLIST":
      return {
        ...state,
        playlists: [
          ...state.playlists.slice(0, action.playlistIndex),
          {
            ...state.playlists[action.playlistIndex],
            songs: action.songs,
          },
          ...state.playlists.slice(action.playlistIndex + 1),
        ],
      };
    case "RENAME_PLAYLIST":
      return {
        ...state,
        playlists: [
          ...state.playlists.slice(0, action.playlistIndex),
          {
            ...state.playlists[action.playlistIndex],
            title: action.title,
          },
          ...state.playlists.slice(action.playlistIndex + 1),
        ],
      };
    case "DELETE_PLAYLIST":
      return {
        ...state,
        playlists: [
          ...state.playlists.slice(0, action.playlistIndex),
          ...state.playlists.slice(action.playlistIndex + 1),
        ],
      };
    case "NEW_PLAYLIST":
      return {
        ...state,
        playlists: [
          ...state.playlists,
          {
            title: action.title,
            songs: action.songs,
            createdAt: now(),
            updatedAt: now(),
          },
        ],
      };
    case "LIKE_SONG":
      var newCollection = [...state.collection];
      if (!action.isExist) {
        newCollection = [...newCollection, action.song];
      } else {
        newCollection = filter(newCollection, function (currentObject) {
          return currentObject.id !== action.song.id;
        });
      }
      return {
        ...state,
        collection: newCollection,
      };
    default:
      return state;
  }
};
