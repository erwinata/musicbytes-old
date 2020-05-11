import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import reduxThunk, { ThunkMiddleware } from "redux-thunk";
import { discoverReducer } from "redux/reducers/discover";
import { AllActions } from "redux/types/app";
import { composeWithDevTools } from "redux-devtools-extension";
import { playerReducer } from "redux/reducers/player";
import { libraryReducer } from "redux/reducers/library";
import { appReducer } from "redux/reducers/app";

export const rootReducer = combineReducers({
  app: appReducer,
  discover: discoverReducer,
  player: playerReducer,
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
