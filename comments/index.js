require("dotenv").config({ path: "../.env" });
const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const helmet = require("helmet");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

const COMMENTS_PORT = process.env.COMMENTS_PORT;
const EVENT_BUS_PORT = process.env.EVENT_BUS_PORT;
const EVENT_BUS_URL = `http://localhost:${EVENT_BUS_PORT}`;

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

  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[postId] = comments;

  const event = {
    type: "CommentCreated",
    data: {
      postId: postId,
      id: commentId,
      content: content,
      status: "pending",
    },
  };

  await axios.post(`${EVENT_BUS_URL}/events`, event);

  res.status(201).send(commentsByPostId[postId]);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, content, status } = data;

    const comment = commentsByPostId[postId].find((c) => c.id === id);
    comment.status = status;

    await axios
      .post(`${EVENT_BUS_URL}/events`, {
        type: "CommentUpdated",
        data: {
          postId,
          id,
          content,
          status,
        },
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  res.send({ status: "ok" });
});

app.listen(COMMENTS_PORT, () => {
  console.log(`Comments listing on port ${COMMENTS_PORT}`);
});
