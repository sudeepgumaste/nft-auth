const express = require("express");
require("dotenv").config();
const cors = require("cors");

const router = require("./router");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    msg: "Hello World",
  });
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
