import express from "express";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from express");
});

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
