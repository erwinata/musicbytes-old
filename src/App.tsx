import React, { useEffect, useContext, useState } from "react";
import { Listen } from "pages/Listen/Listen";
import Discover from "pages/Discover/Discover";
import Player from "pages/Player/Player";
import Library from "pages/Library/Library";
import "./App.scss";
import { Switch, Route, useLocation } from "react-router-dom";
import Navbar from "components/Navbar/Navbar";
import MiniPlayer from "components/MiniPlayer/MiniPlayer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AllActions } from "redux/types/app";
import { AppState } from "redux/store/configureStore";
import { Song } from "types/Song";
import { useTransition, animated } from "react-spring";
import { NavigationTab } from "types/Navigation";
import {
  changeTab,
  loginUser,
  setAPIBaseURL,
  setDevice,
} from "redux/actions/app";
import PlaylistView from "pages/PlaylistView/PlaylistView";
import Popup from "components/Popup/Popup";
import Toast from "components/Toast/Toast";
import Header from "components/Header/Header";
import Overlay from "components/Overlay/Overlay";
import Option from "components/Option/Option";
import { useEffectOnce } from "react-use";
import ClickOverlay from "components/ClickOverlay/ClickOverlay";
import Cookies from "js-cookie";
import { UserData } from "types/UserData";
import { isBrowser } from "react-device-detect";
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
  setDevice: (isDesktop: boolean) => any;
  setAPIBaseURL: (url: string) => any;
  loginUser: (userData: UserData) => any;
  changeTab: (to: NavigationTab) => any;
}

const App: React.FC<Props> = ({
  tabState,
  songs,
  showPlayer,
  setDevice,
  setAPIBaseURL,
  loginUser,
  changeTab,
}) => {
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

  const checkUserCookies = () => {
    const name = Cookies.get("name");
    const email = Cookies.get("email");
    const token_google = Cookies.get("token_google");
    const token_musicbytes = Cookies.get("token_musicbytes");
    if (name && email && token_google && token_musicbytes) {
      const token = {
        google: token_google,
        musicbytes: token_musicbytes,
      };

      loginUser({
        name: name,
        email: email,
        token: token,
      });
    }
  };

  const checkAPI = () => {
    if (window.location.href.indexOf("localhost") === -1) {
      setAPIBaseURL(process.env.REACT_APP_API_BASE_LIVE!);
    } else {
      setAPIBaseURL(process.env.REACT_APP_API_BASE_LOCAL!);
    }

    setAPIBaseURL(process.env.REACT_APP_API_BASE_LIVE!);
    // setAPIBaseURL(process.env.REACT_APP_API_BASE_LOCAL!);
  };

  const [windowSize, setWindowSize] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  useEffectOnce(() => {
    checkUserCookies();
    checkAPI();

    window.addEventListener("resize", () =>
      setWindowSize({ w: window.innerWidth, h: window.innerHeight })
    );

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

  useEffect(() => {
    if (windowSize.w > windowSize.h && isBrowser) {
      setDevice(true);
    } else {
      setDevice(false);
    }
  }, [windowSize]);

  return (
    <div className="App">
      <div className={`wrapper ${isBrowser ? "desktop" : ""}`}>
        <Overlay />
        <ClickOverlay />
        <MiniPlayer />
        <Toast />
        <Popup />
        <Option />

        <div className={`leftWrapper ${isBrowser ? "desktop" : ""}`}>
          <Player />
        </div>
        <div className={`rightWrapper ${isBrowser ? "desktop" : ""}`}>
          <Header />
          <PlaylistView />
          <Navbar />
          {page}
        </div>
      </div>
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
  setDevice: bindActionCreators(setDevice, dispatch),
  setAPIBaseURL: bindActionCreators(setAPIBaseURL, dispatch),
  loginUser: bindActionCreators(loginUser, dispatch),
  changeTab: bindActionCreators(changeTab, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
