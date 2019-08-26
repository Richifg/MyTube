import { observable } from 'mobx';
import { persist } from 'mobx-persist';

import { IVideoSnippet } from '../interfaces';

class HistoryStore {
  @persist('list') @observable videos: IVideoSnippet[];

  constructor() {
    this.videos = [];
  }

  addVideo(video: IVideoSnippet) {
    // add them if history is empty or if new video is different from last one
    if (!this.videos.length || this.videos[0].id !== video.id) {
      this.videos.unshift(video);
    }
  }

  cleanHistory() {
    this.videos = [];
  }
}

export default HistoryStore;
