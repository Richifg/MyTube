import * as React from 'react';
import { inject, observer } from 'mobx-react';

import CommentsList from '../presentational/CommentsList';
import ButtonLoadMore from '../presentational/ButtonGeneric';
import { IYoutube } from '../../interfaces';

interface ICommentsContainer extends IYoutube {
  id: string;
}

@inject('youtube')
@observer
class CommentsContainer extends React.Component<ICommentsContainer> {
  constructor(props: ICommentsContainer) {
    super(props);
    // clean and request new comments to youtube store
    props.youtube.videoComments = [];
    props.youtube.requestComments(props.id);
  }

  render() {
    const comments = this.props.youtube.videoComments;
    return (
      <div>
        <CommentsList comments={comments} />
        <ButtonLoadMore
          onClick={() => this.props.youtube.searchNext()}
          message="show more comments..."
        />
      </div>
    );
  }

}
export default CommentsContainer;
