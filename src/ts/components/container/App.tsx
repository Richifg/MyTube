import * as React from 'react';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

// pages
import SearchPage from '../../pages/SearchPage';
import VideoPage from '../../pages/VideoPage';
import FavoritesPage from '../../pages/FavoritesPage';

// stores
import YoutubeStore from '../../stores/YoutubeStore';
import FavoritesStore from '../../stores/FavoritesStore';

import LoadingSpinner from '../presentational/LoadingSpinner';
import { APIkey } from '../../../../APIkey';

@observer
class App extends React.Component {
  @observable isGapiReady: boolean;
  youtubeStore: YoutubeStore;
  favoritesStore: FavoritesStore;

  constructor(props: any) {
    super(props);
    this.isGapiReady = false;
    this.youtubeStore = new YoutubeStore();
    this.favoritesStore = new FavoritesStore();
  }

  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/client.js';
    script.onload = () => this.initGapi(script);
    document.head.appendChild(script);
  }

  initGapi = (script: HTMLScriptElement) => {
    /*
      gapi is not made available inmediatly after the script loads
    */
    if (!script.getAttribute('gapi_processed')) {
      setTimeout(() => this.initGapi(script), 50);
      return;
    }
    gapi.client.setApiKey(APIkey);
    gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest', 'v3')
      .then(() => { this.isGapiReady = true; });
  }

  render() {
    if (this.isGapiReady) {
      return (
        <Provider youtube={this.youtubeStore} favorites={this.favoritesStore}>
          <Router>
            <Switch>
              <Route exact path="/" component={SearchPage}/>
              <Route path="/favorites" component={FavoritesPage} />
            </Switch>
          </Router>
        </Provider>
      );
    }
    return ( <LoadingSpinner message="Loading Google API..."/> );
  }
}

export default App;
