import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AllActions } from "redux/types/app";
import { bindActionCreators } from "redux";
import { showPlayer } from "redux/actions/player";
import { connect } from "react-redux";
import { NavigationTab } from "types/Navigation";
import NavbarItem from "./NavbarItem";
import { AppState } from "redux/store/configureStore";
import { viewPlaylist } from "redux/actions/app";
import { Playlist } from "types/Playlist";

type Props = StateProps & DispatchProps;

interface StateProps {
  tabState: {
    currentTab: NavigationTab;
  };
}
interface DispatchProps {
  viewPlaylist: (playlist: Playlist) => any;
}

const Navbar: React.FC<Props> = ({ tabState, viewPlaylist }) => {
  return (
    <div
      className="Navbar"
      onClick={() => {
        viewPlaylist(undefined!);
      }}
    >
      <Link to="/Discover">
        <NavbarItem
          active={tabState.currentTab == NavigationTab.DISCOVER}
          type={NavigationTab.DISCOVER}
        />
      </Link>
      <Link to="/">
        <NavbarItem
          active={tabState.currentTab == NavigationTab.LISTEN}
          type={NavigationTab.LISTEN}
        />
      </Link>
      <Link to="/Library">
        <NavbarItem
          active={tabState.currentTab == NavigationTab.LIBRARY}
          type={NavigationTab.LIBRARY}
        />
      </Link>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    tabState: state.app.tabState,
  };
};
const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActions>
  // ownProps: DiscoverProps
) => ({
  viewPlaylist: bindActionCreators(viewPlaylist, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
