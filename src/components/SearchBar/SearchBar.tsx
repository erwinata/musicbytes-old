import React, { ChangeEvent } from "react";
import "./SearchBar.scss";
import { AppState } from "redux/store/configureStore";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AllActions } from "redux/types/app";
import { bindActionCreators } from "redux";
import { searchSong } from "redux/actions/discover";
import { res_discover } from "res";

type Props = StateProps & DispatchProps;

interface StateProps {
  query: string;
}
interface DispatchProps {
  searchSong: (query: string, nextPage?: boolean) => any;
}

const SearchBar: React.FC<Props> = ({ query, searchSong }: Props) => {
  var timeout: any;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (timeout) clearTimeout(timeout);
    var query = e.target.value;
    timeout = setTimeout(() => inputDelay(query), 500);
  };

  const inputDelay = (query: string) => {
    searchSong(query);
  };

  return (
    <div className="SearchBar">
      <img src={res_discover} alt="Search" />
      <input type="text" defaultValue={query} onChange={handleChange} />
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
  searchSong: bindActionCreators(searchSong, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
