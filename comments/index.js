const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  res.send(commentsByPostId[postId] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const postId = req.params.id;
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content });
  commentsByPostId[postId] = comments;

  const event = {
    type: "CommentCreated",
    data: {
      postId: postId,
      id: commentId,
      content: content,
    },
  };

  await axios.post("http://localhost:4005/events", event);

  res.status(201).send(commentsByPostId[postId]);
});

app.post("/events", (req, res) => {
  res.send({ status: "ok" });
});

app.listen(4001, () => {
  console.log("Comments listing on port 4001");
});
