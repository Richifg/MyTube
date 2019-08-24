import YoutubeStore from './stores/YoutubeStore';
import FavoritesStore from './stores/FavoritesStore';

// interfaces store injection
export interface IYoutube {
  youtube?: YoutubeStore;
}
export interface IFavorites {
  favorites?: FavoritesStore;
}

// videos shape used througout the app
export interface IVideoSnippet {
  title: string;
  description: string;
  img: string;
  id?: string;
}

// stats shape
export interface IVideoInfo {
  title: string;
  description: string;
  likes: string;
  dislikes: string;
  views: string;
  comments: number;
}
