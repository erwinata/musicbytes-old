import React, { useEffect } from "react";
import { Listen } from "pages/Listen/Listen";
import Discover from "pages/Discover/Discover";
import Player from "pages/Player/Player";
import "./App.scss";
import { Switch, Route, BrowserRouter, useLocation } from "react-router-dom";
import { Navbar } from "components/Navbar/Navbar";
import MiniPlayer from "components/MiniPlayer/MiniPlayer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "types/actions";
import { AppState } from "redux/store/configureStore";
import { Song } from "types/Song";
import { showPlayer } from "redux/actions/player";

type Props = StateProps;

interface StateProps {
  songPlaying: Song | null;
  songs: Song[];
  showPlayer: boolean;
}

const App: React.FC<Props> = ({ songPlaying, songs, showPlayer }) => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        {songs.length > 0 ? <MiniPlayer /> : null}

        <Player />

        <Switch>
          <Route path="/" exact component={Listen} />
          {/* <Route path="/" exact component={Discover} /> */}
          <Route path="/discover" exact component={Discover} />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    songPlaying: state.player.songPlaying,
    songs: state.player.songs,
    showPlayer: state.player.showPlayer,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
  // ownProps: DiscoverProps
) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
