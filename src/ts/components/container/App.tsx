import * as React from 'react';
import { observable } from 'mobx';
import { create } from 'mobx-persist';
import { observer, Provider } from 'mobx-react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

// pages
import SearchPage from '../../pages/SearchPage';
import VideoPage from '../../pages/VideoPage';
import FavoritesPage from '../../pages/FavoritesPage';
import HistoryPage from '../../pages/HistoryPage';
import NoMatchPage from '../../pages/NoMatchPage';

// stores
import YoutubeStore from '../../stores/YoutubeStore';
import FavoritesStore from '../../stores/FavoritesStore';
import HistoryStore from '../../stores/HistoryStore';

// comps
import LoadingIntro from '../presentational/LoadingIntro';
import ErrorMessage from '../presentational/ErrorMessage';

interface IApp {
  apikey: string;
}

@observer
class App extends React.Component<IApp> {
  @observable apiState: string;
  apiError: string;
  youtubeStore: YoutubeStore;
  favoritesStore: FavoritesStore;
  historyStore: HistoryStore;

  constructor(props: any) {
    super(props);
    this.apiState = 'loading';
    const hydrate = create({ debounce: 1000 });
    // load stores with persisted data (favorites and last search)
    this.youtubeStore = new YoutubeStore();
    this.favoritesStore = new FavoritesStore();
    this.historyStore = new HistoryStore();
    hydrate('youtube', this.youtubeStore);
    hydrate('favorites', this.favoritesStore);
    hydrate('wHistory', this.historyStore);
  }

  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/client.js';
    // gapi sets a flag in the script tag when ready so have to check for it manually
    script.onload = () => this.initGapi(script);
    document.head.appendChild(script);
  }

  initGapi = (script: HTMLScriptElement) => {
    if (!script.getAttribute('gapi_processed')) {
      setTimeout(() => this.initGapi(script), 50);
      return;
    }
    gapi.client.setApiKey(this.props.apikey);
    // typescript is not recognizing the catch method of the returned promise like object
    // gapi is wrapped as "any" here just to avoid compile errors
    (gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest', 'v3') as any)
      .then(() => { this.apiState = 'ready'; })
      .catch((error: any) => {
        const e = error.error.errors[0];
        this.apiError = `${e.message}, reason: ${e.reason}`;
      });
  }

  render() {
    const { apiState, apiError, youtubeStore, favoritesStore, historyStore } = this;
    if (youtubeStore.error) {
      return <ErrorMessage message={youtubeStore.error} />;
    }
    switch (apiState) {
      // history is reserved on provider for page history so using wHistory instead (watch History)
      case 'ready': return (
        <Provider
          youtube={youtubeStore}
          favorites={favoritesStore}
          wHistory={historyStore}
        >
          <Router>
            <Switch>
              <Route exact path="/" component={SearchPage}/>
              <Route path="/favorites" component={FavoritesPage} />
              <Route path="/video/:id" component={VideoPage} />
              <Route path="/history" component={HistoryPage} />
              <Route component={NoMatchPage} />
            </Switch>
          </Router>
        </Provider>
      );
      case 'loading': return (
        <LoadingIntro />
      );
      case 'error': return (
        <ErrorMessage message={apiError} />
      );
    }
  }
}

export default App;
