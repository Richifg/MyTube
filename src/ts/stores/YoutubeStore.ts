import { observable, autorun } from 'mobx';
import { ISearchItem, IVideo } from '../interfaces';

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
  private nextPage: string;

  constructor() {
    this.searchVideos = [];
    this.nextPage = '';
    this.query = '';
    autorun(() => console.log(this.searchVideos));
  }

  // actions
  search = () => {
    // ##DEBUG
    console.log('opening list request for search...' + this.query);
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
    console.log('opening list request for next search...' + this.query);
    (gapi.client as any).youtube.search.list(searchNextOptions(this.query, this.nextPage))
      .then((response: any) => this.handleSearchResponse(response, true));
  }

   private handleSearchResponse = (response: any, next: boolean = false) => {
    // ##DEBUG
    console.log('sucess!');
    const body = JSON.parse(response.body);
    const newVideos = body.items.map((item: ISearchItem) => ({
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
}

export default YoutubeStore ;
