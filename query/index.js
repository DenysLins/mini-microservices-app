require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const helmet = require("helmet");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

const QUERY_PORT = process.env.QUERY_PORT;
const EVENT_BUS_PORT = process.env.EVENT_BUS_PORT;
const EVENT_BUS_URL = `http://event-bus-service:${EVENT_BUS_PORT}`;

const posts = {};

const handleEvent = (type, data) => {
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
    const comment = posts[postId].comments.find((c) => c.id == id);
    comment.contend = contend;
    comment.status = status;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({ status: "ok" });
});

app.listen(QUERY_PORT, async () => {
  console.log(`Query listing on port ${QUERY_PORT}`);

  try {
    const res = await axios.get(`${EVENT_BUS_URL}/events`);

    for (let event of res.data) {
      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
