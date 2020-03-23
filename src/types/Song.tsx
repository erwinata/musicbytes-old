export interface Song {
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
