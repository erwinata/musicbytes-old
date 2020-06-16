import { CategorySubtitle } from "components/CategorySubtitle/CategorySubtitle";
import SongGrid from "components/SongGrid/SongGrid";
import { convertToSongGridItems } from "helpers/array";
import React from "react";
import { OptionActionType } from "types/Option";
import { CommonRecommendation, Recommendation } from "types/Recommendation";
import "./RecommendationItem.scss";

export const RecommendationItem: React.FC<{
  recommendation: Recommendation | CommonRecommendation;
  optionList: OptionActionType[];
}> = ({ recommendation, optionList }) => {
  return (
    <div className="RecommendationItem">
      <CategorySubtitle text={recommendation.title} />
      <SongGrid
        items={convertToSongGridItems(recommendation.song)}
        optionList={optionList}
        isLoading={recommendation.song.length === 0}
      />
    </div>
  );
};
