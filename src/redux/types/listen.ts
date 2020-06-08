import { Song } from "types/Song";
import { Recommendation } from "types/Recommendation";
import { Playlist } from "types/Playlist";

export const ADD_RECOMMENDATION = "ADD_RECOMMENDATION";
export const ADD_RECENT = "ADD_RECENT";

export interface AddRecommendationAction {
  type: typeof ADD_RECOMMENDATION;
  recommendation: Recommendation;
}
export interface AddRecentAction {
  type: typeof ADD_RECENT;
  item: {
    song?: Song;
    playlist?: Playlist;
  };
}

export type ListenActionTypes = AddRecommendationAction | AddRecentAction;
