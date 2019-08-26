import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { inject, observer } from 'mobx-react';

import PageHeader from '../components/presentational/PageHeader';
import PageMain from '../components/presentational/PageMain';
import VideoPreviewList from '../components/presentational/VideoPreviewList';
import ButtonAddFavorite from '../components/presentational/ButtonFavorite';
import { IHistory } from '../interfaces';

const HistoryPage = inject('wHistory')(observer(({ wHistory }: IHistory) => (
  <React.Fragment>
    <PageHeader />
    <PageMain>
      <Container fluid className="mt-3">
        <Row className="m-2">
          <h5>My Watch History</h5>
        </Row>
        <VideoPreviewList videos={wHistory.videos}/>
        { !wHistory.videos.length && (
          <Row>
            <Col xs={12} className="text-center">
              <p>Your watch history is empty...</p>
            </Col>
            <Col xs={12} className="text-center">
              <p>Go watch some videos <a href="#/">here</a>.</p>
            </Col>
          </Row>
        )}
      </Container>
    </PageMain>
  </React.Fragment>
)));

export default HistoryPage;
