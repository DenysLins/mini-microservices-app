import React, { useState, useEffect } from "react";
import axios from "axios";

function CommentList() {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await axios.get("http://localhost:4001/posts/1/comments");
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

export default CommentList;
