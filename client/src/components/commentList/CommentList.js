import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function CommentList(props) {
  const [comments, setComments] = useState([]);
  const { postId } = props;

  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

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
  postId: PropTypes.string,
};

export default CommentList;
