export interface Song {
  index: number;
  playOrder: number;
  id: string;
  title: string;
  channel: string;
  thumbnails?: {
    default: string;
    medium: string;
    high: string;
  };
  duration: number;
}
