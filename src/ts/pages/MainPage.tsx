import * as React from 'react';

import PageHeader from '../components/presentational/PageHeader';
import PageMain from '../components/presentational/PageMain';

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
        </PageMain>
      </React.Fragment>
    );
  }
}

export default MainPage;
