import React from "react";
import PropTypes from "prop-types";

function CommentList({ comments }) {
  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return (
    <div className="d-flex flex-column">
      <div>{comments.length} comments</div>
      <ul>{renderedComments}</ul>
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array,
};

export default CommentList;
