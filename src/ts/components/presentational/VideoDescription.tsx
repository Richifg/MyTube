import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { IYoutube } from '../../interfaces';

const VideoDescription = inject('youtube')(observer(({ youtube }: IYoutube) => (
  <pre className="video-description">{youtube.videoInfo.description}</pre>
)));

export default VideoDescription;
