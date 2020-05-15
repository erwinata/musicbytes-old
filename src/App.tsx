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
declare module "react-spring" {
  export const animated: any;
}

type Props = StateProps;

interface StateProps {
  currentTab: NavigationTab;
  transitionDirection: number;
  songPlaying: Song | null;
  songs: Song[];
  showPlayer: boolean;
}

interface ITabTransition {
  lastTab: NavigationTab;
  direction: number;
}

const App: React.FC<Props> = ({
  currentTab,
  transitionDirection,
  songPlaying,
  songs,
  showPlayer,
}) => {
  // useEffect(() => {
  //   console.log("F " + tabTransition.lastTab);

  //   let lastTab = currentTab;
  //   let direction = 1;

  //   if (currentTab == NavigationTab.LIBRARY) {
  //     direction = 1;
  //   } else if (currentTab == NavigationTab.DISCOVER) {
  //     direction = -1;
  //   } else {
  //     direction = tabTransition.lastTab == NavigationTab.DISCOVER ? 1 : -1;
  //   }

  //   setTabTransition({
  //     lastTab: lastTab,
  //     direction: direction,
  //   });

  //   console.log("T " + tabTransition.lastTab);
  // }, [currentTab]);

  // const [tabTransition, setTabTransition] = useState<ITabTransition>({
  //   lastTab: NavigationTab.LISTEN,
  //   direction: 1,
  // });

  const location = useLocation();
  const transitions = useTransition(location, (location) => location.pathname, {
    from: {
      opacity: 0,
      transform: "translate3d(" + 100 * -transitionDirection + "%,0,0)",
    },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: {
      opacity: 0,
      transform: "translate3d(" + -50 * -transitionDirection + "%,0,0)",
    },
  });

  var page = transitions.map(({ item: location, props, key }) => (
    <animated.div key={key} style={props}>
      <Switch location={location}>
        <Route path="/" exact component={Listen} />
        <Route path="/discover" exact component={Discover} />
        <Route path="/library" exact component={Library} />
        <Route path="/" render={() => <div>{currentTab}</div>} />
      </Switch>
    </animated.div>
  ));

  return (
    <div className="App">
      {/* <div>
        Lasttab {tabTransition.lastTab}
        <br></br>
        Direction {tabTransition.direction}
      </div> */}

      <Toast />

      <Popup />

      <Navbar />

      {songs.length > 0 ? <MiniPlayer /> : null}

      <Player />
      <PlaylistView />
      {page}
    </div>
  );

  // return (
  //   <div className="App">
  //     <BrowserRouter>
  //       <Navbar />

  //       {songs.length > 0 ? <MiniPlayer /> : null}

  //       <Player />

  //       <Switch>
  //         <Route path="/" exact component={Listen} />
  //         {/* <Route path="/" exact component={Discover} /> */}
  //         <Route path="/discover" exact component={Discover} />
  //         <Route path="/" render={() => <div>404</div>} />
  //       </Switch>
  //     </BrowserRouter>
  //   </div>
  // );
};

const mapStateToProps = (state: AppState) => {
  return {
    currentTab: state.app.currentTab,
    transitionDirection: state.app.transitionDirection,
    songPlaying: state.player.songPlaying,
    songs: state.player.songs,
    showPlayer: state.player.showPlayer,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AllActions>) => ({
  changeTab: bindActionCreators(changeTab, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
