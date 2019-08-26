import * as React from 'react';
import { Button, Spinner } from 'reactstrap';

interface IGeneric {
  message: string;
  onClick: () => void;
  isLoading: boolean;
}

const LoadMoreButton = ({ onClick, message, isLoading }: IGeneric ) => (
  <Button
    className="bg-red bg-red-hover"
    onClick={onClick }
  >
    {isLoading
      ? <Spinner size="sm" />
      : message
    }
  </Button>
);

export default LoadMoreButton;
