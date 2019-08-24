import * as React from 'react';

import ButtonFavorite from '../presentational/ButtonFavorite';
import { IYoutube, IFavorites } from '../../interfaces';

/*
  adding favorites requires to add all the snippet info to the favorites store
  so this button basically communicates both the favorites store and the youtube
  store to share the video snippet info.
*/

interface IFavoriteButton extends IYoutube, IFavorites {
  id?: string;
}
const ButtonAddFavorite = ({ id, youtube, favorites }: IFavoriteButton) => {
  const active = favorites.isVideoFavorite(id);
  const videoSnippet = active
    ? favorites.videos.find(video => video.id === id)
    : youtube.searchVideos.find(video => video.id === id);
  return (
    <ButtonFavorite
      active={active}
      onClick={() => favorites.toggleFavorite(videoSnippet)}
    />
  );
};

export default ButtonAddFavorite;
