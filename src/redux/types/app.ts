import { DiscoverActionTypes } from "./discover";
import { PlayerActionTypes } from "./player";
import { NavigationTab } from "types/Navigation";
import { LibraryActionTypes } from "./library";

export const CHANGE_TAB = "CHANGE_TAB";

export interface ChangeTabAction {
  type: typeof CHANGE_TAB;
  to: NavigationTab;
}

export type AppActionTypes = ChangeTabAction;

export type AllActions =
  | AppActionTypes
  | DiscoverActionTypes
  | PlayerActionTypes
  | LibraryActionTypes;
