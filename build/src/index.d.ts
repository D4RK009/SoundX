
export interface Playlist {
  USER: string;
  ID: string;
  SONGS: Song[];
}



export interface Song {
  encoded: string;
  track: string;
  info: {
    identifier: string;
    isSeekable: boolean;
    author: string;
    length: number;
    isStream: boolean;
    position: number;
    sourceName: string;
    title: string;
    uri: string;
  }
}
