import { observable } from 'mobx';
import { persist } from 'mobx-persist';
import { computedFn } from 'mobx-utils';

import { IVideoSnippet } from '../interfaces';

class FavoritesStore {
  @persist('list') @observable videos: IVideoSnippet[];

  isVideoFavorite = computedFn(function(id: string) {
    return this.videos.some((video: IVideoSnippet) => video.id === id);
  });

  constructor() {
    this.videos = [];
  }

  toggleFavorite(video: IVideoSnippet) {
    const index = this.videos.findIndex(favVideo => favVideo.id === video.id);
    const newFavorites = [...this.videos];
    if (index === -1) {
      newFavorites.push(video);
      newFavorites.sort((video1, video2) => video1.title > video2.title ? 1 : -1);
    } else {
      newFavorites.splice(index, 1);
    }
    this.videos = newFavorites;
  }
}

export default FavoritesStore;
