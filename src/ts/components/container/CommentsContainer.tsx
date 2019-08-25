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
    const { youtube } = this.props;
    const comments = youtube.videoComments;
    const commentsCount = youtube.videoInfo.comments;
    return (
      <React.Fragment>
        <CommentsList comments={comments} commentsCount={commentsCount}/>
        { commentsCount !== '0' &&
          <ButtonLoadMore
          onClick={() => this.props.youtube.searchNext()}
          message="show more comments..."
        />
        }
      </React.Fragment>
    );
  }

}
export default CommentsContainer;
