import * as React from 'react';
import { inject } from 'mobx-react';
import {
  Card, CardImg, CardBody, CardTitle, CardText,
} from 'reactstrap';

import { IVideoSnippet, IHistory } from '../../interfaces';
import ButtonFavoriteContainer from '../container/ButtonFavoriteContainer';

interface IVideoCard extends IHistory { video: IVideoSnippet; }

// Using bootstrap cards just to meet the project requirements
const VideoPreviewCard = inject('wHistory')(({ video, wHistory }: IVideoCard) => {
  const { img , title, description, id } = video;
  return (
    <div onClick={() => {
      // add video to history and go to video page
      wHistory.addVideo(video);
      (window.location as any) = `#/video/${video.id}`;
    }
      }>
      <Card color="dark" className="preview-card mb-2 mx-auto slide-up">
        <div className="preview-img-container">
          <img src={img} className="preview-img" alt="video thumbnail"/>
          <span className="preview-duration">{video.duration}</span>
        </div>
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
});

export default VideoPreviewCard;
