import React, { useEffect, useContext, useState } from "react";
import Listen from "pages/Listen/Listen";
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
import { AppState, store } from "redux/store/configureStore";
import { Song } from "types/Song";
import { useTransition, animated, useSpring } from "react-spring";
import { NavigationTab } from "types/Navigation";
import {
  changeTab,
  loginUser,
  setAPIBaseURL,
  setDevice,
  showToast,
  setAPIKey,
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
import { ToastType } from "types/ToastType";
import { loadUser } from "helpers/localStorage";
import { ConvertDurationToNumber } from "helpers/duration";
import { Loading } from "components/Loading/Loading";
import { LoadingType } from "types/LoadingType";
import { res_logo } from "res";
import {
  checkLoadPlaylist,
  checkLoadCollection,
  checkLoadSongPlayed,
} from "api/Library";
import { Recommendation } from "types/Recommendation";
import { setRecent } from "redux/actions/listen";
import { Playlist } from "types/Playlist";
import {
  generateRecommendation,
  generateCommonRecommendation,
} from "api/Listen";
import { axiosIntercept } from "api/Connection";
declare module "react-spring" {
  export const animated: any;
}

type Props = StateProps & DispatchProps;

interface StateProps {
  user?: UserData;
  recommendation: Recommendation[];
  isDesktop: boolean;
  tabState: {
    currentTab: NavigationTab;
    transitionDirection: number;
  };
  songs?: { list: Song[]; playing: Song };
  showPlayer: boolean;
}
interface DispatchProps {
  setRecent: (recent: { song?: Song; playlist?: Playlist }[]) => any;
  setDevice: (isDesktop: boolean) => any;
  setAPIKey: (index: number) => any;
  setAPIBaseURL: (url: string) => any;
  loginUser: (userData: UserData, startup?: boolean) => any;
  changeTab: (to: NavigationTab) => any;
  showToast: (text: string, toastType: ToastType) => any;
}

const App: React.FC<Props> = ({
  user,
  recommendation,
  isDesktop,
  tabState,
  songs,
  showPlayer,
  setRecent,
  setDevice,
  setAPIKey,
  setAPIBaseURL,
  loginUser,
  changeTab,
  showToast,
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

  const checkUserCookies = async () => {
    let user = loadUser();
    if (user) {
      await axiosIntercept({
        headers: {
          Authorization: user.token.musicbytes,
        },
      })
        .get(`${store.getState().app.apiBaseURL}v1/checktoken`)
        .then(async (response) => {
          await loginUser(user, true);
          return true;
        })
        .catch(() => {
          return false;
        });
    }
    return false;
  };

  const checkAPI = () => {
    if (window.location.href.indexOf("localhost") === -1) {
      setAPIBaseURL(process.env.REACT_APP_API_BASE_LIVE!);
    } else {
      setAPIBaseURL(process.env.REACT_APP_API_BASE_LOCAL!);
    }

    setAPIBaseURL(process.env.REACT_APP_API_BASE_LIVE!);
    // setAPIBaseURL(process.env.REACT_APP_API_BASE_LOCAL!);

    setAPIKey(1);
  };

  const [windowSize, setWindowSize] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  useEffectOnce(() => {});

  useEffect(() => {
    if (windowSize.w > windowSize.h && isBrowser) {
      setDevice(true);
    } else {
      setDevice(false);
    }
  }, [windowSize]);

  useEffect(() => {
    const fetchAllData = async () => {
      window.addEventListener("resize", () =>
        setWindowSize({ w: window.innerWidth, h: window.innerHeight })
      );

      checkAPI();

      const userLoggedIn = await checkUserCookies();

      if (!userLoggedIn) {
        generateCommonRecommendation();
      }

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

      if (localStorage.getItem("history")) {
        setRecent(JSON.parse(localStorage.getItem("history")!));
      }

      // // if (recommendation.length === 0) {
      // const fetchListenData = async () => {
      //   // return new Promise((resolve) => setTimeout(resolve, 5000));
      //   return new Promise((resolve) => {
      //     resolve(generateRecommendation(2));
      //   });
      // };
      // await fetchListenData();
      // // }

      setAppLoading({
        ...appLoading,
        loading: false,
      });
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const asd = async () => {
      if (user) {
        await Promise.all([
          setTimeout(() => {
            checkLoadCollection(user);
          }, 150),
          checkLoadPlaylist(user),
        ]);
        // await Promise.all([checkLoadPlaylist(user)]);
      }
    };

    asd();
  }, [user]);

  const [appLoading, setAppLoading] = useState({
    loading: true,
    text: "Fetching Awesome things!",
  });

  return (
    <div className="App">
      {appLoading.loading ? (
        <div className="AppLoading">
          <img src={res_logo} alt="Logo" />

          <Loading
            show={appLoading.loading}
            type={LoadingType.Moon}
            text={appLoading.text}
          />
        </div>
      ) : (
        <div className={`wrapper ${isDesktop ? "desktop" : ""}`}>
          <Overlay />
          <ClickOverlay />
          <MiniPlayer />
          <Toast />
          <Popup />
          <Option />

          <div className={`leftWrapper ${isDesktop ? "desktop" : ""}`}>
            <Player />
          </div>
          <div className={`rightWrapper ${isDesktop ? "desktop" : ""}`}>
            <Header />
            <PlaylistView />
            <Navbar />
            {page}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    user: state.app.user,
    recommendation: state.listen.recommendation,
    isDesktop: state.app.isDesktop,
    tabState: state.app.tabState,
    songs: state.player.songs,
    showPlayer: state.player.showPlayer,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AllActions>) => ({
  setRecent: bindActionCreators(setRecent, dispatch),
  setDevice: bindActionCreators(setDevice, dispatch),
  setAPIKey: bindActionCreators(setAPIKey, dispatch),
  setAPIBaseURL: bindActionCreators(setAPIBaseURL, dispatch),
  loginUser: bindActionCreators(loginUser, dispatch),
  changeTab: bindActionCreators(changeTab, dispatch),
  showToast: bindActionCreators(showToast, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
