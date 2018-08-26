import express from "express";
import { upload as uploadNowStorage } from "now-storage";
import multer from "multer";
import fs from "fs";
import { promisify } from "util";
import path from "path";

require("dotenv").config();

const app = express();

const readFile = promisify(fs.readFile);
const uploadMiddleware = multer({ dest: "./tmp/" });

async function uploadContent(name, content) {
  const { url } = await uploadNowStorage(
    process.env.NOW_TOKEN,
    {
      name,
      content
    },
    {
      deploymentName: "now-storage"
    }
  );
  return url;
}

app.get("/", (req, res) => res.send("Hello World!"));
app.post("/upload", uploadMiddleware.single("file"), async (req, res) => {
  const file = req.file;
  const filename = `./${__dirname}/../${file.path}`;
  const fileContent = await readFile(filename);
  const url = await uploadContent(file.originalname, fileContent);
  res.json({
    success: true,
    url
  });
  // res.json(file);
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
