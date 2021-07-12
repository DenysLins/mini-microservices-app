const express = require("express");
const { randomBytes } = require("crypto");

const app = express();
app.use(express.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  res.send(commentsByPostId[postId] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content });
  commentsByPostId[postId] = comments;

  res.status(201).send(commentsByPostId[postId]);
});

app.listen(4001, () => {
  console.log("Listing on port 4001");
});
