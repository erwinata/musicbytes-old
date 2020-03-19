import React from "react";
import { Listen } from "pages/Listen/Listen";
import Discover from "pages/Discover/Discover";
import { Player } from "pages/Player/Player";
import "./App.scss";
import { Switch, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/discover">
            <Discover />
          </Route>
          {/* <Route path="/library">
            <Library />
          </Route> */}
          <Route path="/player">
            <Player />
          </Route>
          <Route path="/">
            <Listen />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
