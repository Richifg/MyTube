import * as React from 'react';
import { Container, Row } from 'reactstrap';

import PageHeader from '../components/presentational/PageHeader';
import PageMain from '../components/presentational/PageMain';
import VideoPlayer from '../components/presentational/VideoPlayer';
import StatsContainer from '../components/container/StatsContainer';

interface IVideoPage {
  match: { params: { id: string } };
}

const VideoPage  = ({ match }: IVideoPage) => {
  const { id } = match.params;
  return (
    <React.Fragment>
      <PageHeader />
      <PageMain>
        <Container fluid className="px-0">
        <Row className="justify-content-center mx-0 bg-black">
            <VideoPlayer videoId={id} />
          </Row>
          <Row className="justify-content-center mx-0">
            <StatsContainer id={id} />
          </Row>
        </Container>
      </PageMain>
    </React.Fragment>
  );
};

export default VideoPage;
