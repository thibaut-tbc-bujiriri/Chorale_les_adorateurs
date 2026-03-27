export interface Song {
  id: string;
  number: string;
  title: string;
  author: string;
  category: string;
  lyrics: string;
  createdAt: string;
}

export interface SongFilters {
  category: string;
  author: string;
  number: string;
  lyrics: string;
}

export interface SongPayload {
  number: string;
  title: string;
  author: string;
  category: string;
  lyrics: string;
}
