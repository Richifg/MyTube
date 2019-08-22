import * as React from 'react';
import {
  Card, CardImg, CardBody, CardTitle, CardText,
} from 'reactstrap';

interface IVideoPrev {
  img: string;
  title: string;
  description: string;
}

const VideoPreviewCard = ({ img , title, description }: IVideoPrev) => (
  <Card color="dark" className="preview-card mx-auto mb-2">
    <CardImg src={img} className="preview-img" />
    <CardBody>
      <CardTitle className="preview-title">{title}</CardTitle>
      <CardText className="preview-description">{description}</CardText>
    </CardBody>
  </Card>
);

export default VideoPreviewCard;
