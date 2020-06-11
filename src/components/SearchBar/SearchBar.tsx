import React, { ChangeEvent, useState } from "react";
import "./SearchBar.scss";
import { AppState } from "redux/store/configureStore";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AllActions } from "redux/types/app";
import { bindActionCreators } from "redux";
import { searchSong, setQuery } from "redux/actions/discover";
import { res_discover } from "res";
import axios from "axios";
import { SearchSuggestion } from "components/SearchSuggestion/SearchSuggestion";
import { clamp } from "helpers/math";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {
  startSearchSong: (query: string, nextPage?: boolean) => any;
}
interface StateProps {
  query: string;
}
interface DispatchProps {
  setQuery: (query: string) => any;
}

const SearchBar: React.FC<Props> = ({ query, startSearchSong }: Props) => {
  const [currentInput, setCurrentInput] = useState(query);
  const [searchSuggestionList, setSearchSuggestionList] = useState<string[]>(
    []
  );
  const [cursor, setCursor] = useState(-1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let query = e.target.value;
    setCurrentInput(query);
    inputDelay(query);
  };

  const handleKeyDown = (e: any) => {
    // arrow up/down button should select next/previous list element

    if (e.keyCode === 38 || e.keyCode === 40) {
      e.preventDefault();
    }

    if (e.keyCode === 38 && cursor > -1) {
      setCursor(cursor - 1);
    } else if (e.keyCode === 40 && cursor < searchSuggestionList.length - 1) {
      setCursor(cursor + 1);
    }

    if (e.keyCode === 27) {
      setSearchSuggestionList([]);
    }
    if (e.keyCode === 13) {
      let query = searchSuggestionList[cursor];
      clickSuggestion(query);
    }
  };

  const inputDelay = (query: string) => {
    let jsonpAdapter = require("axios-jsonp");

    axios
      .get(
        "https://suggestqueries.google.com/complete/search?callback=hi&output=toolbar&hl=en&ds=yt&client=youtube&hjson=t&cp=1&format=5&alt=json&q=" +
          query,
        { adapter: jsonpAdapter }
      )
      .then((response) => {
        console.log(response);
        let suggestionList: string[] = [];
        response.data[1].map((item: any) => {
          suggestionList.push(item[0]);
        });
        setSearchSuggestionList(suggestionList);
      });
  };

  const clickSuggestion = (query: string) => {
    setSearchSuggestionList([]);
    setCurrentInput(query);
    startSearchSong(query);
  };

  return (
    <div className="SearchBar">
      <img src={res_discover} alt="Search" />
      <input
        type="text"
        value={currentInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <SearchSuggestion
        suggestionList={searchSuggestionList}
        clickSuggestion={clickSuggestion}
        cursor={cursor}
      />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    query: state.discover.query,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActions>
  // ownProps: DiscoverProps
) => ({
  setQuery: bindActionCreators(setQuery, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
