import * as React from 'react';
import { Spinner } from 'reactstrap';

interface ISpinner {
  message: string;
}

const LoadingSpinner = ({ message }: ISpinner) => (
  <div className="m-auto">
    { message && <h3>{message}</h3> }
    <div className="d-flex justify-content-center">
      <Spinner color="danger" />
    </div>
  </div>
);

export default LoadingSpinner;
