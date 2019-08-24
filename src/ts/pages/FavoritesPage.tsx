import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { inject, observer } from 'mobx-react';

import PageHeader from '../components/presentational/PageHeader';
import PageMain from '../components/presentational/PageMain';
import VideoPreviewList from '../components/presentational/VideoPreviewList';
import ButtonAddFavorite from '../components/presentational/ButtonFavorite';
import { IFavorites } from '../interfaces';

const FavoritesPage = inject('favorites')(observer(({ favorites }: IFavorites) => (
  <React.Fragment>
    <PageHeader />
    <PageMain>
      <Container fluid className="mt-3">
        <Row className="m-2">
          <h5>My Favorite Videos</h5>
        </Row>
        <VideoPreviewList videos={favorites.videos}/>
        { !favorites.videos.length && (
          <Row>
            <Col xs={12} className="text-center">
              <p>Looks like you don't have any favorite videos yet.</p>
            </Col>
            <Col xs={12} className="text-center">
              <p>Head over the <a href="#/">Seach</a> tab to look for videos that interest
              you and then click on their bookmark icon to add them here.</p> <ButtonAddFavorite />
            </Col>
          </Row>
        )}
      </Container>
    </PageMain>
  </React.Fragment>
)));

export default FavoritesPage;
