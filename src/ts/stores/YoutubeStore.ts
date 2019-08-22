import {observable, computed } from 'mobx';

interface IVideo {
  snippet: {
    title: string;
    description: string;
    thumbnails: { medium: { url: string}}
  };
}

class YoutubeStore {
  @observable searchVideos: IVideo[];

  constructor() {
    this.searchVideos = [];
  }

  /* actions */
  search(query: string) {
    // could't find working types for gapi.youtube
    (gapi.client as any).youtube.search.list({
      part: 'snippet',
        maxResults: 15,
        q: query,

        type: 'video',
        field: 'nextPageToken,items(snippet(title,description,thumbnails(medium(url))))',
    })
      .then((response: any) => this.searchVideos = JSON.parse(response.body).items);
  }

}

export default YoutubeStore;
