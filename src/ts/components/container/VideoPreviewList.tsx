import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { Row, Col } from 'reactstrap';

import VideoPreviewCard from '../presentational/VideoPreviewCard';
import { IYoutube, IFavorites, IVideo } from '../../interfaces';

interface IVideoList extends IFavorites, IYoutube {
  showFavorites?: boolean;
}

// TODO: TURN THIS INTO FUNCTION COMP
// TODO: TURN THIS INTO FUNCTION COMP
// TODO: TURN THIS INTO FUNCTION COMP
// TODO: TURN THIS INTO FUNCTION COMP
@inject('youtube', 'favorites')
@observer
class VideoPreviewList extends React.Component<IVideoList> {

  constructor(props: any) {
    super(props);
  }

  render() {
    const videos =  this.props.showFavorites
      ? this.props.favorites.videos
      : this.props.youtube.searchVideos;
    return (
      <Row className="justify-content-center">
        {
          videos.map(video => (
            <Col xs={12} key={video.id}>
              <VideoPreviewCard video={video} />
            </Col>
          ))
        }
      </Row>
    );
   }
}

export default VideoPreviewList;
