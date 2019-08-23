import { observable, autorun } from 'mobx';

// interfaces
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

// helper functions
const searchOptions = (query: string) => ({
  part: 'snippet',
    maxResults: 25,
    type: 'video',
    q: query,
    fields: 'nextPageToken,items(etag,snippet(title,description,thumbnails(medium(url))))',
});
const searchNextOptions = (query: string, pageToken: string ) => (
  Object.assign({}, searchOptions(query), { pageToken })
);
const truncateString = (str: string, maxLength: number) => {
  return (str.length > maxLength
  ? `${str.substr(0, 122)}...`
  : str);
};

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
      description: truncateString(item.snippet.description, 125),
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

  // actions
  search = () => {
    // ##DEBUG
    console.log('opening list request for search...');
    if (this.query) {
      // could't find working types for youtube
      (gapi.client as any).youtube.search.list(searchOptions(this.query))
        .then(this.handleSearchResponse);
    } else {
      this.searchVideos = [];
      this.nextPage = '';
     }
  }

  searchNext = () => {
    // ##DEBUG
    console.log('opening list request for next search...');
    (gapi.client as any).youtube.search.list(searchNextOptions(this.query, this.nextPage))
      .then((response: any) => this.handleSearchResponse(response, true));
  }

}

export { YoutubeStore as default, IVideo};
