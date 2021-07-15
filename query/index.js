const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const query = {};

app.get("/posts", (req, res) => {
  res.send(query);
});

app.post("/events", (req, res) => {
  const event = req.body;
  switch (event.type) {
    case "PostCreated":
      const post = {
        title: event.data.title,
        comments: [],
      };
      query[event.data.id] = post;
      break;
    case "CommentCreated":
      const comment = {
        id: event.data.id,
        content: event.data.content,
      };
      query[event.data.postId]["comments"].push(comment);
      break;
    default:
      break;
  }
  res.send({ status: "ok" });
});

app.listen(4002, () => {
  console.log("Query listing on port 4002");
});
