import { observable, autorun } from 'mobx';
import { computedFn } from 'mobx-utils';

import { IVideo } from '../interfaces';

class FavoritesStore {
  @observable videos: IVideo[];

  isVideoFavorite = computedFn(function asd(id: string) {
    return this.videos.some((video: IVideo) => video.id === id);
  });

  constructor() {
    this.videos = [];
    autorun(() => console.log(this.videos));
  }

  toggleFavorite(video: IVideo) {
    const index = this.videos.findIndex(favVideo => favVideo.id === video.id);
    const newFavorites = [...this.videos];
    if (index === -1) {
      newFavorites.push(video);
    } else {
      newFavorites.splice(index, 1);
    }
    this.videos = newFavorites;
  }
}

export default FavoritesStore;
