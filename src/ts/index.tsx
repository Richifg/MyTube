import * as React from 'react';
import { render } from 'react-dom';
import App from './components/container/App';
import '../scss/styles.scss';
import './icon-library';

render(<App />, document.getElementById('anchor'));
