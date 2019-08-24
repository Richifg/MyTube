import * as React from 'react';
import {
  Card, CardImg, CardBody, CardTitle, CardText,
} from 'reactstrap';

import { IVideoSnippet } from '../../interfaces';
import ButtonFavoriteContainer from '../container/ButtonFavoriteContainer';

interface IVideoCard  { video: IVideoSnippet; }

const VideoPreviewCard = ({ video }: IVideoCard) => {
  const { img , title, description, id } = video;
  return (
    <Card color="dark" className="preview-card mb-2 mx-auto">
      <CardImg src={img} className="preview-img" />
      <CardBody>
        <CardTitle className="preview-title" maxLength={125}>
          <a href={`#/video/${id}`}>{title}</a>
          <ButtonFavoriteContainer id={id} />
        </CardTitle>
        <CardText className="preview-description">{description}</CardText>
      </CardBody>
    </Card>
  );
}

export default VideoPreviewCard;
