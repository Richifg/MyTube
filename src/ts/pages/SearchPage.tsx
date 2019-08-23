import * as React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import PageHeader from '../components/presentational/PageHeader';
import PageMain from '../components/presentational/PageMain';
import SearchBar from '../components/container/SearchBar';
import VideoList from '../components/container/VideoList';
import LoadMoreButton from '../components/presentational/ButtonLoadMore';

// DEBUG ONLY
import { TestLong, TestShort, TestNormal } from '../components/presentational/TestCards';

import YoutubeStore from '../stores/YoutubeStore';

class MainPage extends React.Component {
  store: YoutubeStore;

  constructor(props: any) {
    super(props);
    this.store = new YoutubeStore();
  }

  render() {
    return(
      <React.Fragment>
        <PageHeader />
        <PageMain>
          <Container fluid className="mt-3">
            <Row className="justify-content-center m-2">
              <SearchBar store={this.store}/>
            </Row>
            <VideoList store={this.store}/>
            {/*<Row className="justify-content-center m-2">
            <Col xs={12}>
              <TestLong/>
            </Col>
            <Col xs={12}>
              <TestNormal/>
            </Col>
            <Col xs={12}>
              <TestShort/>
            </Col>
            </Row>*/}
            <Row className="justify-content-center my-4">
              <LoadMoreButton onClick={this.store.searchNext} />
            </Row>
          </Container>
        </PageMain>
      </React.Fragment>
    );
  }
}

export default MainPage;
