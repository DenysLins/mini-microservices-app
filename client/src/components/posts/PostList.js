import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "../comments/CommentCreate";
import CommentList from "../comments/CommentList";
import env from "react-dotenv";

function PostList() {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const QUERY_PORT = env.QUERY_PORT;
    const fetchPost = async () => {
      const res = await axios.get(`http://localhost:${QUERY_PORT}/posts`);
      setPosts(res.data);
    };
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
