import YoutubeStore from './stores/YoutubeStore';
import FavoritesStore from './stores/FavoritesStore';

// interfaces store injection
export interface IYoutube {
  youtube?: YoutubeStore;
}
export interface IFavorites {
  favorites?: FavoritesStore;
}

// items as expected from youtube search query
export interface ISearchItem {
  id: { videoId: string };
  snippet: {
    id: string;
    title: string;
    description: string;
    thumbnails: { medium: { url: string } }
  };
}

// videos shape used througout the app
export interface IVideo {
  title: string;
  description: string;
  img: string;
  id?: string;
}
