require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const helmet = require("helmet");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

const EVENT_BUS_PORT = process.env.EVENT_BUS_PORT;
const POSTS_PORT = process.env.POSTS_PORT;
const COMMENTS_PORT = process.env.COMMENTS_PORT;
const MODERATION_PORT = process.env.MODERATION_PORT;
const QUERY_PORT = process.env.QUERY_PORT;

const POSTS_URL = `http://posts-clusterip-service:${POSTS_PORT}`;
const COMMENTS_URL = `http://comments-clusterip-service:${COMMENTS_PORT}`;
const MODERATION_URL = `http://moderation-clusterip-service:${MODERATION_PORT}`;
const QUERY_URL = `http://query-clusterip-service:${QUERY_PORT}`;

const events = [];

app.get("/events", (req, res) => {
  res.send(events);
});

app.post("/events", async (req, res) => {
  const event = req.body;
  events.push(event);

  await axios.post(`${POSTS_URL}/events`, event).catch((err) => {
    console.log(err.message);
  });
  await axios.post(`${COMMENTS_URL}/events`, event).catch((err) => {
    console.log(err.message);
  });
  await axios.post(`${MODERATION_URL}/events`, event).catch((err) => {
    console.log(err.message);
  });
  await axios.post(`${QUERY_URL}/events`, event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: "ok" });
});

app.listen(EVENT_BUS_PORT, () => {
  console.log(`Event bus listing on port ${EVENT_BUS_PORT}`);
});
