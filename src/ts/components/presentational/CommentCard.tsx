import * as React from 'react';
import { Col, Row } from 'reactstrap';

import { IComment } from '../../interfaces';

interface ICommentCard {
  comment: IComment;
}

const CommentCard = ({ comment }: ICommentCard) => (
  <Row className="mx-0 mb-2">
    <Col xs={2} sm={1}>
      <img className="comment-img" src={comment.userImg} alt="user profile picture"/>
    </Col>
    <Col xs={9} sm={11}>
      <p className="comment-user">{comment.userName}</p>
      <pre className="comment-text">{comment.text}</pre>
    </Col>
  </Row>

);

export default CommentCard;
