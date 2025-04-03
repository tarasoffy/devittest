const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const limiter = require("./middlewares/rateLimiter");

const app = express();

app.use(cors());
app.use(express.json());
app.use(limiter);
app.use("/api", routes);

module.exports = app;
