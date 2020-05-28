export enum OptionActionType {
  ADD_TO_NOW_PLAYING,
  ADD_TO_PLAYLIST,
  LIKE_SONG,
  REMOVE_FROM_NOW_PLAYING,
  REMOVE_FROM_PLAYLIST,
}

export interface OptionAction {
  type: OptionActionType;
  label: string;
  action: (item: any) => any;
}
