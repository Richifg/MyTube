import * as React from 'react';
import { inject, observer } from 'mobx-react';

import CommentsList from '../presentational/CommentsList';
import ButtonLoadMore from '../presentational/ButtonGeneric';
import { IYoutube } from '../../interfaces';
import { Row } from 'reactstrap';

interface ICommentsContainer extends IYoutube {
  id: string;
}

@inject('youtube')
@observer
class CommentsContainer extends React.Component<ICommentsContainer> {
  constructor(props: ICommentsContainer) {
    super(props);
    // cleans and request new comments
    props.youtube.videoComments = [];
    props.youtube.requestComments(props.id);
  }

  render() {
    const commentCount = this.props.youtube.videoInfo.comments;
    if (commentCount !== '0') {
      return (
        <React.Fragment>
          { this.props.youtube.videoComments.length !== 0 &&
            <CommentsList
            comments={this.props.youtube.videoComments}
            commentsCount={commentCount}/>
          }
          <Row className="justify-content-center">
            <ButtonLoadMore
              onClick={() => this.props.youtube.requestCommentsNext()}
              message="show more comments..."
            />
          </Row>
        </React.Fragment>
      );
    }
    return null;
  }
}
export default CommentsContainer;
