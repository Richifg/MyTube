import * as React from 'react';
import { inject, observer } from 'mobx-react';
import {
  Card, CardImg, CardBody, CardTitle, CardText,
} from 'reactstrap';

import { IVideoSnippet, IFavorites } from '../../interfaces';
import ButtonAddFavorite from './ButtonAddFavorite';

interface IVideoCard extends IFavorites {
  video: IVideoSnippet;
}

@inject('favorites')
@observer
class VideoPreviewCard extends React.Component<IVideoCard> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { video, favorites } = this.props;
    const { img , title, description, id } = video;
    return (
      <Card color="dark" className="preview-card mb-2 mx-auto">
        <CardImg src={img} className="preview-img" />
        <CardBody>
          <CardTitle className="preview-title" maxLength={125}>
            <a href={`#/video/${id}`}>{title}</a>
            <ButtonAddFavorite
              active={favorites.isVideoFavorite(id)}
              onClick={() => favorites.toggleFavorite(video)}
            />
          </CardTitle>
          <CardText className="preview-description">{description}</CardText>
        </CardBody>
      </Card>
    );
  }
}

export default VideoPreviewCard;
