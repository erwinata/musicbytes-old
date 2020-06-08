import { Song } from "./Song";

export enum RecommendationType {
  TAGS,
  ARTIST,
}

export interface Recommendation {
  title: string;
  song: Song[];
  reference: {
    song: Song;
    type: RecommendationType;
  };
}
