import * as React from 'react';
import { observer } from 'mobx-react';
import {
  Card, CardImg, CardBody, CardTitle, CardText,
} from 'reactstrap';

import YoutubeStore from '../../stores/YoutubeStore';
interface IListProps {
  store: YoutubeStore;
}

@observer
class VideoList extends React.Component<IListProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { store } = this.props;
    return (
      <div>
        {
          store.searchVideos.map((video, index) => (
            <Card color="dark" key={index}>
              <CardImg src={video.snippet.thumbnails.medium.url} className="w-25"/>
              <CardBody>
                <CardTitle>{video.snippet.title}</CardTitle>
                <CardText>{video.snippet.description}</CardText>
              </CardBody>
            </Card>
          ))
        }
      </div>
    );
  }
}

export default VideoList;
