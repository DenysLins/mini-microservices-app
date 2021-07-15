import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function CommentCreate(props) {
  const [content, setContent] = useState("");
  const { postId } = props;

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
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