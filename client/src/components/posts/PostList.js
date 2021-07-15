import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "../comments/CommentCreate";
import CommentList from "../comments/CommentList";

function PostList() {
  const [posts, setPosts] = useState({});

  const fetchPost = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const renderedPosts = Object.entries(posts).map((p) => {
    const [id, post] = p;
    return (
      <div
        className="card"
        style={{ width: "50%", marginBottom: "20px" }}
        key={id}
      >
        <div className="card-body">
          <h2>{post.title}</h2>
          <CommentList comments={post.comments} />
          <CommentCreate postId={id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
}

export default PostList;
