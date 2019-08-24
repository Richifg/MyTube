import * as React from 'react';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

// pages
import SearchPage from '../../pages/SearchPage';
import VideoPage from '../../pages/VideoPage';
import FavoritesPage from '../../pages/FavoritesPage';
import NoMatchPage from '../../pages/NoMatchPage';

// stores
import YoutubeStore from '../../stores/YoutubeStore';
import FavoritesStore from '../../stores/FavoritesStore';

import LoadingSpinner from '../presentational/LoadingSpinner';
import { APIkey } from '../../../../APIkey';

@observer
class App extends React.Component {
  @observable isGapiReady: boolean;
  @observable isIframeReady: boolean;
  youtubeStore: YoutubeStore;
  favoritesStore: FavoritesStore;

  constructor(props: any) {
    super(props);
    this.isGapiReady = false;
    this.isIframeReady = false;
    this.youtubeStore = new YoutubeStore();
    this.favoritesStore = new FavoritesStore();
  }

  componentDidMount() {
    // Initialize both APIs

    const scriptIframe = document.createElement('script');
    scriptIframe.src = 'https://www.youtube.com/iframe_api';
    // this function is called by the API automatically when its code downloads
    (window as any).onYouTubeIframeAPIReady = () => this.isIframeReady = true;

    const scriptGapi = document.createElement('script');
    scriptGapi.src = 'https://apis.google.com/js/client.js';
    // gapi only sets a flag in the script tag so have to check for it manually
    scriptGapi.onload = () => this.initGapi(scriptGapi);

    document.head.appendChild(scriptIframe);
    document.head.appendChild(scriptGapi);
  }

  initGapi = (script: HTMLScriptElement) => {
  if (!script.getAttribute('gapi_processed')) {
    setTimeout(() => this.initGapi(script), 50);
    return;
  }
  gapi.client.setApiKey(APIkey);
  gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest', 'v3')
    .then(() => { this.isGapiReady = true; });
  }

  render() {
    if (this.isGapiReady && this.isIframeReady) {
      return (
        <Provider youtube={this.youtubeStore} favorites={this.favoritesStore}>
          <Router>
            <Switch>
              <Route exact path="/" component={SearchPage}/>
              <Route path="/favorites" component={FavoritesPage} />
              <Route path="/video" component={VideoPage} />
              <Route component={NoMatchPage} />
            </Switch>
          </Router>
        </Provider>
      );
    }
    return ( <LoadingSpinner message="Initializing Google APIs..."/> );
  }
}

export default App;
