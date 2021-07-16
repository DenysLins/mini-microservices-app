import React from "react";
import PropTypes from "prop-types";

function CommentList({ comments }) {
  const renderedComments = comments.map((comment) => {
    if (comment.status === "pending")
      comment.content = "This comment is waiting moderation...";

    if (comment.status === "rejected")
      comment.content = "This comment has been rejected!";

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
