import { AppActionTypes, CHANGE_TAB } from "redux/types/app";
import { Song } from "types/Song";
import { NavigationTab } from "types/Navigation";

export interface IAppState {
  currentTab: NavigationTab;
  transitionDirection: number;
}

const appReducerDefaultState: IAppState = {
  currentTab: NavigationTab.LISTEN,
  transitionDirection: 1,
};

export const appReducer = (
  state = appReducerDefaultState,
  action: AppActionTypes
): IAppState => {
  switch (action.type) {
    case CHANGE_TAB:
      // console.log("REDUCER" + action.query);
      let transitionDirection = 1;
      if (action.to == NavigationTab.LIBRARY) {
        transitionDirection = -1;
      } else if (action.to == NavigationTab.DISCOVER) {
        transitionDirection = 1;
      } else {
        transitionDirection =
          state.currentTab == NavigationTab.DISCOVER ? -1 : 1;
      }

      return {
        ...state,
        currentTab: action.to,
        transitionDirection: transitionDirection,
      };
    default:
      return state;
  }
};
