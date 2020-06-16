import React from "react";
import { animated, useSpring } from "react-spring";
import "./SearchSuggestion.scss";

export const SearchSuggestion: React.FC<{
  suggestionList: string[];
  cursor: number;
  clickSuggestion: (query: string) => any;
}> = ({ suggestionList, cursor, clickSuggestion }) => {
  const style = useSpring({
    // height: height,
    opacity: suggestionList.length === 0 ? 0 : 1,
    // paddingBottom: height === 0 ? "2rem" : "1rem",
    marginTop: suggestionList.length === 0 ? "-2rem" : "0.5rem",
  });

  // useEffect(()=>{
  // 	if (height!==0){
  // 		setContentHeight(100)
  // 	}
  // }, [height])

  if (suggestionList.length == 0) {
    return null;
  }
  return (
    <animated.div className="SearchSuggestion" style={style}>
      {suggestionList.map((text, index) => {
        return (
          <SearchSuggestionItem
            text={text}
            active={cursor === index}
            clickSuggestion={clickSuggestion}
          />
        );
      })}
    </animated.div>
  );
};

export const SearchSuggestionItem: React.FC<{
  text: string;
  active: boolean;
  clickSuggestion: (query: string) => any;
}> = ({ text, active, clickSuggestion }) => {
  return (
    <span
      className={`SearchSuggestionItem ${active ? "active" : ""}`}
      onClick={() => {
        clickSuggestion(text);
      }}
    >
      {text}
    </span>
  );
};
