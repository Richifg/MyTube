import * as React from 'react';
import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IVideoInfo } from '../../interfaces';
interface IVideoStats { stats: IVideoInfo; }

const VideoStats = ({ stats }: IVideoStats) => (
  <div className="stats-container">
    <Row className="mx-0 mt-2">
      <Col xs={9} sm={7} md={5}>
        <Row>
          <Col>
            <div className="stat-container text-center">
              <FontAwesomeIcon icon="thumbs-up" className="stat-icon" />
              <span className="stat-text">{stats.likes}</span>
            </div>
          </Col>
          <Col>
            <div className="stat-container text-center">
              <FontAwesomeIcon icon="thumbs-down" className="stat-icon" />
              <span className="stat-text">{stats.dislikes}</span>
            </div>
          </Col>
          <Col>
            <div className="stat-container text-center">
              <FontAwesomeIcon icon="eye" className="stat-icon" />
              <span className="stat-text">{stats.views}</span>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
);

export default VideoStats;
