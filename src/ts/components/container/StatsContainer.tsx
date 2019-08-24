import * as React from 'react';
import { observer, inject } from 'mobx-react';

import VideoStats from '../presentational/VideoStats';
import { IYoutube } from '../../interfaces';

interface IStatsContainer extends IYoutube {
  id: string;
}

@inject('youtube')
@observer
class StatsContainer extends React.Component<IStatsContainer> {
  constructor(props: any) {
    super(props);
    // clean and request new comments from youtube store
    this.props.youtube.videoComments = [];
    this.props.youtube.requestStats(props.id);
  }
  render() {
    const { youtube } = this.props;
    return (
      <VideoStats stats={youtube.videoInfo} />
    );
  }
}

export default StatsContainer;
