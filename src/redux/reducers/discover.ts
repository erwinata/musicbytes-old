import { concat, uniqBy } from "lodash";
import {
  DiscoverActionTypes,
  SET_QUERY,
  SONG_SEARCH,
} from "redux/types/discover";
import { Song } from "types/Song";

export interface IDiscoverState {
  nextPageToken: string;
  songs?: Song[];
  loading: boolean;
  query: string;
}

const sampleSearchSong = [
  {
    index: -1,
    playOrder: -1,
    id: "iSyxz2RVddA",
    title:
      "HIVI! - Tersenyum, Untuk Siapa? (Official Lyric Video) ini judul yang panjang sekali woi",
    channel: "HIVI!",
    thumbnails: {
      default: "https://i.ytimg.com/vi/iSyxz2RVddA/default.jpg",
      medium: "https://i.ytimg.com/vi/iSyxz2RVddA/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/iSyxz2RVddA/hqdefault.jpg",
    },
    duration: 276,
  },
  {
    index: -1,
    playOrder: -1,
    id: "iSyxz2RVddAa",
    title: "HIVI! - Tersenyum, Untuk Siapa? (Official Lyric Video)",
    channel: "HIVI!",
    thumbnails: {
      default: "https://i.ytimg.com/vi/iSyxz2RVddA/default.jpg",
      medium: "https://i.ytimg.com/vi/iSyxz2RVddA/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/iSyxz2RVddA/hqdefault.jpg",
    },
    duration: 276,
  },
  {
    index: -1,
    playOrder: -1,
    id: "iSyxz2RVddAaa",
    title: "HIVI! - Tersenyum, Untuk Siapa? (Official Lyric Video)",
    channel: "HIVI!",
    thumbnails: {
      default: "https://i.ytimg.com/vi/iSyxz2RVddA/default.jpg",
      medium: "https://i.ytimg.com/vi/iSyxz2RVddA/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/iSyxz2RVddA/hqdefault.jpg",
    },
    duration: 276,
  },
  {
    index: -1,
    playOrder: -1,
    id: "iSyxz2RVddAaaa",
    title: "HIVI! - Tersenyum, Untuk Siapa? (Official Lyric Video)",
    channel: "HIVI!",
    thumbnails: {
      default: "https://i.ytimg.com/vi/iSyxz2RVddA/default.jpg",
      medium: "https://i.ytimg.com/vi/iSyxz2RVddA/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/iSyxz2RVddA/hqdefault.jpg",
    },
    duration: 276,
  },
  {
    index: -1,
    playOrder: -1,
    id: "iSyxz2RVddAz",
    title: "HIVI! - Tersenyum, Untuk Siapa? (Official Lyric Video)",
    channel: "HIVI!",
    thumbnails: {
      default: "https://i.ytimg.com/vi/iSyxz2RVddA/default.jpg",
      medium: "https://i.ytimg.com/vi/iSyxz2RVddA/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/iSyxz2RVddA/hqdefault.jpg",
    },
    duration: 276,
  },
  {
    index: -1,
    playOrder: -1,
    id: "iSyxz2RVddAzz",
    title: "HIVI! - Tersenyum, Untuk Siapa? (Official Lyric Video)",
    channel: "HIVI!",
    thumbnails: {
      default: "https://i.ytimg.com/vi/iSyxz2RVddA/default.jpg",
      medium: "https://i.ytimg.com/vi/iSyxz2RVddA/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/iSyxz2RVddA/hqdefault.jpg",
    },
    duration: 276,
  },
  {
    index: -1,
    playOrder: -1,
    id: "iSyxz2RVddAzzz",
    title: "HIVI! - Tersenyum, Untuk Siapa? (Official Lyric Video)",
    channel: "HIVI!",
    thumbnails: {
      default: "https://i.ytimg.com/vi/iSyxz2RVddA/default.jpg",
      medium: "https://i.ytimg.com/vi/iSyxz2RVddA/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/iSyxz2RVddA/hqdefault.jpg",
    },
    duration: 276,
  },
  {
    index: -1,
    playOrder: -1,
    id: "iSyxz2RVddAc",
    title: "HIVI! - Tersenyum, Untuk Siapa? (Official Lyric Video)",
    channel: "HIVI!",
    thumbnails: {
      default: "https://i.ytimg.com/vi/iSyxz2RVddA/default.jpg",
      medium: "https://i.ytimg.com/vi/iSyxz2RVddA/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/iSyxz2RVddA/hqdefault.jpg",
    },
    duration: 276,
  },
  {
    index: -1,
    playOrder: -1,
    id: "iSyxz2RVddAcc",
    title: "HIVI! - Tersenyum, Untuk Siapa? (Official Lyric Video)",
    channel: "HIVI!",
    thumbnails: {
      default: "https://i.ytimg.com/vi/iSyxz2RVddA/default.jpg",
      medium: "https://i.ytimg.com/vi/iSyxz2RVddA/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/iSyxz2RVddA/hqdefault.jpg",
    },
    duration: 276,
  },
  {
    index: -1,
    playOrder: -1,
    id: "iSyxz2RVddAccc",
    title: "HIVI! - Tersenyum, Untuk Siapa? (Official Lyric Video)",
    channel: "HIVI!",
    thumbnails: {
      default: "https://i.ytimg.com/vi/iSyxz2RVddA/default.jpg",
      medium: "https://i.ytimg.com/vi/iSyxz2RVddA/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/iSyxz2RVddA/hqdefault.jpg",
    },
    duration: 276,
  },
];

const discoverReducerDefaultState: IDiscoverState = {
  nextPageToken: "",
  songs: undefined,
  // songs: sampleSearchSong,
  loading: true,
  query: "",
};

export const discoverReducer = (
  state = discoverReducerDefaultState,
  action: DiscoverActionTypes
): IDiscoverState => {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        query: action.query,
      };
    case SONG_SEARCH:
      var songs = state.songs ? state.songs : [];
      if (action.addSongs) {
        songs = concat(songs, action.songs);
      } else {
        songs = action.songs;
      }

      uniqBy(songs, "id");

      return {
        ...state,
        query: action.query,
        nextPageToken: action.nextPageToken,
        songs: songs,
      };
    default:
      return state;
  }
};
