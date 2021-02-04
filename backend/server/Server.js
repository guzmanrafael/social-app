require("./config/config");
let cors = require("cors");
const cloudinary = require("cloudinary");
const express = require("express");
const { mongoose } = require("./Database");
const path = require("path");

cloudinary.config({
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

//middelwares
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
//routes

app.use("/api/user", require("./routes/user.routes"));
app.use("/api/login", require("./routes/authentication.routes"));
app.use("/api/post", require("./routes/post.routes"));

app.use(require("./routes/authentication.routes"));

//static files
app.use(express.static(path.join(__dirname, "libs/public")));

//starting server

app.listen(process.env.PORT, () => {
  console.log("server on port", process.env.PORT);
});
