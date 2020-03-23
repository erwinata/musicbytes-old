import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import reduxThunk, { ThunkMiddleware } from "redux-thunk";
import { discoverReducer } from "redux/reducers/discover";
import { AppActions } from "types/actions";
import { composeWithDevTools } from "redux-devtools-extension";
import { playerReducer } from "redux/reducers/player";

export const rootReducer = combineReducers({
  discover: discoverReducer,
  player: playerReducer
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
