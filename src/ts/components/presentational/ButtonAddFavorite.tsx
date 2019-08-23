import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';

const ButtonAddFavorite = ({ active }: { active?: boolean }) => (
  <Button outline className={`button-favorite ${active && 'button-favorite-active'}`}>
    <FontAwesomeIcon icon="bookmark" />
  </Button>
);

export default ButtonAddFavorite;
