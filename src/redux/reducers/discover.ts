import { DiscoverActionTypes, SONG_SEARCH } from "redux/types/discover";
import { Song } from "types/Song";

export interface IDiscoverState {
  songs: Song[];
  loading: boolean;
  query: string;
}

const sampleSearchSong = [
  {
    index: -1,
    playOrder: -1,
    id: "iSyxz2RVddA",
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
  // songs: [],
  songs: sampleSearchSong,
  loading: true,
  query: "michael jackson",
};

export const discoverReducer = (
  state = discoverReducerDefaultState,
  action: DiscoverActionTypes
): IDiscoverState => {
  switch (action.type) {
    case SONG_SEARCH:
      // console.log("REDUCER" + action.query);
      return {
        ...state,
        query: action.query,
        songs: action.songs,
      };
    default:
      return state;
  }
};
