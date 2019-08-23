import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import LoadingSpinner from '../presentational/LoadingSpinner';
import SearchPage from '../../pages/SearchPage';

// TODO: figure out how to avoid making this key public...
const APIkey = 'AIzaSyBNkL_Wcd0b90EKM_pQ9yZtSSTvzx_gwCg';

@observer
class App extends React.Component {
  @observable isGapiReady: boolean;

  constructor(props: any) {
    super(props);
    this.isGapiReady = false;
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
        <SearchPage/>
      );
    }
    return ( <LoadingSpinner message="Loading Google API..."/> );
  }
}

export default App;
