const cors = require("cors");
const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(todoRoutes);
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
