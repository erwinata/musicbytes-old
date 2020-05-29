import React, { useEffect, useContext, useState } from "react";
import { Listen } from "pages/Listen/Listen";
import Discover from "pages/Discover/Discover";
import Player from "pages/Player/Player";
import Library from "pages/Library/Library";
import "./App.scss";
import { Switch, Route, BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "components/Navbar/Navbar";
import MiniPlayer from "components/MiniPlayer/MiniPlayer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AllActions } from "redux/types/app";
import { AppState } from "redux/store/configureStore";
import { Song } from "types/Song";
import { showPlayer } from "redux/actions/player";
import { useTransition, animated } from "react-spring";
import { NavigationTab } from "types/Navigation";
import { changeTab } from "redux/actions/app";
import PlaylistView from "pages/PlaylistView/PlaylistView";
import Popup from "components/Popup/Popup";
import Toast from "components/Toast/Toast";
import { Header } from "components/Header/Header";
import Overlay from "components/Overlay/Overlay";
import Option from "components/Option/Option";
import { useEffectOnce } from "react-use";
import ClickOverlay from "components/ClickOverlay/ClickOverlay";
declare module "react-spring" {
  export const animated: any;
}

type Props = StateProps & DispatchProps;

interface StateProps {
  tabState: {
    currentTab: NavigationTab;
    transitionDirection: number;
  };
  songs?: { list: Song[]; playing: Song };
  showPlayer: boolean;
}
interface DispatchProps {
  changeTab: (to: NavigationTab) => any;
}

const App: React.FC<Props> = ({ tabState, songs, showPlayer, changeTab }) => {
  const location = useLocation();
  const transitions = useTransition(location, (location) => location.pathname, {
    from: {
      opacity: 0,
      transform:
        "translate3d(" + 100 * -tabState.transitionDirection + "%,0,0)",
    },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: {
      opacity: 0,
      transform:
        "translate3d(" + -50 * -tabState.transitionDirection + "%,0,0)",
    },
  });

  var page = transitions.map(({ item: location, props, key }) => {
    return (
      <animated.div key={key} style={props}>
        <Switch location={location}>
          <Route path="/" exact component={Listen} />
          <Route path="/discover" exact component={Discover} />
          <Route path="/library" exact component={Library} />
          <Route path="/" render={() => <div>{tabState.currentTab}</div>} />
        </Switch>
      </animated.div>
    );
  });

  useEffectOnce(() => {
    switch (location.pathname) {
      case "/":
        changeTab(NavigationTab.LISTEN);
        break;
      case "/Discover":
        changeTab(NavigationTab.DISCOVER);
        break;
      case "/Library":
        changeTab(NavigationTab.LIBRARY);
        break;
    }
  });

  return (
    <div className="App">
      <Header />
      <Overlay />
      <ClickOverlay />
      <Toast />
      <Popup />
      <Option />
      <Navbar />
      <MiniPlayer />
      <Player />
      <PlaylistView />
      {page}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    tabState: state.app.tabState,
    songs: state.player.songs,
    showPlayer: state.player.showPlayer,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AllActions>) => ({
  changeTab: bindActionCreators(changeTab, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
