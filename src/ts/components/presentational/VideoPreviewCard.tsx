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
    <a href={`#/video/${id}`}>
      <Card color="dark" className="preview-card mb-2 mx-auto">
        <CardImg src={img} className="preview-img" alt="video thumbnail" />
        <CardBody>
          <CardTitle className="d-flex">
            <p className="preview-title">{title}</p>
            <ButtonFavoriteContainer id={id} />
          </CardTitle>
          <CardText className="preview-description">{description}</CardText>
        </CardBody>
      </Card>
    </a>
  );
};

export default VideoPreviewCard;
