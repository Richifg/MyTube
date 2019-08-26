import * as React from 'react';
import { render } from 'react-dom';
import App from './components/container/App';
import '../scss/styles.scss';
import './icon-library';

const apikey = process.env.APIKEY;
console.log('Yes, this is the latest build...123');
console.log(apikey);
console.log(process.env.APIKEY);
console.log(process.env.TEST);
console.log(process.env.MY_VARIABLE);
console.log(process.env.NODE_ENV);
render(<App apikey={apikey}/>, document.getElementById('anchor'));
