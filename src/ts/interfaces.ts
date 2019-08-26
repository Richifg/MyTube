import YoutubeStore from './stores/YoutubeStore';
import FavoritesStore from './stores/FavoritesStore';

// interfaces for store injection
export interface IYoutube {
  youtube?: YoutubeStore;
}
export interface IFavorites {
  favorites?: FavoritesStore;
}

// video stats shape
export interface IVideoInfo {
  title: string;
  description: string;
  likes: string;
  dislikes: string;
  views: string;
  comments: string;
}

// video snippet shape used for previews
// (this one has truncated description and is the only data that is persisted)
export interface IVideoSnippet {
  title: string;
  description: string;
  img: string;
  id?: string;
}

// shape of comments
export interface IComment {
  userName: string;
  userImg: string;
  text: string;
  id?: string;
}
