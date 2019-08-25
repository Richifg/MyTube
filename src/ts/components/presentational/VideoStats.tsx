import * as React from 'react';
import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IVideoInfo } from '../../interfaces';
interface IVideoStats { stats: IVideoInfo; }

const VideoStats = ({ stats }: IVideoStats) => (
  <Row className="justify-content-start mx-0">
    <div className="stat-container mr-3">
      <FontAwesomeIcon className="stat-icon"icon="eye" />
      <span className="stat-text">{stats.views + ' views'}</span>
    </div>
    <div className="stat-container mr-3">
      <FontAwesomeIcon className="stat-icon"icon="thumbs-up" />
      <span className="stat-text">{stats.likes}</span>
    </div>
    <div className="stat-container">
      <FontAwesomeIcon className="stat-icon"icon="thumbs-down" />
      <span className="stat-text">{stats.dislikes}</span>
    </div>
  </Row>
);

export default VideoStats;
