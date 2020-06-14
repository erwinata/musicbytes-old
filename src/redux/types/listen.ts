import { Song } from "types/Song";
import {
  Recommendation,
  RecommendationType,
  CommonRecommendation,
} from "types/Recommendation";
import { Playlist } from "types/Playlist";

export const ADD_COMMON_RECOMMENDATION = "ADD_COMMON_RECOMMENDATION";

export const ADD_RECOMMENDATION = "ADD_RECOMMENDATION";
export const FILL_RECOMMENDATION = "FILL_RECOMMENDATION";
export const REMOVE_RECOMMENDATION = "REMOVE_RECOMMENDATION";
export const ADD_RECENT = "ADD_RECENT";

export interface AddCommonRecommendationAction {
  type: typeof ADD_COMMON_RECOMMENDATION;
  recommendation: CommonRecommendation;
}

export interface AddRecommendationAction {
  type: typeof ADD_RECOMMENDATION;
  recommendation: Recommendation;
}
export interface FillRecommendationAction {
  type: typeof FILL_RECOMMENDATION;
  song: Song[];
  reference: { song: Song; type: RecommendationType };
}
export interface RemoveRecommendationAction {
  type: typeof REMOVE_RECOMMENDATION;
  reference: {
    song: Song;
    type: RecommendationType;
  };
}

export interface SetRecentAction {
  type: typeof ADD_RECENT;
  recent: {
    song?: Song;
    playlist?: Playlist;
  }[];
}

export type ListenActionTypes =
  | AddCommonRecommendationAction
  | AddRecommendationAction
  | FillRecommendationAction
  | RemoveRecommendationAction
  | SetRecentAction;
