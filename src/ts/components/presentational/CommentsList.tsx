import * as React from 'react';
import { Row, Col } from 'reactstrap';

import CommentCard from './CommentCard';
import { IComment } from '../../interfaces';

interface ICommentList {
  comments: IComment[];
  commentsCount: string;
}
const VideoPreviewList = ({ comments, commentsCount }: ICommentList) => (
  <section>
    <h2 className="comments-header mb-3">{`${commentsCount} comments`}</h2>
    <Row className="justify-content-center">
      {
        comments.map(comment => (
          <Col xs={12} key={comment.id}>
            <CommentCard comment={comment} />
          </Col>
        ))
      }
    </Row>
  </section>
);

export default VideoPreviewList;
