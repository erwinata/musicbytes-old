import React, { ChangeEvent } from "react";
import "./SearchBar.scss";
import { AppState } from "store/configureStore";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "types/actions";
import { bindActionCreators } from "redux";
import { startSearchSong } from "actions/discover";

type Props = StateProps & DispatchProps;

interface StateProps {
  query: string;
}
interface DispatchProps {
  startSearchSong: (query: string) => any;
}

const SearchBar: React.FC<Props> = ({ query, startSearchSong }: Props) => {
  var timeout: any;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (timeout) clearTimeout(timeout);
    var query = e.target.value;
    timeout = setTimeout(() => inputDelay(query), 500);
  };

  const inputDelay = (query: string) => {
    startSearchSong(query);
  };

  return (
    <div className="SearchBar">
      <img src="/res/search.svg" alt="Search" />
      <input type="text" defaultValue={query} onChange={handleChange} />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    query: state.discover.query
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
  // ownProps: DiscoverProps
) => ({
  startSearchSong: bindActionCreators(startSearchSong, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
