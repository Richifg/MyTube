import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';

import PageHeader from '../components/container/PageHeader';
import PageMain from '../components/presentational/PageMain';
import VideoPlayer from '../components/presentational/VideoPlayer';
import VideoTitle from '../components/presentational/VideoTitle';
import StatsContainer from '../components/container/StatsContainer';
import CommentsContainer from '../components/container/CommentsContainer';
import ButtonFavoriteContainer from '../components/container/ButtonFavoriteContainer';
import VideoDescription from '../components/presentational/VideoDescription';

interface IVideoPage {
  match: { params: { id: string } };
}

const VideoPage = ({ match }: IVideoPage) => {
  const { id } = match.params;
  return (
    <React.Fragment>
      <PageHeader />
      <PageMain>
        <Container fluid className="px-0 mb-3">
          <Row className="justify-content-center bg-black mx-0 mb-3">
            <VideoPlayer videoId={id} />
          </Row>
          <Row className="video-info-container justify-content-center mx-auto">
            <Col xs={10}>
              <VideoTitle />
            </Col>
            <Col xs={2} sm={{ size: 1, offset: 1}}>
              <ButtonFavoriteContainer id={id} />
            </Col>
            <Col xs={12} className="mb-3">
              <StatsContainer id={id} />
            </Col>
            <Col xs={12} className="mb-3">
              <VideoDescription />
            </Col>
            <Col xs={12}>
              <CommentsContainer id={id} />
            </Col>
          </Row>
        </Container>
      </PageMain>
    </React.Fragment>
  );
};

export default VideoPage;
