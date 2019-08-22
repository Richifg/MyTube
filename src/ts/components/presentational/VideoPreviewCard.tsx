import * as React from 'react';
import {
  Card, CardImg, CardBody, CardTitle, CardText,
} from 'reactstrap';

import { IVideo } from '../../stores/YoutubeStore';

const VideoPreviewCard = ({ img , title, description }: IVideo) => (
  <Card color="dark" className="preview-card">
    <CardImg src={img} className="preview-img" />
    <CardBody>
      <CardTitle className="preview-title">{title}</CardTitle>
      <CardText className="preview-description">{description}</CardText>
    </CardBody>
  </Card>
);

// Defaults for testing purposes
VideoPreviewCard.defaultProps = {
  img: 'https://i.ytimg.com/vi/1_azHA9quYg/mqdefault.jpg',
  title: 'Full Movie: Innersection - Kelly Slater, Matt Meola, Craig Anderson [HD]',
  description: '"The 25 two-minute surf movies that make up Taylor Steeles INNERSECTION were each created by the surfers themselves. From stars like Kelly Slater and Joel ...',
};

export default VideoPreviewCard;
