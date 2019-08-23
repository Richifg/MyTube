/*
  Only icons the are explicitely imported here can be used
  with the FontAwesomeIcon component throught the app
*/

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlayCircle,
  faSearch,
  faBookmark,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faPlayCircle,
  faSearch,
  faBookmark,
);
