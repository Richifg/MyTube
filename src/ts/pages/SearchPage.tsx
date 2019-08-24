import * as React from 'react';
import { Container, Row } from 'reactstrap';
import { observer, inject } from 'mobx-react';

import PageHeader from '../components/presentational/PageHeader';
import PageMain from '../components/presentational/PageMain';
import SearchBar from '../components/container/SearchBar';
import VideoPreviewList from '../components/presentational/VideoPreviewList';
import LoadMoreButton from '../components/presentational/ButtonLoadMore';
import { IYoutube } from '../interfaces';

const MainPage = inject('youtube')(observer(({ youtube }: IYoutube) => (
  <React.Fragment>
    <PageHeader />
    <PageMain>
      <Container fluid className="mt-3">
        <Row className="justify-content-center m-2">
          <SearchBar />
        </Row>
        <VideoPreviewList videos={youtube.searchVideos}/>
        { !!youtube.searchVideos.length && (
          <Row className="justify-content-center my-4">
            <LoadMoreButton />
          </Row>
        )}
      </Container>
    </PageMain>
  </React.Fragment>
)));

export default MainPage;
