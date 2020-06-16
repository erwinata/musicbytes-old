import { find, shuffle } from "lodash";
import { bindActionCreators } from "redux";
import {
  addCommonRecommendation,
  addRecommendation,
  addSongSearched,
  fillRecommendation,
  removeRecommendation,
  setLoadingRecommendation,
} from "redux/actions/listen";
import { store } from "redux/store/configureStore";
import {
  CommonRecommendation,
  Recommendation,
  RecommendationType,
} from "types/Recommendation";
import { Song } from "types/Song";
import { SearchPeopleFavorites, SearchSongLocal } from "./SearchLocal";
import { SongDetail } from "./SongDetail";

export const getRandomSongReference = (
  cachedSongPlayed: { song: string; total: number }[]
) => {
  const state = store.getState();

  let resultIndex: number = -1;
  let indexPool: number[] = [];

  cachedSongPlayed.map((song, index) => {
    if (
      !find(
        state.listen.recommendationState.songSearched,
        (songSearchedItem) => {
          return songSearchedItem === song.song;
        }
      )
    ) {
      indexPool = indexPool.concat(Array(song.total).fill(index));
    }
  });

  let randomIndex = Math.floor(Math.random() * Math.floor(indexPool.length));
  resultIndex =
    indexPool[randomIndex] !== undefined ? indexPool[randomIndex] : -1;

  return resultIndex;
};

export const retrieveRecommendation = async (songSelected: Song) => {
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
  const state = store.getState();

  bindActionCreators(setLoadingRecommendation, dispatch)(true);

  let cachedSongPlayed: { song: string; total: number }[] = [];

  if (localStorage.getItem("song_played")) {
    cachedSongPlayed = JSON.parse(localStorage.getItem("song_played")!);

    let currentTotalRecommendation = state.listen.recommendation.length;
    const targetTotal = Math.min(
      cachedSongPlayed.length,
      state.listen.recommendation.length + total
    );

    let iteration = 0;
    let limitIteration =
      cachedSongPlayed.length - state.listen.recommendation.length;

    while (
      currentTotalRecommendation < targetTotal ||
      iteration < limitIteration
    ) {
      // let songSelectedId = cachedSongPlayed[0].song;

      let songSelectedIndex = getRandomSongReference(cachedSongPlayed);

      if (songSelectedIndex === -1) {
        break;
      }

      let songSelectedId = cachedSongPlayed[songSelectedIndex].song;
      let songSelected = (await SongDetail(songSelectedId))[0];

      let resultSongs = await new Promise<Song[]>(async (resolve) => {
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
          resolve(retrieveRecommendation(songSelected));
        }
        resolve([]);
      });

      await new Promise(async (resolve) => {
        let reference = {
          song: songSelected!,
          type: RecommendationType.TAGS,
        };

        bindActionCreators(addSongSearched, dispatch)(songSelectedId);

        if (resultSongs.length >= 3) {
          bindActionCreators(fillRecommendation, dispatch)(
            resultSongs,
            reference
          );
          currentTotalRecommendation++;
        } else {
          bindActionCreators(removeRecommendation, dispatch)(reference);
        }

        resolve();
      });

      iteration++;

      if (currentTotalRecommendation == targetTotal) {
        break;
      }
    }

    bindActionCreators(setLoadingRecommendation, dispatch)(false);
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
