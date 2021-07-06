const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const postsRouter = require("./routes/postRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
  })
  .then(console.log("MongoDB connected"));
// mongoose.set("useCreateIndex", true);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Файл был загружен");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/posts", postsRouter);
app.use("/api/categories", categoryRouter);

app.listen(process.env.PORT || 8000, function () {
  console.log("Server started on port 8000");
});
