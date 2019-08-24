import * as React from 'react';
import { Container, Row } from 'reactstrap';

import PageHeader from '../components/presentational/PageHeader';
import PageMain from '../components/presentational/PageMain';
import VideoPreviewList from '../components/container/VideoPreviewList';

const FavoritesPage = () => (
  <React.Fragment>
    <PageHeader />
    <PageMain>
      <Container fluid className="mt-3">
        <Row className="justify-content-center m-2">
          <h5>My Favorite Videos</h5>
        </Row>
        <VideoPreviewList  showFavorites/>
      </Container>
    </PageMain>
  </React.Fragment>
);

export default FavoritesPage;
