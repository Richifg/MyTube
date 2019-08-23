import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';

interface IFavoriteButton {
  active?: boolean;
  onClick?: () => void;
}

const ButtonAddFavorite = ({ active, onClick }: IFavoriteButton) => (
  <Button
    onClick={onClick}
    outline className={`button-favorite ${active && 'button-favorite-active'}`}
  >
    <FontAwesomeIcon icon="bookmark" />
  </Button>
);

export default ButtonAddFavorite;
