import * as React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IButtonFavorite {
  active?: boolean;
  onClick?: any;
}

const ButtonFavorite = ({ active, onClick }: IButtonFavorite) => (
  <Button
    outline
    onClick={onClick}
    className={`button-favorite ${active && 'button-favorite-active'}`}
  >
    <FontAwesomeIcon icon="bookmark" />
  </Button>
);

export default ButtonFavorite;
