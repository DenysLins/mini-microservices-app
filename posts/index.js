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

const POSTS_PORT = process.env.POSTS_PORT;
const EVENT_BUS_PORT = process.env.EVENT_BUS_PORT;
const EVENT_BUS_URL = `http://event-bus-clusterip-service:${EVENT_BUS_PORT}`;

const posts = {};

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  const post = {
    id,
    title,
  };
  posts[id] = post;

  const event = {
    type: "PostCreated",
    data: post,
  };
  await axios.post(`${EVENT_BUS_URL}/events`, event).catch((err) => {
    console.log(err.message);
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  res.send({ status: "ok" });
});

app.listen(POSTS_PORT, () => {
  console.log(`Posts listing on port ${POSTS_PORT}`);
});
