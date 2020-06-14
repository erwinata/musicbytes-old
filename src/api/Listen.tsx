import { remove, shuffle, find } from "lodash";
import { Song } from "types/Song";
import { SearchSongLocal, SearchPeopleFavorites } from "./SearchLocal";
import { SongDetail } from "./SongDetail";
import {
  Recommendation,
  RecommendationType,
  CommonRecommendation,
} from "types/Recommendation";
import { store } from "redux/store/configureStore";
import { bindActionCreators } from "redux";
import {
  addRecommendation,
  fillRecommendation,
  removeRecommendation,
  addCommonRecommendation,
} from "redux/actions/listen";

export const getRandomSongReference = (
  cachedSongPlayed: { song: string; total: number }[],
  total: number
) => {
  const state = store.getState();

  let resultIndex: number[] = [];
  let indexPool: number[] = [];

  cachedSongPlayed.map((song, index) => {
    if (
      !find(state.listen.recommendation, (e) => {
        return e.reference.song.id === song.song;
      })
    ) {
      indexPool = indexPool.concat(Array(song.total).fill(index));
    }
  });

  console.log("indexPool");
  console.log(indexPool);

  // for (let i = 0; i < cachedSongPlayed.length; i++) {
  //   indexPool = indexPool.concat(Array(cachedSongPlayed[i].total).fill(i));
  // }
  for (let i = 0; i < Math.min(total, cachedSongPlayed.length); i++) {
    let randomIndex = Math.floor(Math.random() * Math.floor(indexPool.length));
    let indexSong = indexPool[randomIndex];
    resultIndex.push(indexSong);
    remove(indexPool, (indexPoolItem) => indexPoolItem === indexSong);
  }
  return resultIndex;
};

export const retrieveRecommendation = async (songSelected: Song) => {
  // setTimeout(resolve, 100, 'foo');

  // let totalTags = Math.round(
  //   clamp(
  //     songSelected!.tags.length / 2,
  //     Math.min(songSelected!.tags.length, 10),
  //     15
  //   )
  // );

  let totalTags = songSelected.tags.length;
  // let tags = shuffle(songSelected!.tags);
  let tags = songSelected.tags;
  let tagsQuery = "";
  tagsQuery += songSelected.title + "," + songSelected.channel;
  for (let i = 0; i < totalTags; i++) {
    tagsQuery += tags[i] + ",";
  }

  let songsResult = await SearchSongLocal(tagsQuery, songSelected.id);

  return shuffle(songsResult);
};

export const generateRecommendation = async (total: number) => {
  const dispatch = store.dispatch;

  let cachedSongPlayed: { song: string; total: number }[] = [];

  if (localStorage.getItem("song_played")) {
    cachedSongPlayed = JSON.parse(localStorage.getItem("song_played")!);
    // let songSelectedId = cachedSongPlayed[0].song;

    let songSelectedIndexes = getRandomSongReference(cachedSongPlayed, total);

    if (localStorage.getItem("song")) {
      let resultSongsIds = await Promise.all(
        songSelectedIndexes.map(async (songSelectedIndex) => {
          let songSelectedId = cachedSongPlayed[songSelectedIndex].song;
          let songSelected = (await SongDetail(songSelectedId))[0];

          let recommendationAdd: Recommendation = {
            title: "Related to " + songSelected?.title,
            song: [],
            reference: {
              song: songSelected!,
              type: RecommendationType.TAGS,
            },
          };

          bindActionCreators(addRecommendation, dispatch)(recommendationAdd);

          if (songSelected) {
            return retrieveRecommendation(songSelected);
          }
          return [];
        })
      );

      console.log("resultSongs");
      console.log(resultSongsIds);
      console.log(songSelectedIndexes);

      await Promise.all(
        songSelectedIndexes.map(async (songSelectedIndex, index) => {
          let songSelectedId = cachedSongPlayed[songSelectedIndex].song;
          let songSelected = (await SongDetail(songSelectedId))[0];
          let reference = {
            song: songSelected!,
            type: RecommendationType.TAGS,
          };

          if (resultSongsIds[index].length >= 3) {
            bindActionCreators(fillRecommendation, dispatch)(
              resultSongsIds[index],
              reference
            );
          } else {
            bindActionCreators(removeRecommendation, dispatch)(reference);
          }
        })
      );
    }
  }
};

export const generateCommonRecommendation = async () => {
  const dispatch = store.dispatch;

  let resultSongs = await SearchPeopleFavorites();
  resultSongs = shuffle(resultSongs);

  let recommendationAdd: CommonRecommendation = {
    title: "Some people's favorites",
    song: resultSongs,
  };

  bindActionCreators(addCommonRecommendation, dispatch)(recommendationAdd);
};
