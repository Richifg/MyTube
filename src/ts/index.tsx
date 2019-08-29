import * as React from 'react';
import { render } from 'react-dom';
import App from './components/container/App';
import '../scss/styles.scss';
import './icon-library';

/*
  gapi doesn't fail when providing an empty key because it allows very limited
  withouth signing in. So if no APIKEY was provided, set it to dummy to
  force gapi to fail on load and let the app handle the error.
*/

const apikey = process.env.APIKEY || 'dummy-key';

render(<App apikey={apikey}/>, document.getElementById('anchor'));
