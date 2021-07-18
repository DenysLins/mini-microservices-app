import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import env from "react-dotenv";

function CommentCreate({ postId }) {
  const [content, setContent] = useState("");
  const COMMENTS_PORT = env.COMMENTS_PORT;

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(`http://localhost:${COMMENTS_PORT}/posts/${postId}/comments`, {
        content,
      })
      .catch((err) => {
        console.log(err.message);
      });
    setContent("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary mt-2">Submit</button>
      </form>
    </div>
  );
}

CommentCreate.propTypes = {
  postId: PropTypes.string,
};

export default CommentCreate;
