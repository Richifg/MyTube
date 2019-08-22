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
      <Container fluid>
        <Row>
        {
          store.searchVideos.map((video) => (
            <Col xs={12} className="mb-2">
              <Row className="justify-content-center">
                <VideoPreviewCard
                  img={video.snippet.thumbnails.medium.url}
                  title={video.snippet.title}
                  description={video.snippet.description}
                />
              </Row>
            </Col>
          ))
        }
        </Row>
      </Container>
    );
  }
}

export default VideoList;
