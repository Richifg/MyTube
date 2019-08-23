import * as React from 'react';
import { Button } from 'reactstrap';
import { inject } from 'mobx-react';

import { IYoutube } from '../../interfaces';

const LoadMoreButton = inject('youtube')(({ youtube }: IYoutube) => (
  <Button
    className="bg-red bg-red-hover"
    onClick={() => youtube.searchNext() }
  >
    Show More...
  </Button>
));

export default LoadMoreButton;
