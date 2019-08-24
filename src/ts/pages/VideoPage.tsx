import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';

import PageHeader from '../components/presentational/PageHeader';
import PageMain from '../components/presentational/PageMain';
import VideoPlayer from '../components/presentational/VideoPlayer';
import VideoTitle from '../components/presentational/VideoTitle';
import StatsContainer from '../components/container/StatsContainer';
import CommentsContainer from '../components/container/CommentsContainer';
import ButtonFavoriteContainer from '../components/container/ButtonFavoriteContainer';

interface IVideoPage {
  match: { params: { id: string } };
}

const VideoPage = ({ match }: IVideoPage) => {
  const { id } = match.params;
  return (
    <React.Fragment>
      <PageHeader />
      <PageMain>
        <Container fluid className="px-0">
          <Row className="justify-content-center mx-0 bg-black">
            <VideoPlayer videoId={id} />
          </Row>
          <Row className="video-info-container justify-content-center">
            <Col xs={10}>
              <VideoTitle />
            </Col>
            <Col xs={2}>
              <ButtonFavoriteContainer id={id} />
            </Col>
            <StatsContainer id={id} />
            <CommentsContainer id={id} />
          </Row>
        </Container>
      </PageMain>
    </React.Fragment>
  );
};

export default VideoPage;
