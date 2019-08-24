import { observable, autorun } from 'mobx';

import { IVideoSnippet, IVideoInfo, IComment } from '../interfaces';
import { elipsis, shortFormat } from '../utils';

// youtube data api request options
const searchOptions = (query: string) => ({
  part: 'snippet',
  maxResults: 25,
  textFormat: 'plainText',
  type: 'video',
  q: query,
  fields: 'nextPageToken,items(id(videoId),snippet(title,description,thumbnails(medium(url))))',
});
const searchNextOptions = ({query, token}: {query: string, token: string }) => (
  Object.assign({}, searchOptions(query), { pageToken: token })
);
const statsOptions = (id: string) => ({
  part: 'statistics,snippet',
  fields: 'items(statistics(viewCount,likeCount,dislikeCount,commentCount),snippet(title,description))',
  id,
});
const commentOptions = (videoId: string) => ({
  part: 'snippet',
  maxResults: 30,
  textFormat: 'plainText',
  fields: 'nextPageToken,items(id,snippet(topLevelComment(snippet(authorDisplayName,authorProfileImageUrl,textDisplay))))',
  videoId,
});
const commentNextOptions = ({id, token}: {id: string, token: string }) => (
  Object.assign({}, searchOptions(id), { pageToken: token })
);

class YoutubeStore {
  @observable public searchVideos: IVideoSnippet[];
  @observable public videoInfo: IVideoInfo;
  @observable public videoComments: IComment[];
  private nextSearch: { query: string, token: string };
  private nextComments: { id: string, token: string };

  constructor() {
    this.searchVideos = [];
    this.videoInfo = {
      title: '', description: '', likes: '0', dislikes: '0', views: '0', comments: 0,
    };
    this.nextSearch = { query: '', token: '' };
    this.nextComments = { id: '', token: '' };
  }

  // invocable actions
  public search(query: string) {
    this.nextSearch.query = query;
    if (query) {
      (gapi.client as any).youtube.search.list(searchOptions(query))
        .then(this.handleSearchResponse);
    } else {
      this.nextSearch = { query: '', token: '' };
      }
  }
  public searchNext() {
    (gapi.client as any).youtube.search.list(searchNextOptions(this.nextSearch))
      .then((response: any) => this.handleSearchResponse(response, true))
      .catch(this.handleYoutubeAPIerror);
  }
  public requestStats(id: string) {
    (gapi.client as any).youtube.videos.list(statsOptions(id))
      .then(this.handleVideosResponse)
      .catch(this.handleYoutubeAPIerror);
  }
  public requestComments(id: string) {
    (gapi.client as any).youtube.commentThreads.list(commentOptions(id))
      .then(this.handleCommentsResponse)
      .catch(this.handleYoutubeAPIerror);
  }
  public requestCommentsNext() {
    (gapi.client as any).youtube.commentThreads.list(commentNextOptions(this.nextComments))
      .then((response: any) => this.handleCommentsResponse(response, true))
      .catch(this.handleYoutubeAPIerror);
  }

  private handleSearchResponse = (response: any, next: boolean = false) => {
    const body = JSON.parse(response.body);
    this.nextSearch.token = body.nextPageToken;
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
  private handleCommentsResponse = (response: any, next: boolean = false) => {
    const body = JSON.parse(response.body);
    this.nextComments.token = body.nextPageToken;
    const newComments = body.items.map((item: any) => ({
      userName: item.snippet.topLevelComment.snippet.authorDisplayName,
      userImg: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
      text: item.snippet.topLevelComment.snippet.textDisplay,
      id: item.id,
    }));
    if (next) {
      this.videoComments.push(...newComments);
    } else {
      this.videoComments = newComments;
    }
  }
  private handleYoutubeAPIerror = (response: any) => {
    const errors = JSON.parse(response.body).error.errors
      .map((error: any) => error.message);
    throw new Error(errors.toString());
  }
}

export default YoutubeStore ;
