import { observable, autorun } from 'mobx';

const videoSearchFields = 'nextPageToken,items(etag,snippet(title,description,thumbnails(medium(url))))';

interface IItems {
  etag: string;
  snippet: {
    id: string;
    title: string;
    description: string;
    thumbnails: { medium: { url: string}}
  };
}

interface IVideo {
  title: string;
  description: string;
  img: string;
  id?: string;
}

class YoutubeStore {
  @observable searchVideos: IVideo[];
  @observable query: string;
  nextPage: string;

  constructor() {
    this.searchVideos = [];
    this.nextPage = '';
    this.query = '';
  }

  handleSearchResponse = (response: any, next: boolean = false) => {
    const body = JSON.parse(response.body);
    const newVideos = body.items.map((item: IItems) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      img: item.snippet.thumbnails.medium.url,
      id: item.etag,
    }));
    if (next) {
      this.searchVideos.push(...newVideos);
    } else {
      this.searchVideos = newVideos;
    }
    this.nextPage = body.nextPageToken;
  }

  /* actions */
  search = () => {
    if (this.query) {
      // could't find working types for youtube
      (gapi.client as any).youtube.search.list({
        part: 'snippet',
          maxResults: 1,
          q: this.query,
          type: 'video',
          fields: videoSearchFields,
      })
        .then(this.handleSearchResponse);
    } else {
      this.searchVideos = [];
      this.nextPage = '';
     }
  }

  searchNext = () => {
    (gapi.client as any).youtube.search.list({
      part: 'snippet',
        maxResults: 1,
        q: this.query,
        type: 'video',
        fields: videoSearchFields,
        pageToken: this.nextPage,
    })
      .then((response: any) => this.handleSearchResponse(response, true));
  }

}

export { YoutubeStore as default, IVideo};
