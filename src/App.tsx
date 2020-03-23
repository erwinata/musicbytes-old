import React from "react";
import { Listen } from "pages/Listen/Listen";
import Discover from "pages/Discover/Discover";
import Player from "pages/Player/Player";
import "./App.scss";
import { Switch, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Listen} />
          {/* <Route path="/" exact component={Discover} /> */}
          <Route path="/discover" exact component={Discover} />
          <Route path="/player" exact component={Player} />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
