import { observable, autorun } from 'mobx';

import { IVideoSnippet, IVideoInfo } from '../interfaces';
import { elipsis, shortFormat } from '../utils';

// youtube data api request options
const searchVideosOptions = (query: string) => ({
  part: 'snippet',
  maxResults: 25,
  type: 'video',
  q: query,
  fields: 'nextPageToken,items(id(videoId),snippet(title,description,thumbnails(medium(url))))',
});
const searchNextOptions = ({query, token}: {query: string, token: string }) => (
  Object.assign({}, searchVideosOptions(query), { token })
);
const videosStatsOptions = (id: string) => ({
  part: 'statistics,snippet',
  fields: 'items(statistics(viewCount,likeCount,dislikeCount,commentCount),snippet(title,description))',
  id,
});

class YoutubeStore {
  @observable public searchVideos: IVideoSnippet[];
  @observable public videoInfo: IVideoInfo;
  private nextQuery: { query: string, token: string };

  constructor() {
    this.searchVideos = [];
    this.videoInfo = {
      title: '', description: '', likes: '0', dislikes: '0', views: '0', comments: 0,
    };
    this.nextQuery = { query: '', token: '' };
    autorun(() => console.log(this.searchVideos));
    autorun(() => console.log(this.videoInfo));
  }

  // actions
  public search(query: string) {
    // ##DEBUG
    console.log('opening list request for search...' + query);
    this.nextQuery.query = query;
    if (query) {
      // could't find working types for youtube
      (gapi.client as any).youtube.search.list(searchVideosOptions(query))
        .then(this.handleSearchResponse);
    } else {
      this.nextQuery = { query: '', token: '' };
      }
  }
  public searchNext() {
    // ##DEBUG
    console.log('opening list request for next search...' + this.nextQuery);
    (gapi.client as any).youtube.search.list(searchNextOptions(this.nextQuery))
      .then((response: any) => this.handleSearchResponse(response, true));
  }
  public requestStats(id: string) {
    // ##DEBUG
    console.log('opening list request stats...' + id);
    (gapi.client as any).youtube.videos.list(videosStatsOptions(id))
      .then(this.handleVideosResponse);
  }

  private handleSearchResponse = (response: any, next: boolean = false) => {
    // ##DEBUG
    console.log('sucess!');
    const body = JSON.parse(response.body);
    this.nextQuery.token = body.nextPageToken;
    const newVideos = body.items.map((item: any) => ({
      title: item.snippet.title,
      description: elipsis(item.snippet.description, 125),
      img: item.snippet.thumbnails.medium.url,
      id: item.id.videoId,
    }));
    if (next) {
      this.searchVideos.push(...newVideos);
    } else {
      this.searchVideos = newVideos;
    }
  }

  private handleVideosResponse = (response: any) => {
    // ##DEBUG
    console.log('sucess!');
    const info = JSON.parse(response.body).items[0];
    this.videoInfo = {
      title: info.snippet.title,
      description: info.snippet.description,
      likes: shortFormat(info.statistics.likeCount),
      dislikes: shortFormat(info.statistics.dislikeCount),
      views: shortFormat(info.statistics.viewCount),
      comments: info.statistics.commentCount,
    };
  }
}

export default YoutubeStore ;
