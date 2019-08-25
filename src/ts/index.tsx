import * as React from 'react';
import { render } from 'react-dom';
import App from './components/container/App';
import '../scss/styles.scss';
import './icon-library';

const apikey = process.env.APIKEY;
render(<App apikey={apikey}/>, document.getElementById('anchor'));
