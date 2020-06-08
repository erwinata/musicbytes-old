import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import reduxThunk, { ThunkMiddleware } from "redux-thunk";
import { discoverReducer } from "redux/reducers/discover";
import { AllActions } from "redux/types/app";
import { composeWithDevTools } from "redux-devtools-extension";
import { playerReducer } from "redux/reducers/player";
import { libraryReducer } from "redux/reducers/library";
import { appReducer } from "redux/reducers/app";
import { listenReducer } from "redux/reducers/listen";

export const rootReducer = combineReducers({
  app: appReducer,
  player: playerReducer,
  discover: discoverReducer,
  listen: listenReducer,
  library: libraryReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const middleware = [reduxThunk];

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middleware)
    // other store enhancers if any
  )
);
