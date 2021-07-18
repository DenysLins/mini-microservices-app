import React, { useState } from "react";
import axios from "axios";
import env from "react-dotenv";

function PostCreate() {
  const [title, setTitle] = useState("");
  const POSTS_PORT = env.POSTS_PORT;

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(`http://localhost:${POSTS_PORT}/posts`, {
        title,
      })
      .catch((err) => {
        console.log(err.message);
      });
    setTitle("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary mt-2">Submit</button>
      </form>
    </div>
  );
}

export default PostCreate;
