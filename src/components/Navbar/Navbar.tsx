import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { viewPlaylist } from "redux/actions/app";
import { AppState } from "redux/store/configureStore";
import { AllActions } from "redux/types/app";
import { NavigationTab } from "types/Navigation";
import { Playlist } from "types/Playlist";
import "./Navbar.scss";
import NavbarItem from "./NavbarItem";

type Props = StateProps & DispatchProps;

interface StateProps {
  tabState: {
    currentTab: NavigationTab;
  };
  showPlayer: boolean;
  deviceInfo: {
    isLandscape: boolean;
    isTouch: boolean;
  };
}
interface DispatchProps {
  viewPlaylist: (playlist: Playlist, playlistIndex?: number) => any;
}

const Navbar: React.FC<Props> = ({
  tabState,
  showPlayer,
  deviceInfo,
  viewPlaylist,
}) => {
  return (
    <div
      className={`Navbar ${deviceInfo.isLandscape ? "desktop" : ""}`}
      onClick={() => {
        viewPlaylist(undefined!);
      }}
    >
      <Link to="/Discover">
        <NavbarItem
          active={
            ((!showPlayer && !deviceInfo.isLandscape) ||
              deviceInfo.isLandscape) &&
            tabState.currentTab === NavigationTab.DISCOVER
          }
          type={NavigationTab.DISCOVER}
        />
      </Link>
      <Link to="/">
        <NavbarItem
          active={
            ((!showPlayer && !deviceInfo.isLandscape) ||
              deviceInfo.isLandscape) &&
            tabState.currentTab === NavigationTab.LISTEN
          }
          type={NavigationTab.LISTEN}
        />
      </Link>
      <Link to="/Library">
        <NavbarItem
          active={
            ((!showPlayer && !deviceInfo.isLandscape) ||
              deviceInfo.isLandscape) &&
            tabState.currentTab === NavigationTab.LIBRARY
          }
          type={NavigationTab.LIBRARY}
        />
      </Link>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    tabState: state.app.tabState,
    showPlayer: state.player.showPlayer,
    deviceInfo: state.app.deviceInfo,
  };
};
const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActions>
  // ownProps: DiscoverProps
) => ({
  viewPlaylist: bindActionCreators(viewPlaylist, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
