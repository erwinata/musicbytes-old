import React from "react";
import "./RecommendationItem.scss";
import { Recommendation, CommonRecommendation } from "types/Recommendation";
import { CategoryTitle } from "components/CategoryTitle/CategoryTitle";
import { CategorySubtitle } from "components/CategorySubtitle/CategorySubtitle";
import SongGrid from "components/SongGrid/SongGrid";
import { OptionActionType } from "types/Option";
import { convertToSongGridItems } from "helpers/array";

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
