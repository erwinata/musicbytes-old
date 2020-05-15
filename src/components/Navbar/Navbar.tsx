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

type Props = StateProps & DispatchProps;

interface StateProps {
  currentTab: NavigationTab;
}
interface DispatchProps {
  // showPlayer: (show: boolean) => any;
}

const Navbar: React.FC<Props> = ({ currentTab }) => {
  return (
    <div className="Navbar">
      <Link to="/Discover">
        <NavbarItem
          active={currentTab == NavigationTab.DISCOVER}
          type={NavigationTab.DISCOVER}
        />
      </Link>
      <Link to="/">
        <NavbarItem
          active={currentTab == NavigationTab.LISTEN}
          type={NavigationTab.LISTEN}
        />
      </Link>
      <Link to="/Library">
        <NavbarItem
          active={currentTab == NavigationTab.LIBRARY}
          type={NavigationTab.LIBRARY}
        />
      </Link>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    currentTab: state.app.currentTab,
  };
};
const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActions>
  // ownProps: DiscoverProps
) => ({
  // togglePlaying: bindActionCreators(togglePlaying, dispatch),
  // nextSong: bindActionCreators(nextSong, dispatch),
  // prevSong: bindActionCreators(prevSong, dispatch),
  // toggleShuffle: bindActionCreators(toggleShuffle, dispatch),
  // toggleRepeat: bindActionCreators(toggleRepeat, dispatch),
  // seekTo: bindActionCreators(seekTo, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
