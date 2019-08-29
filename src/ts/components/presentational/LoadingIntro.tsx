import * as React from 'react';
import { Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoadingSpinner = () => (
  <div className="m-auto text-center">
    <FontAwesomeIcon icon="play-circle" className="intro-icon"/>
    <h1 className="intro-title ml-3">MyTube</h1>
    <div className="mt-5">
      <Spinner className="intro-spinner" />
    </div>
  </div>
);

export default LoadingSpinner;
