const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

const calcSchema = new mongoose.Schema({
  expression: String,
  Result: Number,
});

const calc = mongoose.model("Calc", calcSchema);

app.post("/calculator", async (req, res) => {
  const { expression } = req.body;
  try {
    const result = eval(expression);
    const data = new Calc({ expression, result });
    await data.save();
    res.json({ result });
  }
   catch (err) {
    res.json({ Error: "invalid expression" });
  }
});

app.get("/history", async (req, res) => {
  const data = await Calc.find();
  res.json(data);
});

app.listen(5000, () => {
  console.log("http://localhost:5000 ");
});
