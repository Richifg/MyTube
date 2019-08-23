import * as React from 'react';
import {
  Card, CardImg, CardBody, CardTitle, CardText,
} from 'reactstrap';

import { IVideo } from '../../stores/YoutubeStore';
import ButtonAddFavorite from './ButtonAddFavorite';

const VideoPreviewCard = ({ img , title, description, id }: IVideo) => (
  <Card color="dark" className="preview-card mb-2 mx-auto">
    <CardImg src={img} className="preview-img" />
    <CardBody>
      <CardTitle className="preview-title" maxLength={125}>
        {title}
        <ButtonAddFavorite id={id}/>
      </CardTitle>
      <CardText className="preview-description">{description}</CardText>
    </CardBody>
  </Card>
);

export default VideoPreviewCard;
