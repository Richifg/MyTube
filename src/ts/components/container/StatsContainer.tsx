import * as React from 'react';
import { inject, observer } from 'mobx-react';

import VideoStats from '../presentational/VideoStats';
import { IFavorites } from '../../interfaces';
import { IYoutube } from '../../interfaces';

interface IStatsContainer extends IYoutube, IFavorites {
  id: string;
}

@inject('youtube, favorites')
@observer
class VideoStatsContainer extends React.Component<IStatsContainer> {

  constructor(props: any) {
    super(props);
    this.props.youtube.requestStats(props.id);
  }
  render() {
    const { youtube, favorites, id } = this.props;
    return (
      <VideoStats
        active={favorites.isVideoFavorite(id)}
        stats={youtube.videoStats(id)}
      />
    );
  }
}

export default VideoStatsContainer;
