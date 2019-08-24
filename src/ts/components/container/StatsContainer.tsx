import * as React from 'react';
import { observer, inject } from 'mobx-react';

import VideoStats from '../presentational/VideoStats';
import { IFavorites } from '../../interfaces';
import { IYoutube } from '../../interfaces';

interface IStatsContainer extends IYoutube, IFavorites {
  id: string;
}

@inject('youtube', 'favorites')
@observer
class StatsContainer extends React.Component<IStatsContainer> {

  constructor(props: any) {
    super(props);
    this.props.youtube.requestStats(props.id);
  }
  render() {
    const { youtube, favorites, id } = this.props;
    const active = favorites.isVideoFavorite(id);
    const videoSnippet = active
      ? favorites.videos.find(video => video.id === id)
      : youtube.searchVideos.find(video => video.id === id);
    return (
      <VideoStats
        active={active}
        stats={youtube.videoInfo}
        onClick={() => this.props.favorites.toggleFavorite(videoSnippet)}
      />
    );
  }
}

export default StatsContainer;
