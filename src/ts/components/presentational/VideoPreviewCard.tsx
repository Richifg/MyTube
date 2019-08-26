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
    <div className="preview-container" onClick={() => (window.location as any) = `#/video/${video.id}`}>
      <Card color="dark" className="preview-card mb-2 mx-auto">
        <CardImg src={img} className="preview-img" alt="video thumbnail" />
        <CardBody className="p-1 p-sm-3">
          <CardTitle className="d-flex">
            <p className="preview-title">{title}</p>
            <ButtonFavoriteContainer id={id} />
          </CardTitle>
          <CardText className="preview-description">{description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default VideoPreviewCard;
