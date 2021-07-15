const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

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
    const { postId, id, content } = data;
    posts[postId].comments.push({
      id,
      content,
    });
  }

  res.send({ status: "ok" });
});

app.listen(4002, () => {
  console.log("Query listing on port 4002");
});
