const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/uploads", express.static("uploads"));

mongoose
  .connect("mongodb://127.0.0.1:27017/movieticketbooking", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

var db = mongoose.connection;
db.once("open", () => {
  console.log("Database Started");
});

const dataSchema = new mongoose.Schema({
  title: String,
  rating: String,
  votes: String,
  language: String,
  duration: String,
  certificate: String,
  showTime: String,
  date: String,
  price: String,
  imageurl: String,
});

const dataModel = mongoose.model("details", dataSchema);

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.get("/movies", async (req, res) => {
  try {
    const data = await dataModel.find();
    res.json(data).status(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/movies/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await dataModel.findById(id);
    res.json(data).status(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/movies", upload.single("image"), async (req, res) => {
  const {
    title,
    rating,
    votes,
    language,
    duration,
    certificate,
    showTime,
    date,
    price,
  } = req.body;

  const image = req.file;
  try {
    const newItem = new dataModel({
      title,
      rating,
      votes,
      language,
      duration,
      certificate,
      showTime,
      date,
      price,
      imageurl: image ? `/uploads/${image.filename}` : "",
    });

    await newItem.save();
    res.json(newItem).status(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/movies/:id", upload.single("image"), async (req, res) => {
  const {
    title,
    rating,
    votes,
    language,
    duration,
    certificate,
    showTime,
    date,
    price,
  } = req.body;
  const { id } = req.params;
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
    const data = await dataModel.findById(id);
    if (!data) {
      return res.json({ message: "data does not found" }).status(404);
    }

    data.title = title;
    data.rating = rating;
    data.votes = votes;
    data.language = language;
    data.duration = duration;
    data.certificate = certificate;
    data.showTime = showTime;
    data.date = date;
    data.price = price;

    if (image) {
      data.imageurl = image;
    }

    await data.save();
    res.json(data).status(201);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.delete("/movies/:id", async (req, res) => {
  try {
    const item = await dataModel.findById(req.params.id);
    if (!item) {
      res.status(404).json({ message: "Data does not exist" });
    }
    await item.deleteOne({ _id: req.params.id });
    res.json({ message: "Data deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 8084;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
