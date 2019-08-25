import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { IYoutube } from '../../interfaces';

const VideoTitle = inject('youtube')(observer(({ youtube }: IYoutube) => (
  <h1 className="video-title">{youtube.videoInfo.title}</h1>
)));

export default VideoTitle;
