import * as React from 'react';
import { Button } from 'reactstrap';

interface IGeneric {
  message: string;
  onClick: () => void;
}

const LoadMoreButton = ({ onClick, message }: IGeneric ) => (
  <Button
    className="bg-red bg-red-hover"
    onClick={onClick }
  >
    {message}
  </Button>
);

export default LoadMoreButton;
