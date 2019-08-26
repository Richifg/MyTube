import * as React from 'react';
import { Row, Col } from 'reactstrap';

import VideoPreviewCard from './VideoPreviewCard';
import { IVideoSnippet } from '../../interfaces';

interface IVideoList {
  videos: IVideoSnippet[];
}
const VideoPreviewList = ({ videos }: IVideoList) => (
  <Row className="preview-list-container">
    {
      videos.map(video => (
        <Col xs={12} key={video.id} className="p-0">
          <VideoPreviewCard video={video} />
        </Col>
      ))
    }
  </Row>
);

export default VideoPreviewList;
