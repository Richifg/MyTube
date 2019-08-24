import * as React from 'react';

import PageHeader from '../components/presentational/PageHeader';
import PageMain from '../components/presentational/PageMain';
import VideoPlayer from '../components/container/VideoPlayer';

const VideoPage  = () => (
  <React.Fragment>
    <PageHeader />
    <VideoPlayer videoId="o8xo44dw3oE" />
    <PageMain />
  </React.Fragment>
);

export default VideoPage;
