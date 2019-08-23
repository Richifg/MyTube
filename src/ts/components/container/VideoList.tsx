import * as React from 'react';
import { observer } from 'mobx-react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import VideoPreviewCard from '../presentational/VideoPreviewCard';
import YoutubeStore from '../../stores/YoutubeStore';
interface IListProps {
  store: YoutubeStore;
}

@observer
class VideoList extends React.Component<IListProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { store } = this.props;
    return (
      <Row className="justify-content-center">
        {
          store.searchVideos.map((video) => (
            <Col xs={12} key={video.id}>
              <VideoPreviewCard
                img={video.img}
                title={video.title}
                description={video.description}
                id={video.id}
              />
            </Col>
          ))
        }
      </Row>
    );
  }
}

export default VideoList;
