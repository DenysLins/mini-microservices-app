require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const QUERY_PORT = process.env.QUERY_PORT;

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = {
      title,
      comments: [],
    };
  }

  if (type === "CommentCreated") {
    const { postId, id, content, status } = data;
    posts[postId].comments.push({
      id,
      content,
      status,
    });
  }

  if (type === "CommentUpdated") {
    const { postId, id, contend, status } = data;
    const commentIndex = posts[postId].comments.findIndex(
      (comment) => comment.id == id
    );
    posts[postId].comments[commentIndex].contend = contend;
    posts[postId].comments[commentIndex].status = status;
  }

  res.send({ status: "ok" });
});

app.listen(QUERY_PORT, () => {
  console.log(`Query listing on port ${QUERY_PORT}`);
});
