const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//set up express
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server running on port: " + PORT);
});

//set up mongoose

mongoose.connect(
  process.env.MONGODB_CONECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw erro;
    console.log("MongoDb Conection stablished");
  }
);

//set up routes

app.use("/users", require("./routes/userRoutes"));
app.use("/posts", require("./routes/postsRouter"));
