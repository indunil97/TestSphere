
const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const requestRoutes = require("./routes/requestRoutes");
app.use("/api/requests", requestRoutes);

// test route
app.get("/", (req, res) => {
  res.send("TestSphere API running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});