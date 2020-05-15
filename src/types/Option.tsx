export enum OptionActionType {
  ADD_TO_NOW_PLAYING,
  ADD_TO_PLAYLIST,
  LIKE_SONG,
}

export interface OptionAction {
  type: OptionActionType;
  label: string;
  action: (item: any) => any;
}
