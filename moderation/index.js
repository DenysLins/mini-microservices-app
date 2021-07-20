require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const helmet = require("helmet");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

const MODERATION_PORT = process.env.MODERATION_PORT;
const EVENT_BUS_PORT = process.env.EVENT_BUS_PORT;
const EVENT_BUS_URL = `http://localhost:${EVENT_BUS_PORT}`;

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const { postId, id, content } = data;

    setTimeout(() => {
      axios
        .post(`${EVENT_BUS_URL}/events`, {
          type: "CommentModerated",
          data: {
            postId,
            id,
            content,
            status: Math.random() < 0.5 ? "approved" : "rejected",
          },
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, 5000);
  }

  res.send({ status: "ok" });
});

app.listen(MODERATION_PORT, () => {
  console.log(`Moderation listing on port ${MODERATION_PORT}`);
});
