import * as React from 'react';
import { Button } from 'reactstrap';

interface ILoadMore {
  onClick: Function;
}

const LoadMoreButton = ({ onClick }: ILoadMore) => (
  <Button
    className="bg-red bg-red-hover"
    onClick={() => onClick()}
  >
    Show More...
  </Button>
);

export default LoadMoreButton;
