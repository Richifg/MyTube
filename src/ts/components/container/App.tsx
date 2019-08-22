import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

// Page imports
import MainPage from '../../pages/MainPage';

// TODO: figure out how to avoid making this key public...
const APIkey = 'AIzaSyAPKUZyEu7C4JuvU2Fw0BIHPczAZLKgAwU';

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
      so first have to wait until it is ready...
    */
    if (!script.getAttribute('gapi_processed')) {
      setTimeout(() => this.initGapi(script), 300);
      return;
    }
    gapi.client.setApiKey(APIkey);
    gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest', 'v3')
      .then(() => { this.isGapiReady = true; });
  }

  render() {
    if (this.isGapiReady) {
      return (
        <MainPage/>
      );
    }
    return (
      <h1>LOADING GAPI...</h1>
    );
  }
}

export default App;
