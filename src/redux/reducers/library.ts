import { concat, filter, findIndex, remove, uniqBy } from "lodash";
import { LibraryActionTypes } from "redux/types/library";
import { Playlist } from "types/Playlist";
import { Song } from "types/Song";

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
  let playlistIndex;

  switch (action.type) {
    case "CLEAR_ALL_LIBRARY":
      return {
        ...state,
        playlists: [],
        collection: [],
      };
    case "LOAD_COLLECTION":
      return {
        ...state,
        collection: action.collection,
      };
    case "LOAD_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "ADD_TO_PLAYLIST":
      var mergedSongs = concat(action.playlist.songs, action.songs);
      mergedSongs = uniqBy(mergedSongs, "id");

      playlistIndex = findIndex(state.playlists, { id: action.playlist.id });

      return {
        ...state,
        playlists: [
          ...state.playlists.slice(0, playlistIndex),
          {
            ...state.playlists[playlistIndex],
            songs: mergedSongs,
          },
          ...state.playlists.slice(playlistIndex + 1),
        ],
      };
    case "REMOVE_FROM_PLAYLIST":
      let removedSongsList = action.playlist.songs;
      remove(removedSongsList, { id: action.song.id });

      playlistIndex = findIndex(state.playlists, { id: action.playlist.id });

      return {
        ...state,
        playlists: [
          ...state.playlists.slice(0, playlistIndex),
          {
            ...state.playlists[playlistIndex],
            songs: removedSongsList,
          },
          ...state.playlists.slice(playlistIndex + 1),
        ],
      };
    case "SAVE_PLAYLIST":
      playlistIndex = findIndex(state.playlists, { id: action.playlist.id });

      return {
        ...state,
        playlists: [
          ...state.playlists.slice(0, playlistIndex),
          {
            ...state.playlists[playlistIndex],
            songs: action.songs,
          },
          ...state.playlists.slice(playlistIndex + 1),
        ],
      };
    case "RENAME_PLAYLIST":
      playlistIndex = findIndex(state.playlists, { id: action.playlist.id });

      return {
        ...state,
        playlists: [
          ...state.playlists.slice(0, playlistIndex),
          {
            ...state.playlists[playlistIndex],
            title: action.title,
          },
          ...state.playlists.slice(playlistIndex + 1),
        ],
      };
    case "DELETE_PLAYLIST":
      let playlists = state.playlists;
      playlists = filter(playlists, (playlistItem) => {
        return playlistItem.id !== action.playlist.id;
      });
      return {
        ...state,
        playlists: playlists,
      };
    case "NEW_PLAYLIST":
      return {
        ...state,
        playlists: [...state.playlists, action.playlist],
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
