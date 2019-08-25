import * as React from 'react';
import {
  Card, CardImg, CardBody, CardTitle, CardText,
} from 'reactstrap';

import { IVideoSnippet } from '../../interfaces';
import ButtonFavoriteContainer from '../container/ButtonFavoriteContainer';

interface IVideoCard  { video: IVideoSnippet; }

const VideoPreviewCard = ({ video }: IVideoCard) => {
  const { img , title, description, id } = video;
  console.log(title);
  return (
    <Card color="dark" className="preview-card mb-2 mx-auto">
      <CardImg src={img} className="preview-img" alt="video thumbnail" />
      <CardBody>
        <CardTitle className="preview-title">
          {title}
          <ButtonFavoriteContainer id={id} />
        </CardTitle>
        <CardText className="preview-description">{description}</CardText>
      </CardBody>
    </Card>
  );
};

export default VideoPreviewCard;
